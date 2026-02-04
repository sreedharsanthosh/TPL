import { supabase } from '$lib/supabase';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const { data: teams, error } = await supabase
    .from('teams')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
     console.error('Error loading teams:', error);
  }

  return { 
    teams: teams || []
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const logo_url = formData.get('logo_url') as string;
    
    // Manager 1
    const manager_name = formData.get('manager_name') as string;
    const manager_image_url = formData.get('manager_image_url') as string;

    // Manager 2
    const manager2_name = formData.get('manager2_name') as string;
    const manager2_image_url = formData.get('manager2_image_url') as string;

    if (!name) {
      return fail(400, { error: 'Team name is required' });
    }

    const { error } = await supabase
      .from('teams')
      .insert([{ 
         name, 
         logo_url: logo_url || null,
         manager_name: manager_name || null,
         manager_image_url: manager_image_url || null,
         manager2_name: manager2_name || null,
         manager2_image_url: manager2_image_url || null
      }]);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  },

  update: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const logo_url = formData.get('logo_url') as string;
    
    // Manager 1
    const manager_name = formData.get('manager_name') as string;
    const manager_image_url = formData.get('manager_image_url') as string;

    // Manager 2
    const manager2_name = formData.get('manager2_name') as string;
    const manager2_image_url = formData.get('manager2_image_url') as string;

    if (!id || !name) {
       return fail(400, { error: 'ID and Name are required' });
    }

    const { error } = await supabase
      .from('teams')
      .update({ 
         name, 
         logo_url: logo_url || null,
         manager_name: manager_name || null,
         manager_image_url: manager_image_url || null,
         manager2_name: manager2_name || null,
         manager2_image_url: manager2_image_url || null
      })
      .eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const { error } = await supabase.from('teams').delete().eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  }
};
