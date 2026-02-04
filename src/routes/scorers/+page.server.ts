import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: players, error } = await supabase
    .from('players')
    .select(`
      *,
      team:teams(name, logo_url)
    `)
    .gt('goals', 0)
    .order('goals', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching scorers:', error);
    return { players: [] };
  }

  return { players };
};
