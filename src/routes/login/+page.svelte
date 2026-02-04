<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import { Lock } from "lucide-svelte";

    let email = "";
    let password = "";
    let loading = false;
    let errorMsg = "";

    async function handleLogin() {
        loading = true;
        errorMsg = "";

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            errorMsg = error.message;
            loading = false;
        } else {
            loading = false;
            goto("/admin");
        }
    }
</script>

<svelte:head>
    <title>Admin Login | TKM Premier League</title>
</svelte:head>

<div
    class="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-4"
>
    <div
        class="max-w-md w-full bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800"
    >
        <div class="px-8 py-10">
            <div class="text-center mb-10">
                <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mb-6"
                >
                    <Lock class="w-8 h-8" />
                </div>
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Admin Portal
                </h1>
                <p class="text-sm text-slate-500 mt-2">
                    Sign in to manage the league
                </p>
            </div>

            {#if errorMsg}
                <div
                    class="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm rounded-md text-center"
                >
                    {errorMsg}
                </div>
            {/if}

            <form on:submit|preventDefault={handleLogin} class="space-y-6">
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >Email Address</label
                    >
                    <input
                        type="email"
                        id="email"
                        bind:value={email}
                        required
                        class="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        placeholder="admin@example.com"
                    />
                </div>

                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                        >Password</label
                    >
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        required
                        class="w-full px-4 py-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
        <div
            class="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500"
        >
            &copy; TKM Premier League Admin
        </div>
    </div>
</div>
