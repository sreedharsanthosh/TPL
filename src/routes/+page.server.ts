import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Fetch Next Match
  const { data: nextMatchData } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:teams!home_team_id(name, logo_url),
      away_team:teams!away_team_id(name, logo_url)
    `)
    .eq('status', 'upcoming')
    .order('match_date', { ascending: true })
    .limit(1)
    .single();

  // Fetch Table Preview (Top 4)
  const { data: tableData } = await supabase
    .from('teams')
    .select('*')
    .order('points', { ascending: false })
    .order('goal_difference', { ascending: false });

  return {
    nextMatch: nextMatchData,
    table: tableData || []
  };
};
