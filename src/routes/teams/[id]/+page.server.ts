import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

  // Fetch Team
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    .single();

  if (teamError || !team) {
    throw error(404, 'Team not found');
  }

  // Fetch Players
  const { data: players } = await supabase
    .from('players')
    .select('*')
    .eq('team_id', id)
    .order('goals', { ascending: false }) // Show top scorers first might be nice
    .order('name', { ascending: true }); // Then alpha

  return { 
    team,
    players: players || []
  };
};
