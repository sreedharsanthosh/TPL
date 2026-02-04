import { supabase } from '$lib/supabase';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

  // Fetch Team Details
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    .single();

  if (teamError || !team) {
    return { team: null, players: [] };
  }

  // Fetch Players
  const { data: players, error: playersError } = await supabase
    .from('players')
    .select('*')
    .eq('team_id', id)
    .order('name', { ascending: true });

  return {
    team,
    players: players || []
  };
};

export const actions: Actions = {
  create_player: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const team_id = params.id;
    const image_url = formData.get('image_url') as string;

    if (!name) {
      return fail(400, { error: 'Player name is required' });
    }

    const { error } = await supabase
      .from('players')
      .insert([{ name, team_id, image_url: image_url || null }]);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  },

  update_player_goals: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    const goals = parseInt(formData.get('goals') as string);

    if (isNaN(goals)) {
       return fail(400, { error: 'Invalid goal count' });
    }

    const { error } = await supabase
      .from('players')
      .update({ goals })
      .eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  },

  delete_player: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  }
};
