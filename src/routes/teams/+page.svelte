<script lang="ts">
    import { Users } from "lucide-svelte";
    export let data;
</script>

<svelte:head>
    <title>Teams | TKM Premier League</title>
</svelte:head>

<div class="bg-slate-900 text-white py-12">
    <div class="container-custom">
        <h1 class="text-4xl font-bold mb-4">Teams</h1>
        <p class="text-slate-400">Competing clubs for the title.</p>
    </div>
</div>

<div class="container-custom py-12">
    {#if data.teams.length === 0}
        <div
            class="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700"
        >
            <Users class="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium text-slate-900 dark:text-white">
                No teams registered
            </h3>
            <p class="text-slate-500">
                Teams will appear here once the league starts.
            </p>
        </div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each data.teams as team}
                <a
                    href="/teams/{team.id}"
                    class="card p-6 flex items-center space-x-4 hover:shadow-md transition-shadow hover:border-emerald-500/50"
                >
                    <div
                        class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0"
                    >
                        {#if team.logo_url}
                            <img
                                src={team.logo_url}
                                alt={team.name}
                                class="w-full h-full rounded-full object-cover"
                            />
                        {:else}
                            <span class="text-xl font-bold text-slate-400"
                                >{team.name.substring(0, 2).toUpperCase()}</span
                            >
                        {/if}
                    </div>
                    <div>
                        <h3
                            class="text-lg font-bold text-slate-900 dark:text-white"
                        >
                            {team.name}
                        </h3>
                        <div class="text-sm text-slate-500 mt-1 flex space-x-3">
                            <span
                                ><span
                                    class="font-semibold text-slate-700 dark:text-slate-300"
                                    >{team.played}</span
                                > Played</span
                            >
                            <span
                                ><span
                                    class="font-semibold text-slate-700 dark:text-slate-300"
                                    >{team.points}</span
                                > Pts</span
                            >
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>
