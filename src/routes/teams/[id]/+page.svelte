<script lang="ts">
    import { ArrowLeft, User, Shield, Briefcase } from "lucide-svelte";
    export let data;
</script>

<svelte:head>
    <title>{data.team.name} | TKM Premier League</title>
</svelte:head>

<div class="bg-slate-900 text-white py-12 relative overflow-hidden">
    <div
        class="absolute inset-0 bg-emerald-600/10 pattern-grid-lg opacity-20"
    ></div>
    <div class="container-custom relative z-10">
        <a
            href="/teams"
            class="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
        >
            <ArrowLeft class="w-5 h-5 mr-2" /> Back to Teams
        </a>

        <div
            class="flex flex-col lg:flex-row items-center lg:items-start gap-8"
        >
            <!-- Team Logo -->
            <div
                class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border-4 border-slate-700 overflow-hidden"
            >
                {#if data.team.logo_url}
                    <img
                        src={data.team.logo_url}
                        alt={data.team.name}
                        class="w-full h-full object-cover"
                    />
                {:else}
                    <Shield class="w-16 h-16 text-slate-600" />
                {/if}
            </div>

            <!-- Team Stats -->
            <div class="text-center lg:text-left flex-1">
                <h1 class="text-4xl font-bold mb-4">{data.team.name}</h1>
                <div
                    class="flex flex-wrap gap-4 justify-center lg:justify-start mb-6"
                >
                    <div
                        class="bg-slate-800 px-4 py-2 rounded-lg text-center min-w-[80px]"
                    >
                        <div
                            class="text-xs text-slate-400 uppercase font-bold tracking-wider"
                        >
                            Played
                        </div>
                        <div class="text-2xl font-bold text-white">
                            {data.team.played}
                        </div>
                    </div>
                    <div
                        class="bg-slate-800 px-4 py-2 rounded-lg text-center min-w-[80px]"
                    >
                        <div
                            class="text-xs text-slate-400 uppercase font-bold tracking-wider"
                        >
                            Points
                        </div>
                        <div class="text-2xl font-bold text-emerald-500">
                            {data.team.points}
                        </div>
                    </div>
                    <div
                        class="bg-slate-800 px-4 py-2 rounded-lg text-center min-w-[80px]"
                    >
                        <div
                            class="text-xs text-slate-400 uppercase font-bold tracking-wider"
                        >
                            GD
                        </div>
                        <div class="text-2xl font-bold text-slate-300">
                            {data.team.goal_difference}
                        </div>
                    </div>
                </div>

                <!-- Managers Section -->
                {#if data.team.manager_name || data.team.manager2_name}
                    <div
                        class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <!-- Manager 1 -->
                        {#if data.team.manager_name}
                            <div
                                class="bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg border border-slate-700 flex items-center space-x-3 w-full sm:w-auto min-w-[200px]"
                            >
                                <div
                                    class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden shrink-0 border-2 border-emerald-500/30"
                                >
                                    {#if data.team.manager_image_url}
                                        <img
                                            src={data.team.manager_image_url}
                                            alt="Manager"
                                            class="w-full h-full object-cover"
                                        />
                                    {:else}
                                        <Briefcase
                                            class="w-5 h-5 text-slate-400"
                                        />
                                    {/if}
                                </div>
                                <div>
                                    <div
                                        class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-none mb-1"
                                    >
                                        Manager
                                    </div>
                                    <div
                                        class="font-bold text-base leading-tight"
                                    >
                                        {data.team.manager_name}
                                    </div>
                                </div>
                            </div>
                        {/if}

                        <!-- Manager 2 -->
                        {#if data.team.manager2_name}
                            <div
                                class="bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg border border-slate-700 flex items-center space-x-3 w-full sm:w-auto min-w-[200px]"
                            >
                                <div
                                    class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden shrink-0 border-2 border-emerald-500/30"
                                >
                                    {#if data.team.manager2_image_url}
                                        <img
                                            src={data.team.manager2_image_url}
                                            alt="Manager"
                                            class="w-full h-full object-cover"
                                        />
                                    {:else}
                                        <Briefcase
                                            class="w-5 h-5 text-slate-400"
                                        />
                                    {/if}
                                </div>
                                <div>
                                    <div
                                        class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-none mb-1"
                                    >
                                        Manager
                                    </div>
                                    <div
                                        class="font-bold text-base leading-tight"
                                    >
                                        {data.team.manager2_name}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="container-custom py-12">
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Squad
    </h2>

    {#if data.players.length === 0}
        <div
            class="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700"
        >
            <p class="text-slate-500">No players listed for this team yet.</p>
        </div>
    {:else}
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
            {#each data.players as player}
                <div
                    class="card p-4 flex items-center hover:shadow-md transition-shadow"
                >
                    <div
                        class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mr-4 flex items-center justify-center shrink-0 overflow-hidden"
                    >
                        {#if player.image_url}
                            <img
                                src={player.image_url}
                                alt={player.name}
                                class="w-full h-full object-cover"
                            />
                        {:else}
                            <User class="w-6 h-6 text-slate-400" />
                        {/if}
                    </div>
                    <div>
                        <h3 class="font-bold text-slate-900 dark:text-white">
                            {player.name}
                        </h3>
                        {#if player.goals > 0}
                            <div
                                class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full inline-block mt-1"
                            >
                                {player.goals} Goals
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
