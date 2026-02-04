<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import {
        LayoutDashboard,
        Users,
        Trophy,
        LogOut,
        Menu,
        X,
        Club,
    } from "lucide-svelte";

    let loading = true;
    let user: any = null;
    let isMobileMenuOpen = false;

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/teams", label: "Teams", icon: Club },
        { href: "/admin/matches", label: "Matches", icon: Trophy },
    ];

    onMount(async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            goto("/login");
        } else {
            user = session.user;
            loading = false;
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "SIGNED_OUT") {
                    goto("/login");
                }
                user = session?.user;
            },
        );
    });

    async function handleLogout() {
        await supabase.auth.signOut();
        goto("/login");
    }
</script>

{#if loading}
    <div
        class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900"
    >
        <div
            class="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"
        ></div>
    </div>
{:else}
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row"
    >
        <!-- Mobile Header -->
        <div
            class="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center"
        >
            <span class="font-bold flex items-center">
                TKM <span class="text-emerald-500 ml-1">Admin</span>
            </span>
            <button on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
                {#if isMobileMenuOpen}
                    <X />
                {:else}
                    <Menu />
                {/if}
            </button>
        </div>

        <!-- Sidebar -->
        <aside
            class="bg-slate-900 text-slate-400 w-full md:w-64 flex-shrink-0 flex-col md:flex transition-all
        {isMobileMenuOpen ? 'flex' : 'hidden'} md:h-screen sticky top-0"
        >
            <div class="p-6 border-b border-slate-800 hidden md:block">
                <a
                    href="/"
                    class="text-xl font-bold text-white tracking-tight flex items-center"
                >
                    TKM <span class="text-emerald-500 ml-1">Admin</span>
                </a>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-2">
                {#each navItems as item}
                    <a
                        href={item.href}
                        class="flex items-center px-4 py-3 rounded-lg font-medium transition-colors
            {$page.url.pathname === item.href
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                            : 'hover:bg-slate-800 hover:text-white'}"
                    >
                        <svelte:component
                            this={item.icon}
                            class="w-5 h-5 mr-3"
                        />
                        {item.label}
                    </a>
                {/each}
            </nav>

            <div class="p-4 border-t border-slate-800">
                <button
                    on:click={handleLogout}
                    class="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <LogOut class="w-5 h-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-8 overflow-y-auto">
            <div class="max-w-5xl mx-auto">
                <slot />
            </div>
        </main>
    </div>
{/if}
