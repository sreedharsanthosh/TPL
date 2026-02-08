<script lang="ts">
    import { enhance } from "$app/forms";
    import {
        Calendar,
        Plus,
        Trash2,
        Check,
        X,
        Edit3,
        Clock,
        CheckCircle,
    } from "lucide-svelte";

    export let data;
    export let form;

    let editingMatchId: string | null = null;

    function startEditing(id: string) {
        editingMatchId = id;
    }

    function cancelEditing() {
        editingMatchId = null;
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    $: upcomingMatches = data.matches.filter((m) => m.status !== "completed");
    $: completedMatches = data.matches.filter((m) => m.status === "completed");
</script>

<div class="space-y-8">
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
            Match Management
        </h1>
    </div>

    <!-- Create Match Form -->
    <div
        class="card p-6 border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900 shadow-sm"
    >
        <h2 class="text-lg font-semibold mb-6 flex items-center">
            <Calendar class="w-5 h-5 mr-2 text-emerald-600" />
            Schedule New Match
        </h2>

        {#if form?.error}
            <div
                class="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-md text-sm"
            >
                {form.error}
            </div>
        {/if}

        <form
            method="POST"
            action="?/create"
            use:enhance
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
        >
            <div class="lg:col-span-1">
                <label
                    for="stage"
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >Stage</label
                >
                <select
                    name="stage"
                    class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                >
                    <option value="League">League Match</option>
                    <option value="Round of 16">Round of 16</option>
                    <option value="Quarter Final">Quarter Final</option>
                    <option value="Semi Final">Semi Final</option>
                    <option value="Final">Final</option>
                    <option value="Friendly">Friendly</option>
                </select>
            </div>

            <div class="lg:col-span-1">
                <label
                    for="home_team"
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >Home Team</label
                >
                <select
                    name="home_team_id"
                    required
                    class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                >
                    <option value="">Select Team</option>
                    {#each data.teams as team}
                        <option value={team.id}>{team.name}</option>
                    {/each}
                </select>
            </div>

            <div class="lg:col-span-1">
                <label
                    for="away_team"
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >Away Team</label
                >
                <select
                    name="away_team_id"
                    required
                    class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                >
                    <option value="">Select Team</option>
                    {#each data.teams as team}
                        <option value={team.id}>{team.name}</option>
                    {/each}
                </select>
            </div>

            <div class="lg:col-span-1">
                <label
                    for="date"
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >Date</label
                >
                <input
                    type="date"
                    name="date"
                    required
                    class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                />
            </div>

            <div class="lg:col-span-1">
                <label
                    for="time"
                    class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >Time</label
                >
                <input
                    type="time"
                    name="time"
                    required
                    class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                />
            </div>

            <div class="lg:col-span-1">
                <button
                    type="submit"
                    class="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded transition-colors flex justify-center items-center h-[42px]"
                >
                    <Plus class="w-5 h-5 mr-2" /> Schedule
                </button>
            </div>
        </form>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
        <!-- Upcoming Matches -->
        <div class="space-y-4">
            <h2
                class="text-xl font-bold text-slate-900 dark:text-white flex items-center"
            >
                <Clock class="w-5 h-5 mr-2 text-amber-500" /> Upcoming
                <span
                    class="ml-2 text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
                    >{upcomingMatches.length}</span
                >
            </h2>

            {#if upcomingMatches.length === 0}
                <div
                    class="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400"
                >
                    No scheduled matches.
                </div>
            {/if}

            {#each upcomingMatches as match}
                <div
                    class="card p-4 relative group hover:border-emerald-500/50 transition-colors"
                >
                    {#if editingMatchId === match.id}
                        <!-- Search/Edit Mode for Score -->
                        <form
                            method="POST"
                            action="?/update_score"
                            use:enhance
                            class="flex flex-col items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-emerald-500 animate-in fade-in zoom-in-95 duration-200"
                            on:submit={() => (editingMatchId = null)}
                        >
                            <input type="hidden" name="id" value={match.id} />
                            <h3
                                class="text-sm font-bold uppercase text-emerald-600 mb-2"
                            >
                                Final Score
                            </h3>

                            <div class="flex items-center space-x-3 mb-3">
                                <span
                                    class="font-bold text-slate-900 dark:text-white flex-1 text-right"
                                    >{match.home_team.name}</span
                                >
                                <input
                                    type="number"
                                    name="home_score"
                                    class="w-16 p-2 text-xl font-bold border rounded text-center bg-white dark:bg-slate-900"
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                                <span class="text-slate-400 font-bold">-</span>
                                <input
                                    type="number"
                                    name="away_score"
                                    class="w-16 p-2 text-xl font-bold border rounded text-center bg-white dark:bg-slate-900"
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                                <span
                                    class="font-bold text-slate-900 dark:text-white flex-1"
                                    >{match.away_team.name}</span
                                >
                            </div>

                            <div class="flex space-x-2 w-full">
                                <button
                                    type="submit"
                                    class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 rounded text-sm"
                                >
                                    Save Result
                                </button>
                                <button
                                    type="button"
                                    on:click={cancelEditing}
                                    class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    {:else}
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-bold text-slate-400"
                                >{formatDate(match.match_date)}</span
                            >
                            <span
                                class={`text-xs uppercase font-bold px-3 py-1 rounded-full tracking-wide ${match.stage === "Final" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"}`}
                                >{match.stage}</span
                            >
                        </div>

                        <div class="flex justify-between items-center mb-4">
                            <div
                                class="font-bold text-lg text-slate-900 dark:text-white w-1/3 truncate"
                                title={match.home_team.name}
                            >
                                {match.home_team.name}
                            </div>
                            <div
                                class="text-sm font-bold text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
                            >
                                VS
                            </div>
                            <div
                                class="font-bold text-lg text-slate-900 dark:text-white w-1/3 text-right truncate"
                                title={match.away_team.name}
                            >
                                {match.away_team.name}
                            </div>
                        </div>

                        <div
                            class="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-3 mt-3"
                        >
                            <button
                                on:click={() => startEditing(match.id)}
                                class="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline flex items-center"
                            >
                                <Edit3 class="w-4 h-4 mr-1" /> Update Result
                            </button>

                            <form method="POST" action="?/delete" use:enhance>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={match.id}
                                />
                                <button
                                    type="submit"
                                    class="text-slate-400 hover:text-rose-600 transition-colors"
                                    title="Delete Match"
                                    on:click={(e) =>
                                        !confirm("Delete match?") &&
                                        e.preventDefault()}
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <!-- Completed Matches -->
        <div class="space-y-4">
            <h2
                class="text-xl font-bold text-slate-900 dark:text-white flex items-center opacity-75"
            >
                <CheckCircle class="w-5 h-5 mr-2 text-slate-400" /> Completed
                <span
                    class="ml-2 text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
                    >{completedMatches.length}</span
                >
            </h2>

            {#if completedMatches.length === 0}
                <div
                    class="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400"
                >
                    No completed matches yet.
                </div>
            {/if}

            {#each completedMatches as match}
                <div
                    class="card p-4 opacity-75 hover:opacity-100 transition-opacity bg-slate-50 dark:bg-slate-900/50"
                >
                    {#if editingMatchId === match.id}
                        <form
                            method="POST"
                            action="?/update_score"
                            use:enhance
                            class="flex flex-col items-center p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-emerald-500"
                            on:submit={() => (editingMatchId = null)}
                        >
                            <input type="hidden" name="id" value={match.id} />
                            <div class="flex items-center space-x-3 mb-2">
                                <input
                                    type="number"
                                    name="home_score"
                                    class="w-12 p-1 text-lg font-bold border rounded text-center"
                                    value={match.home_score}
                                    min="0"
                                />
                                <span class="text-slate-400">-</span>
                                <input
                                    type="number"
                                    name="away_score"
                                    class="w-12 p-1 text-lg font-bold border rounded text-center"
                                    value={match.away_score}
                                    min="0"
                                />
                            </div>
                            <div class="flex space-x-2 text-xs w-full">
                                <button
                                    type="submit"
                                    class="flex-1 bg-emerald-600 text-white rounded py-1"
                                    >Save</button
                                >
                                <button
                                    type="button"
                                    on:click={cancelEditing}
                                    class="flex-1 bg-slate-200 text-slate-600 rounded py-1"
                                    >Cancel</button
                                >
                            </div>
                        </form>
                    {:else}
                        <div
                            class="flex justify-between items-center text-sm mb-2"
                        >
                            <span class="text-slate-400"
                                >{formatDate(match.match_date)}</span
                            >
                            <div class="flex items-center space-x-2">
                                <span
                                    class={`text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide ${match.stage === "Final" ? "bg-amber-100 text-amber-700" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                                    >{match.stage}</span
                                >
                                <button
                                    on:click={() => startEditing(match.id)}
                                    class="text-slate-400 hover:text-emerald-600"
                                    title="Edit Score"
                                    ><Edit3 class="w-3.5 h-3.5" /></button
                                >
                                <form
                                    method="POST"
                                    action="?/delete"
                                    use:enhance
                                    class="inline-block"
                                >
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={match.id}
                                    />
                                    <button
                                        type="submit"
                                        class="text-slate-400 hover:text-rose-600"
                                        title="Delete Match"
                                        on:click={(e) =>
                                            !confirm("Delete match history?") &&
                                            e.preventDefault()}
                                        ><Trash2 class="w-3.5 h-3.5" /></button
                                    >
                                </form>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <div
                                class={`font-bold ${match.home_score > match.away_score ? "text-emerald-600" : "text-slate-600 dark:text-slate-400"}`}
                            >
                                {match.home_team.name}
                            </div>
                            <div
                                class="font-mono font-bold text-lg bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-2 rounded"
                            >
                                {match.home_score} - {match.away_score}
                            </div>
                            <div
                                class={`font-bold ${match.away_score > match.home_score ? "text-emerald-600" : "text-slate-600 dark:text-slate-400"}`}
                            >
                                {match.away_team.name}
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>
