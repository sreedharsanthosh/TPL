<script lang="ts">
    import { enhance } from "$app/forms";
    import {
        Plus,
        Trash2,
        Edit2,
        Upload,
        Loader2,
        User,
        Shield,
        Briefcase,
    } from "lucide-svelte";
    import { supabase } from "$lib/supabase";

    export let data;
    export let form;

    let editingTeam: any = null;
    // Upload States
    let logoUploadState: "idle" | "uploading" | "done" = "idle";
    let managerUploadState: "idle" | "uploading" | "done" = "idle";
    let manager2UploadState: "idle" | "uploading" | "done" = "idle";

    // Uploaded URLs
    let uploadedLogoUrl: string | null = null;
    let uploadedManagerUrl: string | null = null;
    let uploadedManager2Url: string | null = null;

    // Clean form state
    let formName = "";
    let formManagerName = "";
    let formManager2Name = "";

    function startEditing(team: any) {
        editingTeam = team;
        formName = team.name;
        formManagerName = team.manager_name || "";
        formManager2Name = team.manager2_name || "";

        uploadedLogoUrl = team.logo_url;
        uploadedManagerUrl = team.manager_image_url;
        uploadedManager2Url = team.manager2_image_url;

        logoUploadState = "idle";
        managerUploadState = "idle";
        manager2UploadState = "idle";
    }

    function cancelEditing() {
        editingTeam = null;
        resetForm();
    }

    function resetForm() {
        formName = "";
        formManagerName = "";
        formManager2Name = "";

        uploadedLogoUrl = null;
        uploadedManagerUrl = null;
        uploadedManager2Url = null;

        logoUploadState = "idle";
        managerUploadState = "idle";
        manager2UploadState = "idle";
    }

    async function uploadImage(
        e: Event,
        type: "logo" | "manager" | "manager2",
    ) {
        const input = e.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        if (type === "logo") logoUploadState = "uploading";
        else if (type === "manager") managerUploadState = "uploading";
        else manager2UploadState = "uploading";

        try {
            const { error: uploadError } = await supabase.storage
                .from("player-images") // Reusing the same public bucket for simplicity
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl },
            } = supabase.storage.from("player-images").getPublicUrl(filePath);

            if (type === "logo") {
                uploadedLogoUrl = publicUrl;
                logoUploadState = "done";
            } else if (type === "manager") {
                uploadedManagerUrl = publicUrl;
                managerUploadState = "done";
            } else {
                uploadedManager2Url = publicUrl;
                manager2UploadState = "done";
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");

            if (type === "logo") logoUploadState = "idle";
            else if (type === "manager") managerUploadState = "idle";
            else manager2UploadState = "idle";
        }
    }
</script>

