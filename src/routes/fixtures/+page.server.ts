import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: matches, error } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:teams!home_team_id(name, logo_url),
      away_team:teams!away_team_id(name, logo_url)
    `)
    .eq('status', 'upcoming')
    .order('match_date', { ascending: true });

  if (error) {
    console.error('Error fetching fixtures:', error);
    return { matches: [] };
  }

  return { matches };
};
