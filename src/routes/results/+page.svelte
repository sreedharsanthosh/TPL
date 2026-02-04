<script lang="ts">
    import { Trophy, Calendar } from "lucide-svelte";
    export let data;

    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            month: "short",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
</script>

<svelte:head>
    <title>Results | TKM Premier League</title>
</svelte:head>

<div class="bg-slate-900 text-white py-12">
    <div class="container-custom">
        <h1 class="text-4xl font-bold mb-4">Results</h1>
        <p class="text-slate-400">Match outcomes and scores.</p>
    </div>
</div>

<div class="container-custom py-12">
    {#if data.matches.length === 0}
        <div
            class="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700"
        >
            <Trophy class="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium text-slate-900 dark:text-white">
                No matches completed yet
            </h3>
            <p class="text-slate-500">
                Scores will appear here after matches conclude.
            </p>
        </div>
    {:else}
        <div class="grid gap-4">
            {#each data.matches as match}
                <div class="card p-4 md:p-6 hover:shadow-md transition-shadow">
                    <div
                        class="text-center text-xs text-slate-500 mb-4 font-medium uppercase tracking-wide"
                    >
                        {formatDate(match.match_date)} &bull; {match.stage}
                    </div>

                    <div
                        class="flex items-center justify-between max-w-2xl mx-auto"
                    >
                        <!-- Home Team -->
                        <div
                            class="flex-1 flex flex-col md:flex-row items-center justify-end text-center md:text-right"
                        >
                            <span
                                class="text-lg font-bold text-slate-900 dark:text-white order-2 md:order-1 md:mr-4 mt-2 md:mt-0"
                            >
                                {match.home_team.name}
                            </span>
                            <div
                                class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 order-1 md:order-2"
                            >
                                {#if match.home_team.logo_url}
                                    <img
                                        src={match.home_team.logo_url}
                                        alt={match.home_team.name}
                                        class="w-full h-full rounded-full object-cover"
                                    />
                                {:else}
                                    <span
                                        class="font-bold text-slate-400 text-sm"
                                        >{match.home_team.name
                                            .substring(0, 2)
                                            .toUpperCase()}</span
                                    >
                                {/if}
                            </div>
                        </div>

                        <!-- Score -->
                        <div class="px-6 flex flex-col items-center">
                            <div
                                class="text-3xl font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg tracking-widest"
                            >
                                {match.home_score} - {match.away_score}
                            </div>
                            <span
                                class="text-xs text-slate-500 mt-2 font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full"
                                >FT</span
                            >
                        </div>

                        <!-- Away Team -->
                        <div
                            class="flex-1 flex flex-col md:flex-row items-center justify-start text-center md:text-left"
                        >
                            <div
                                class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 mb-2 md:mb-0"
                            >
                                {#if match.away_team.logo_url}
                                    <img
                                        src={match.away_team.logo_url}
                                        alt={match.away_team.name}
                                        class="w-full h-full rounded-full object-cover"
                                    />
                                {:else}
                                    <span
                                        class="font-bold text-slate-400 text-sm"
                                        >{match.away_team.name
                                            .substring(0, 2)
                                            .toUpperCase()}</span
                                    >
                                {/if}
                            </div>
                            <span
                                class="text-lg font-bold text-slate-900 dark:text-white md:ml-4"
                            >
                                {match.away_team.name}
                            </span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
