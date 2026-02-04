import { supabase } from '$lib/supabase';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const query = supabase
    .from('players')
    .select(`
      *,
      team:teams(name)
    `)
    .order('goals', { ascending: false })
    .order('name', { ascending: true });

  const { data: players, error } = await query;

  return {
    players: players || []
  };
};

export const actions: Actions = {
  update_goals: async ({ request }) => {
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
  }
};
