<script lang="ts">
  import {
    ArrowRight,
    Trophy,
    Calendar,
    Users,
    ChevronRight,
  } from "lucide-svelte";
  export let data;

  const nextMatch = data.nextMatch;
  const standings = data.table || [];
</script>

<svelte:head>
  <title>TKM Premier League | Home</title>
</svelte:head>

<!-- Hero Section -->
<section
  class="bg-slate-900 text-white py-20 relative overflow-hidden flex items-center"
>
  <div
    class="absolute inset-0 bg-emerald-600/10 pattern-grid-lg opacity-20"
  ></div>
  <div
    class="container-custom relative z-10 flex items-center justify-around w-full flex-wrap"
  >
    <div class="max-w-3xl">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
        The Beat of <span class="text-emerald-500">Football</span> <br />
        <span class="text-slate-300">TKM Premier League</span>
      </h1>
      <p class="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
        Experience the thrill of the league. Follow your favorite teams, track
        live scores, and stay updated with the latest stats and standings of TKM
        College of Engineering's premier football tournament.
      </p>
      <div class="flex flex-wrap gap-4">
        <a
          href="/fixtures"
          class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center"
        >
          View Fixtures <ArrowRight class="ml-2 w-5 h-5" />
        </a>
        <a
          href="/table"
          class="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-all border border-slate-700 hover:border-slate-600"
        >
          League Table
        </a>
      </div>
    </div>
    <div>
      <img src="/logo.png" alt="logo" class="w-72 h-72 my-8 md:my-0" />
    </div>
  </div>
</section>

<!-- Next Match Section -->
{#if nextMatch}
  <section
    class="py-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between mb-8">
        <h2
          class="text-2xl font-bold text-slate-900 dark:text-white flex items-center"
        >
          <Calendar class="w-6 h-6 mr-3 text-emerald-600" /> Next Match
        </h2>
        <a
          href="/fixtures"
          class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
        >
          Full Schedule <ChevronRight class="w-4 h-4 ml-1" />
        </a>
      </div>

      <div class="card p-0 overflow-hidden relative group">
        <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <div
          class="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
        >
          <!-- Home Team -->
          <div class="flex flex-col items-center flex-1 order-1">
            <div
              class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-sm"
            >
              {#if nextMatch.home_team.logo_url}
                <img
                  src={nextMatch.home_team.logo_url}
                  alt={nextMatch.home_team.name}
                  class="w-full h-full object-cover"
                />
              {:else}
                <Trophy class="w-10 h-10 text-slate-300" />
              {/if}
            </div>
            <h3
              class="text-xl font-bold text-slate-900 dark:text-white text-center"
            >
              {nextMatch.home_team.name}
            </h3>
          </div>

          <!-- Match Info -->
          <div class="flex flex-col items-center mx-8 my-8 md:my-0 order-2">
            <div
              class="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2"
            >
              {new Date(nextMatch.match_date).toLocaleDateString(undefined, {
                weekday: "long",
              })}
            </div>
            <div
              class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2"
            >
              {new Date(nextMatch.match_date).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div class="text-slate-500 font-medium mb-4">
              {new Date(nextMatch.match_date).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
              })}
            </div>

            <!-- STAGE TAG -->
            <div
              class="px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider"
            >
              {nextMatch.stage}
            </div>
          </div>

          <!-- Away Team -->
          <div class="flex flex-col items-center flex-1 order-3">
            <div
              class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-sm"
            >
              {#if nextMatch.away_team.logo_url}
                <img
                  src={nextMatch.away_team.logo_url}
                  alt={nextMatch.away_team.name}
                  class="w-full h-full object-cover"
                />
              {:else}
                <Trophy class="w-10 h-10 text-slate-300" />
              {/if}
            </div>
            <h3
              class="text-xl font-bold text-slate-900 dark:text-white text-center"
            >
              {nextMatch.away_team.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}

<section class="py-16 bg-slate-50 dark:bg-slate-900/50">
  <div class="container-custom">
    <div class="flex items-center justify-between mb-8">
      <h2
        class="text-2xl font-bold text-slate-900 dark:text-white flex items-center"
      >
        <Trophy class="w-6 h-6 mr-3 text-emerald-600" /> Standings
      </h2>
      <a
        href="/table"
        class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
      >
        View Full Table <ChevronRight class="w-4 h-4 ml-1" />
      </a>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Pool A -->
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2 border-l-4 border-emerald-500">Pool A</h3>
        <div class="card overflow-hidden">
          <table class="w-full text-left text-sm">
            <thead
              class="bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-500 font-bold"
            >
              <tr>
                <th class="px-4 py-3">Pos</th>
                <th class="px-4 py-3">Team</th>
                <th class="px-4 py-3 text-center">Pts</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              {#each standings.filter(t => t.pool === 'A').slice(0, 5) as team, i}
                <tr
                  class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td class="px-4 py-3 font-bold text-slate-400">#{i + 1}</td>
                  <td
                    class="px-4 py-3 font-bold text-slate-900 dark:text-white flex items-center"
                  >
                    <div
                      class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 mr-2 overflow-hidden flex items-center justify-center"
                    >
                      {#if team.logo_url}
                        <img
                          src={team.logo_url}
                          alt={team.name}
                          class="w-full h-full object-cover"
                        />
                      {:else}
                        <Trophy class="w-3 h-3 text-slate-400" />
                      {/if}
                    </div>
                    {team.name}
                  </td>
                  <td class="px-4 py-3 text-center font-bold text-emerald-600"
                    >{team.points}</td
                  >
                </tr>
              {/each}
              {#if standings.filter(t => t.pool === 'A').length === 0}
                <tr>
                    <td colspan="3" class="px-4 py-8 text-center text-slate-500">No teams in Pool A</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pool B -->
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 px-2 border-l-4 border-emerald-500">Pool B</h3>
        <div class="card overflow-hidden">
          <table class="w-full text-left text-sm">
            <thead
              class="bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-500 font-bold"
            >
              <tr>
                <th class="px-4 py-3">Pos</th>
                <th class="px-4 py-3">Team</th>
                <th class="px-4 py-3 text-center">Pts</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              {#each standings.filter(t => t.pool === 'B').slice(0, 5) as team, i}
                <tr
                  class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td class="px-4 py-3 font-bold text-slate-400">#{i + 1}</td>
                  <td
                    class="px-4 py-3 font-bold text-slate-900 dark:text-white flex items-center"
                  >
                    <div
                      class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 mr-2 overflow-hidden flex items-center justify-center"
                    >
                      {#if team.logo_url}
                        <img
                          src={team.logo_url}
                          alt={team.name}
                          class="w-full h-full object-cover"
                        />
                      {:else}
                        <Trophy class="w-3 h-3 text-slate-400" />
                      {/if}
                    </div>
                    {team.name}
                  </td>
                  <td class="px-4 py-3 text-center font-bold text-emerald-600"
                    >{team.points}</td
                  >
                </tr>
              {/each}
              {#if standings.filter(t => t.pool === 'B').length === 0}
                <tr>
                    <td colspan="3" class="px-4 py-8 text-center text-slate-500">No teams in Pool B</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>
