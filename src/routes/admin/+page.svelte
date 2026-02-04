<script lang="ts">
    import { Users, Trophy, ClipboardList } from "lucide-svelte";

    // redirect to / if not logged in
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";

    onMount(async () => {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
            goto("/");
        }
    });
</script>

<svelte:head>
    <title>Dashboard | TKM Admin</title>
</svelte:head>

<div class="mb-8">
    <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
    <p class="text-slate-500 mt-2">Welcome back leading the league.</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <a
        href="/admin/teams"
        class="card p-6 hover:border-emerald-500 transition-colors group"
    >
        <div class="flex items-center justify-between mb-4">
            <div
                class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"
            >
                <Users class="w-6 h-6" />
            </div>
        </div>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            Manage Teams
        </h3>
        <p class="text-sm text-slate-500 mt-1">
            Add or edit participating teams
        </p>
    </a>

    <a
        href="/admin/matches"
        class="card p-6 hover:border-emerald-500 transition-colors group"
    >
        <div class="flex items-center justify-between mb-4">
            <div
                class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"
            >
                <Trophy class="w-6 h-6" />
            </div>
        </div>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            Manage Fixtures
        </h3>
        <p class="text-sm text-slate-500 mt-1">
            Schedule matches and update scores
        </p>
    </a>
</div>
