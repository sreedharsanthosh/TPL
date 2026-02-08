import { supabase } from '$lib/supabase';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const { data: matches } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:teams!home_team_id(name),
      away_team:teams!away_team_id(name)
    `)
    .order('match_date', { ascending: false });

  const { data: teams } = await supabase
    .from('teams')
    .select('id, name')
    .order('name', { ascending: true });

  return { 
    matches: matches || [],
    teams: teams || []
  };
};

// Helper to recalculate stats for a specific team
async function recalculateTeamStats(team_id: string) {
  // 1. Fetch all completed matches for this team
  const { data: matches, error } = await supabase
    .from('matches')
    .select('home_team_id, away_team_id, home_score, away_score')
    .eq('status', 'completed')
    .or(`home_team_id.eq.${team_id},away_team_id.eq.${team_id}`);

  if (error) {
    console.error('Error fetching matches for stats:', error);
    return;
  }

  let played = 0;
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let gf = 0; // Goals For
  let ga = 0; // Goals Against

  // 2. Aggregate stats
  matches.forEach(match => {
    const isHome = match.home_team_id === team_id;
    const teamScore = isHome ? match.home_score : match.away_score;
    const opponentScore = isHome ? match.away_score : match.home_score;

    if (teamScore === null || opponentScore === null) return; // Should not happen for completed matches

    played++;
    gf += teamScore;
    ga += opponentScore;

    if (teamScore > opponentScore) {
      wins++;
    } else if (teamScore === opponentScore) {
      draws++;
    } else {
      losses++;
    }
  });

  // 3. Calculate derived stats
  // Logic: Win = 3 pts, Draw = 1 pt, Loss = 0 pts (No negative points)
  const goal_difference = gf - ga;
  const points = (wins * 3) + (draws * 1);

  // 4. Update Team in DB
  const { error: updateError } = await supabase
    .from('teams')
    .update({
      played,
      wins,
      draws,
      losses,
      points,
      goal_difference
    })
    .eq('id', team_id);
    
  if (updateError) {
     console.error('Error updating team stats:', updateError);
  }
}

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const home_team_id = formData.get('home_team_id');
    const away_team_id = formData.get('away_team_id');
    const date = formData.get('date');
    const time = formData.get('time');
    const stage = formData.get('stage') || 'League';

    if (!home_team_id || !away_team_id || !date || !time) {
      return fail(400, { error: 'All fields are required' });
    }

    if (home_team_id === away_team_id) {
       return fail(400, { error: 'Home and Away teams must be different' });
    }

    const match_date = new Date(`${date}T${time}`).toISOString();

    const { error } = await supabase
      .from('matches')
      .insert([{
        home_team_id,
        away_team_id,
        match_date,
        stage,
        status: 'upcoming'
      }]);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  },

  update_score: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    const home_score = parseInt(formData.get('home_score') as string);
    const away_score = parseInt(formData.get('away_score') as string);

    if (isNaN(home_score) || isNaN(away_score)) {
       return fail(400, { error: 'Invalid scores' });
    }

    // 1. Fetch match to get team IDs (needed for recalculation)
    const { data: match, error: fetchError } = await supabase
      .from('matches')
      .select('home_team_id, away_team_id')
      .eq('id', id)
      .single();

    if (fetchError || !match) {
        return fail(500, { error: 'Match not found' });
    }

    // 2. Update Match
    const { error } = await supabase
      .from('matches')
      .update({ 
        home_score, 
        away_score, 
        status: 'completed' 
      })
      .eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    // 3. Recalculate Standings for both teams
    await recalculateTeamStats(match.home_team_id);
    await recalculateTeamStats(match.away_team_id);

    return { success: true };
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    // To handle deletion correctly (e.g. if deleting a completed match),
    // we should fetch the team IDs first to recalc their stats after deletion.
    const { data: match } = await supabase
      .from('matches')
      .select('home_team_id, away_team_id, status')
      .eq('id', id)
      .single();

    const { error } = await supabase.from('matches').delete().eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    // Recalculate if we deleted a completed match
    if (match && match.status === 'completed') {
       await recalculateTeamStats(match.home_team_id);
       await recalculateTeamStats(match.away_team_id);
    }

    return { success: true };
  }
};
