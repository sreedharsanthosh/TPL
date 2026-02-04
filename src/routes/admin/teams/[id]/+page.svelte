<script lang="ts">
    import { enhance } from "$app/forms";
    import {
        ArrowLeft,
        Plus,
        Trash2,
        Save,
        User,
        Loader2,
    } from "lucide-svelte";
    import { supabase } from "$lib/supabase";

    export let data;
    export let form;

    let uploading = false;
    let uploadedImageUrl = "";

    async function uploadImage(e: Event) {
        const input = e.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `temp/${fileName}`;

        uploading = true;

        try {
            const { error: uploadError } = await supabase.storage
                .from("player-images")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl },
            } = supabase.storage.from("player-images").getPublicUrl(filePath);

            uploadedImageUrl = publicUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image!");
        } finally {
            uploading = false;
        }
    }
</script>

<div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center space-x-4 mb-8">
        <a
            href="/admin/teams"
            class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
            <ArrowLeft class="w-6 h-6" />
        </a>
        {#if data.team}
            <div class="flex items-center space-x-4">
                <div
                    class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0"
                >
                    {#if data.team.logo_url}
                        <img
                            src={data.team.logo_url}
                            alt={data.team.name}
                            class="w-full h-full rounded-full object-cover"
                        />
                    {:else}
                        <span class="font-bold text-slate-400"
                            >{data.team.name
                                .substring(0, 2)
                                .toUpperCase()}</span
                        >
                    {/if}
                </div>
                <div>
                    <h1
                        class="text-2xl font-bold text-slate-900 dark:text-white"
                    >
                        {data.team.name}
                    </h1>
                    <p class="text-slate-500 text-sm">Manage Players</p>
                </div>
            </div>
        {:else}
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                Team Not Found
            </h1>
        {/if}
    </div>

    {#if data.team}
        <!-- Add Player Form -->
        <div
            class="card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        >
            <h2 class="text-lg font-semibold mb-4 flex items-center">
                <Plus class="w-5 h-5 mr-2 text-emerald-600" />
                Add Player
            </h2>

            {#if form?.error}
                <div
                    class="mb-4 p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm rounded-md"
                >
                    {form.error}
                </div>
            {/if}

            <form
                method="POST"
                action="?/create_player"
                use:enhance
                class="flex flex-col md:flex-row gap-4 items-end"
            >
                <div class="flex-1 w-full">
                    <label
                        for="name"
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                        >Player Name</label
                    >
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. Lionel Messi"
                        required
                        class="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div class="flex-1 w-full relative">
                    <label
                        for="image"
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                        >Player Image</label
                    >
                    {#if uploading}
                        <div
                            class="flex items-center text-sm text-slate-500 py-2"
                        >
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" /> Uploading...
                        </div>
                    {/if}

                    <input
                        type="file"
                        accept="image/*"
                        on:change={uploadImage}
                        disabled={uploading}
                        class="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 disabled:opacity-50"
                    />
                    <input
                        type="hidden"
                        name="image_url"
                        value={uploadedImageUrl}
                    />

                    {#if uploadedImageUrl}
                        <div
                            class="absolute right-0 top-8 w-8 h-8 rounded-full overflow-hidden border border-emerald-500"
                        >
                            <img
                                src={uploadedImageUrl}
                                alt="Preview"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    {/if}
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add Player
                </button>
            </form>
        </div>

        <!-- Player List -->
        <div class="card overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                    <thead
                        class="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500"
                    >
                        <tr>
                            <th class="px-6 py-3">Player</th>
                            <th class="px-6 py-3 text-center">Goals</th>
                            <th class="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        {#if data.players.length === 0}
                            <tr>
                                <td
                                    colspan="3"
                                    class="px-6 py-8 text-center text-slate-500"
                                    >No players added yet.</td
                                >
                            </tr>
                        {:else}
                            {#each data.players as player}
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
                                    <td class="px-6 py-4 text-center">
                                        <form
                                            method="POST"
                                            action="?/update_player_goals"
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
                                                class="w-16 px-2 py-1 text-center border rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                                            />
                                            <button
                                                type="submit"
                                                class="text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-400 p-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                                                title="Save Goals"
                                            >
                                                <Save class="w-4 h-4" />
                                            </button>
                                        </form>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <form
                                            method="POST"
                                            action="?/delete_player"
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
                                                class="text-rose-600 hover:text-rose-800 dark:hover:text-rose-400 p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                                                title="Delete Player"
                                                on:click={(e) =>
                                                    !confirm(
                                                        "Delete this player?",
                                                    ) && e.preventDefault()}
                                            >
                                                <Trash2 class="w-4 h-4" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
</div>