<div class="space-y-8">
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
            Team Management
        </h1>
    </div>

    <!-- Create/Edit Form -->
    <div class="card p-6 border-l-4 border-l-emerald-500">
        <h2 class="text-lg font-semibold mb-6 flex items-center">
            {#if editingTeam}
                <Edit2 class="w-5 h-5 mr-2 text-emerald-600" /> Edit Team
            {:else}
                <Plus class="w-5 h-5 mr-2 text-emerald-600" /> Create New Team
            {/if}
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
            action={editingTeam ? "?/update" : "?/create"}
            use:enhance
            class="space-y-6"
            on:submit={() => {
                if (!editingTeam) setTimeout(resetForm, 500);
            }}
        >
            <input type="hidden" name="id" value={editingTeam?.id || ""} />
            <input
                type="hidden"
                name="logo_url"
                value={uploadedLogoUrl || ""}
            />
            <input
                type="hidden"
                name="manager_image_url"
                value={uploadedManagerUrl || ""}
            />
            <input
                type="hidden"
                name="manager2_image_url"
                value={uploadedManager2Url || ""}
            />

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Team Details -->
                <div class="space-y-4">
                    <h3
                        class="font-medium text-slate-900 dark:text-white flex items-center border-b pb-2"
                    >
                        <Shield class="w-4 h-4 mr-2" /> Team Info
                    </h3>

                    <div>
                        <label
                            for="name"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >Team Name</label
                        >
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Thunder FC"
                            required
                            bind:value={formName}
                            class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >Team Logo</label
                        >
                        <div class="flex items-center space-x-4">
                            <div
                                class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border flex items-center justify-center overflow-hidden shrink-0"
                            >
                                {#if uploadedLogoUrl}
                                    <img
                                        src={uploadedLogoUrl}
                                        alt="Preview"
                                        class="w-full h-full object-cover"
                                    />
                                {:else}
                                    <Shield class="w-8 h-8 text-slate-400" />
                                {/if}
                            </div>
                            <div class="flex-1">
                                <label
                                    class="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm hover:text-slate-500 focus:outline-none focus:border-emerald-300 focus:shadow-outline-emerald active:text-slate-800 active:bg-slate-50 transition ease-in-out duration-150"
                                >
                                    {#if logoUploadState === "uploading"}
                                        <Loader2
                                            class="w-4 h-4 mr-2 animate-spin"
                                        /> Uploading...
                                    {:else}
                                        <Upload class="w-4 h-4 mr-2" /> Select Logo
                                    {/if}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        on:change={(e) =>
                                            uploadImage(e, "logo")}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Manager 1 Details -->
                <div class="space-y-4">
                    <h3
                        class="font-medium text-slate-900 dark:text-white flex items-center border-b pb-2"
                    >
                        <Briefcase class="w-4 h-4 mr-2" /> Manager 1
                    </h3>

                    <div>
                        <label
                            for="manager_name"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >Name</label
                        >
                        <input
                            type="text"
                            name="manager_name"
                            placeholder="e.g. Jose Mourinho"
                            bind:value={formManagerName}
                            class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >Photo</label
                        >
                        <div class="flex items-center space-x-4">
                            <div
                                class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border flex items-center justify-center overflow-hidden shrink-0"
                            >
                                {#if uploadedManagerUrl}
                                    <img
                                        src={uploadedManagerUrl}
                                        alt="Preview"
                                        class="w-full h-full object-cover"
                                    />
                                {:else}
                                    <User class="w-8 h-8 text-slate-400" />
                                {/if}
                            </div>
                            <div class="flex-1">
                                <label
                                    class="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm hover:text-slate-500 focus:outline-none focus:border-emerald-300 focus:shadow-outline-emerald active:text-slate-800 active:bg-slate-50 transition ease-in-out duration-150"
                                >
                                    {#if managerUploadState === "uploading"}
                                        <Loader2
                                            class="w-4 h-4 mr-2 animate-spin"
                                        /> Uploading...
                                    {:else}
                                        <Upload class="w-4 h-4 mr-2" /> Select Photo
                                    {/if}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        on:change={(e) =>
                                            uploadImage(e, "manager")}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Manager 2 Details -->
                <div class="space-y-4">
                    <h3
                        class="font-medium text-slate-900 dark:text-white flex items-center border-b pb-2"
                    >
                        <Briefcase class="w-4 h-4 mr-2" /> Manager 2 (Optional)
                    </h3>

                    <div>
                        <label
                            for="manager2_name"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >Name</label
                        >
                        <input
                            type="text"
                            name="manager2_name"
                            placeholder="e.g. Pep Guardiola"
                            bind:value={formManager2Name}
                            class="w-full form-input p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                            >Photo</label
                        >
                        <div class="flex items-center space-x-4">
                            <div
                                class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border flex items-center justify-center overflow-hidden shrink-0"
                            >
                                {#if uploadedManager2Url}
                                    <img
                                        src={uploadedManager2Url}
                                        alt="Preview"
                                        class="w-full h-full object-cover"
                                    />
                                {:else}
                                    <User class="w-8 h-8 text-slate-400" />
                                {/if}
                            </div>
                            <div class="flex-1">
                                <label
                                    class="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm hover:text-slate-500 focus:outline-none focus:border-emerald-300 focus:shadow-outline-emerald active:text-slate-800 active:bg-slate-50 transition ease-in-out duration-150"
                                >
                                    {#if manager2UploadState === "uploading"}
                                        <Loader2
                                            class="w-4 h-4 mr-2 animate-spin"
                                        /> Uploading...
                                    {:else}
                                        <Upload class="w-4 h-4 mr-2" /> Select Photo
                                    {/if}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        on:change={(e) =>
                                            uploadImage(e, "manager2")}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800"
            >
                {#if editingTeam}
                    <button
                        type="button"
                        on:click={cancelEditing}
                        class="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                {/if}
                <button
                    type="submit"
                    disabled={logoUploadState === "uploading" ||
                        managerUploadState === "uploading" ||
                        manager2UploadState === "uploading"}
                    class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium transition-colors"
                >
                    {editingTeam ? "Update Team" : "Create Team"}
                </button>
            </div>
        </form>
    </div>

    <!-- Team List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.teams as team}
            <div
                class="card p-6 hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 flex flex-col items-center text-center relative group"
            >
                <div
                    class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <button
                        on:click={() => startEditing(team)}
                        class="p-1.5 bg-slate-100 dark:bg-slate-800 text-emerald-600 rounded hover:bg-emerald-50"
                        ><Edit2 class="w-4 h-4" /></button
                    >
                    <a
                        href={`/admin/teams/${team.id}`}
                        class="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded hover:bg-slate-200 text-xs font-bold leading-none flex items-center"
                        >Players</a
                    >
                </div>

                <!-- Logo -->
                <div
                    class="w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-800 mb-4 flex items-center justify-center overflow-hidden shadow-sm border-4 border-white dark:border-slate-800"
                >
                    {#if team.logo_url}
                        <img
                            src={team.logo_url}
                            alt={team.name}
                            class="w-full h-full object-cover"
                        />
                    {:else}
                        <Shield class="w-10 h-10 text-slate-300" />
                    {/if}
                </div>

                <h3
                    class="text-xl font-bold text-slate-900 dark:text-white mb-2"
                >
                    {team.name}
                </h3>

                <!-- Manager info -->
                <div class="flex flex-col items-center space-y-1 w-full">
                    {#if team.manager_name}
                        <div
                            class="flex items-center text-sm text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full w-full justify-center"
                        >
                            <Briefcase class="w-3 h-3 mr-2" />
                            <span class="truncate max-w-[150px]"
                                >{team.manager_name}</span
                            >
                        </div>
                    {/if}
                    {#if team.manager2_name}
                        <div
                            class="flex items-center text-sm text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full w-full justify-center"
                        >
                            <Briefcase class="w-3 h-3 mr-2" />
                            <span class="truncate max-w-[150px]"
                                >{team.manager2_name}</span
                            >
                        </div>
                    {/if}
                    {#if !team.manager_name && !team.manager2_name}
                        <div class="text-sm text-slate-400 mt-2 italic">
                            No Managers
                        </div>
                    {/if}
                </div>

                <div
                    class="mt-6 w-full border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between text-sm text-slate-500"
                >
                    <div>
                        <div class="font-bold text-slate-900 dark:text-white">
                            {team.played}
                        </div>
                        <div class="text-xs">Played</div>
                    </div>
                    <div>
                        <div class="font-bold text-slate-900 dark:text-white">
                            {team.points}
                        </div>
                        <div class="text-xs">Pts</div>
                    </div>
                    <div>
                        <div class="font-bold text-slate-900 dark:text-white">
                            {team.goal_difference}
                        </div>
                        <div class="text-xs">GD</div>
                    </div>
                </div>

                <div class="mt-4 w-full">
                    <form method="POST" action="?/delete" use:enhance>
                        <input type="hidden" name="id" value={team.id} />
                        <button
                            type="submit"
                            class="text-rose-500 text-xs hover:text-rose-700 hover:underline w-full py-2"
                            on:click={(e) =>
                                !confirm(
                                    "Delete team? Players will be deleted too.",
                                ) && e.preventDefault()}
                        >
                            Delete Team
                        </button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
</div>
