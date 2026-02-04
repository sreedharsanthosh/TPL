<script lang="ts">
    import { Calendar, Clock, MapPin } from "lucide-svelte";
    export let data;

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    }

    function formatTime(dateString: string) {
        return new Date(dateString).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // Group matches by date
    const matchesByDate = data.matches.reduce((acc: any, match: any) => {
        const date = formatDate(match.match_date);
        if (!acc[date]) acc[date] = [];
        acc[date].push(match);
        return acc;
    }, {});
</script>

<svelte:head>
    <title>Fixtures | TKM Premier League</title>
</svelte:head>

<div class="bg-slate-900 text-white py-12 relative">
    <div
        class="absolute inset-0 bg-emerald-600/10 pattern-grid-lg opacity-20"
    ></div>
    <div class="container-custom relative z-10">
        <h1 class="text-3xl font-bold mb-4">Matches & Fixtures</h1>
        <p class="text-slate-400">
            Upcoming schedule for the TKM Premier League.
        </p>
    </div>
</div>

<div class="container-custom py-12">
    {#if Object.keys(matchesByDate).length === 0}
        <div
            class="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-800"
        >
            <Calendar class="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-slate-500">
                No upcoming matches scheduled
            </h3>
        </div>
    {:else}
        <div class="space-y-12">
            {#each Object.entries(matchesByDate) as [date, matches]}
                <div>
                    <h2
                        class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center border-b border-slate-200 dark:border-slate-800 pb-2"
                    >
                        <Calendar class="w-5 h-5 mr-2 text-emerald-600" />
                        {date}
                    </h2>

                    <div class="grid gap-4">
                        {#each matches as match}
                            <div
                                class="card p-6 hover:border-emerald-500/50 transition-colors group"
                            >
                                <div
                                    class="flex flex-col md:flex-row items-center justify-between"
                                >
                                    <!-- Date/Time/Stage -->
                                    <div
                                        class="flex flex-col items-center md:items-start w-full md:w-32 mb-4 md:mb-0 shrink-0"
                                    >
                                        <div
                                            class="text-2xl font-bold text-slate-900 dark:text-white"
                                        >
                                            {formatTime(match.match_date)}
                                        </div>
                                        {#if match.stage}
                                            <span
                                                class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded mt-1"
                                            >
                                                {match.stage}
                                            </span>
                                        {/if}
                                    </div>

                                    <!-- Teams -->
                                    <div
                                        class="flex-1 flex items-center justify-between w-full px-4 md:px-12"
                                    >
                                        <div
                                            class="flex flex-col items-center w-1/3"
                                        >
                                            <span
                                                class="text-lg font-bold text-slate-900 dark:text-white text-center leading-tight mb-2"
                                                >{match.home_team.name}</span
                                            >
                                        </div>

                                        <div class="font-bold text-slate-300">
                                            VS
                                        </div>

                                        <div
                                            class="flex flex-col items-center w-1/3"
                                        >
                                            <span
                                                class="text-lg font-bold text-slate-900 dark:text-white text-center leading-tight mb-2"
                                                >{match.away_team.name}</span
                                            >
                                        </div>
                                    </div>

                                    <div class="hidden md:block w-32"></div>
                                    <!-- Spacer for alignment -->
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
