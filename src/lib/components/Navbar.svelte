<script lang="ts">
  import { page } from "$app/stores";
  import { Menu, X, Trophy } from "lucide-svelte";

  let isMobileMenuOpen = false;

  const links = [
    { href: "/", label: "Home" },
    { href: "/fixtures", label: "Fixtures" },
    { href: "/results", label: "Results" },
    { href: "/scorers", label: "Top Scorers" },
    { href: "/table", label: "Table" },
    { href: "/teams", label: "Teams" },
  ];

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<nav
  class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50"
>
  <div class="container-custom">
    <div class="flex justify-between h-16">
      <!-- Logo / Brand -->
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <span
            class="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center"
          >
            <img src="/logo.png" alt="logo" class="w-8 h-8 m-2" />
            <span class="text-emerald-600">TPL</span>
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        {#each links as link}
          <a
            href={link.href}
            class="text-sm font-medium transition-colors hover:text-emerald-600
            {$page.url.pathname === link.href
              ? 'text-emerald-600'
              : 'text-slate-600 dark:text-slate-400'}"
          >
            {link.label}
          </a>
        {/each}
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center md:hidden">
        <button
          type="button"
          class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2"
          on:click={toggleMobileMenu}
        >
          <span class="sr-only">Open menu</span>
          {#if isMobileMenuOpen}
            <X class="h-6 w-6" />
          {:else}
            <Menu class="h-6 w-6" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMobileMenuOpen}
    <div class="md:hidden border-t border-slate-200 dark:border-slate-800">
      <div class="space-y-1 px-2 pb-3 pt-2">
        {#each links as link}
          <a
            href={link.href}
            class="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800
            {$page.url.pathname === link.href
              ? 'text-emerald-600 bg-slate-50 dark:bg-slate-900/50'
              : 'text-slate-600 dark:text-slate-400'}"
            on:click={() => (isMobileMenuOpen = false)}
          >
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>
