<script lang="ts">
    import { Medal } from "lucide-svelte";
    export let data;
</script>

<svelte:head>
    <title>Top Scorers | TKM Premier League</title>
</svelte:head>

<div class="bg-slate-900 text-white py-12">
    <div class="container-custom">
        <h1 class="text-4xl font-bold mb-4">Top Scorers</h1>
        <p class="text-slate-400">Golden Boot contenders.</p>
    </div>
</div>

<div class="container-custom py-12">
    {#if data.players.length === 0}
        <div
            class="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700"
        >
            <Medal class="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium text-slate-900 dark:text-white">
                No goals recorded yet
            </h3>
            <p class="text-slate-500">
                Top scorers list will update as players score goals.
            </p>
        </div>
    {:else}
        <div class="card overflow-hidden max-w-4xl mx-auto">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                    <thead
                        class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500"
                    >
                        <tr>
                            <th class="px-6 py-4 w-16 text-center">Rank</th>
                            <th class="px-6 py-4">Player</th>
                            <th class="px-6 py-4">Team</th>
                            <th class="px-6 py-4 text-center font-bold"
                                >Goals</th
                            >
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        {#each data.players as player, i}
                            <tr
                                class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            >
                                <td class="px-6 py-4 text-center">
                                    {#if i === 0}
                                        <div
                                            class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 flex items-center justify-center mx-auto"
                                            title="1st Place"
                                        >
                                            <span class="font-bold">1</span>
                                        </div>
                                    {:else if i === 1}
                                        <div
                                            class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center mx-auto"
                                            title="2nd Place"
                                        >
                                            <span class="font-bold">2</span>
                                        </div>
                                    {:else if i === 2}
                                        <div
                                            class="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 flex items-center justify-center mx-auto"
                                            title="3rd Place"
                                        >
                                            <span class="font-bold">3</span>
                                        </div>
                                    {:else}
                                        <span class="text-slate-400 font-medium"
                                            >{i + 1}</span
                                        >
                                    {/if}
                                </td>
                                <td
                                    class="px-6 py-4 font-bold text-slate-900 dark:text-white text-lg flex items-center"
                                >
                                    <div
                                        class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 mr-3 flex items-center justify-center overflow-hidden shrink-0"
                                    >
                                        {#if player.image_url}
                                            <img
                                                src={player.image_url}
                                                alt={player.name}
                                                class="w-full h-full object-cover"
                                            />
                                        {:else}
                                            <span
                                                class="text-xs font-bold text-slate-400"
                                                >{player.name.substring(
                                                    0,
                                                    1,
                                                )}</span
                                            >
                                        {/if}
                                    </div>
                                    {player.name}
                                </td>
                                <td
                                    class="px-6 py-4 flex items-center text-slate-600 dark:text-slate-400"
                                >
                                    <div
                                        class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 mr-2 flex items-center justify-center shrink-0"
                                    >
                                        {#if player.team.logo_url}
                                            <img
                                                src={player.team.logo_url}
                                                alt={player.team.name}
                                                class="w-full h-full rounded-full object-cover"
                                            />
                                        {:else}
                                            <span
                                                class="text-xs font-bold text-slate-400"
                                                >{player.team.name.substring(
                                                    0,
                                                    1,
                                                )}</span
                                            >
                                        {/if}
                                    </div>
                                    {player.team.name}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        class="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-full"
                                    >
                                        {player.goals}
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
</div>
