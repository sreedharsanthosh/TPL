import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: teams, error } = await supabase
    .from('teams')
    .select('*')
    .order('points', { ascending: false })
    .order('goal_difference', { ascending: false })
    .order('played', { ascending: true }); // Tie-breaker preference

  if (error) {
    console.error('Error fetching league table:', error);
    return { teams: [] };
  }

  return { teams };
};
