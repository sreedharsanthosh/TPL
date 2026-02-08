<script lang="ts">
    import { Trophy } from "lucide-svelte";
    export let data;
</script>

<svelte:head>
    <title>Standings | TKM Premier League</title>
</svelte:head>

<div class="bg-slate-900 text-white py-12">
    <div class="container-custom">
        <h1 class="text-4xl font-bold mb-4">League Table</h1>
        <p class="text-slate-400">Current standings for the season.</p>
    </div>
</div>

<div class="container-custom py-12">
    {#if data.teams.length === 0}
        <div class="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
            <h3 class="text-lg font-medium text-slate-900 dark:text-white">
                No teams registered
            </h3>
            <p class="text-slate-500">
                Teams will appear here once the league starts.
            </p>
        </div>
    {:else}
        {#each ['A', 'B'] as pool}
            <div class="mb-12 last:mb-0">
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 px-3 border-l-4 border-emerald-500">Pool {pool}</h3>
                <div class="card overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left">
                            <thead
                                class="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700"
                            >
                                <tr>
                                    <th class="px-6 py-4 w-16 text-center">Pos</th>
                                    <th class="px-6 py-4">Team</th>
                                    <th class="px-6 py-4 text-center">P</th>
                                    <th class="px-6 py-4 text-center hidden md:table-cell">W</th>
                                    <th class="px-6 py-4 text-center hidden md:table-cell">D</th>
                                    <th class="px-6 py-4 text-center hidden md:table-cell">L</th>
                                    <th class="px-6 py-4 text-center hidden sm:table-cell">GD</th>
                                    <th class="px-6 py-4 text-center font-bold">Pts</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                {#each data.teams.filter(t => t.pool === pool) as team, i}
                                    <tr
                                        class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td
                                            class="px-6 py-4 text-center font-medium text-slate-400"
                                        >
                                            <span
                                                class={i < 2
                                                    ? "w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto"
                                                    : ""}
                                            >
                                                {i + 1}
                                            </span>
                                        </td>
                                        <td
                                            class="px-6 py-4 flex items-center font-semibold text-slate-900 dark:text-white"
                                        >
                                            <div
                                                class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 mr-3 flex items-center justify-center shrink-0"
                                            >
                                                {#if team.logo_url}
                                                    <img
                                                        src={team.logo_url}
                                                        alt={team.name}
                                                        class="w-full h-full rounded-full object-cover"
                                                    />
                                                {:else}
                                                    <span
                                                        class="text-xs font-bold text-slate-500"
                                                        >{team.name
                                                            .substring(0, 2)
                                                            .toUpperCase()}</span
                                                    >
                                                {/if}
                                            </div>
                                            {team.name}
                                        </td>
                                        <td class="px-6 py-4 text-center"
                                            >{team.played}</td
                                        >
                                        <td
                                            class="px-6 py-4 text-center hidden md:table-cell text-slate-500"
                                            >{team.wins}</td
                                        >
                                        <td
                                            class="px-6 py-4 text-center hidden md:table-cell text-slate-500"
                                            >{team.draws}</td
                                        >
                                        <td
                                            class="px-6 py-4 text-center hidden md:table-cell text-slate-500"
                                            >{team.losses}</td
                                        >
                                        <td
                                            class="px-6 py-4 text-center hidden sm:table-cell font-medium {team.goal_difference >
                                            0
                                                ? 'text-emerald-600'
                                                : team.goal_difference < 0
                                                  ? 'text-rose-600'
                                                  : 'text-slate-500'}"
                                        >
                                            {team.goal_difference > 0
                                                ? "+"
                                                : ""}{team.goal_difference}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-center font-bold text-lg text-slate-900 dark:text-white"
                                            >{team.points}</td
                                        >
                                    </tr>
                                {/each}
                                {#if data.teams.filter(t => t.pool === pool).length === 0}
                                    <tr>
                                        <td colspan="8" class="px-6 py-8 text-center text-slate-500">No teams found in Pool {pool}</td>
                                    </tr>
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        {/each}
    {/if}

    <div class="mt-6 flex items-center text-sm text-slate-500">
        <div class="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
        <span>Leading positions (Top 2 qualify)</span>
    </div>
</div>
