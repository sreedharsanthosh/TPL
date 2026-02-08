<script lang="ts">
    import { enhance } from "$app/forms";
    import { Search, Save, User, Trash2 } from "lucide-svelte";

    export let data;

    let searchQuery = "";

    $: filteredPlayers = data.players.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.team.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
</script>

<div class="space-y-6">
    <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
            Player Manager (Global)
        </h1>

        <div class="relative w-full md:w-64">
            <Search
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"
            />
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search players..."
                class="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
        </div>
    </div>

    <div class="card overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
                <thead
                    class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500"
                >
                    <tr>
                        <th class="px-6 py-3">Player</th>
                        <th class="px-6 py-3">Team</th>
                        <th class="px-6 py-3 text-center">Goals</th>
                        <th class="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    {#if filteredPlayers.length === 0}
                        <tr>
                            <td
                                colspan="4"
                                class="px-6 py-8 text-center text-slate-500"
                            >
                                {#if searchQuery}
                                    No players found matching "{searchQuery}".
                                {:else}
                                    No players found. Add them in Team
                                    Management.
                                {/if}
                            </td>
                        </tr>
                    {:else}
                        {#each filteredPlayers as player}
                            <tr
                                class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            >
                                <td
                                    class="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center"
                                >
                                    <div
                                        class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 mr-3 flex items-center justify-center shrink-0 overflow-hidden"
                                    >
                                        {#if player.image_url}
                                            <img
                                                src={player.image_url}
                                                alt={player.name}
                                                class="w-full h-full object-cover"
                                            />
                                        {:else}
                                            <User
                                                class="w-4 h-4 text-slate-400"
                                            />
                                        {/if}
                                    </div>
                                    {player.name}
                                </td>
                                <td class="px-6 py-4 text-slate-500">
                                    {player.team.name}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <form
                                        method="POST"
                                        action="?/update_goals"
                                        use:enhance
                                        class="flex items-center justify-center space-x-2"
                                    >
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={player.id}
                                        />
                                        <input
                                            type="number"
                                            name="goals"
                                            value={player.goals}
                                            min="0"
                                            class="w-20 px-2 py-1 text-center border rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                                        />
                                        <button
                                            type="submit"
                                            class="text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-400 p-1.5 rounded bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                                            title="Save Goals"
                                        >
                                            <Save class="w-4 h-4" />
                                        </button>
                                    </form>
                                    <form
                                        method="POST"
                                        action="?/delete"
                                        use:enhance
                                        class="inline-block"
                                    >
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={player.id}
                                        />
                                        <button
                                            type="submit"
                                            class="text-slate-400 hover:text-rose-600 transition-colors p-2"
                                            title="Delete Player"
                                            on:click={(e) =>
                                                !confirm(
                                                    "Are you sure you want to delete this player?",
                                                ) && e.preventDefault()}
                                        >
                                            <Trash2 class="w-4 h-4" />
                                        </button>
                                    </form>
                                </td></tr
                            >
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</div>
