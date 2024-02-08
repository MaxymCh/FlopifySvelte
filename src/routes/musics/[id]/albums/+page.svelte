<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import Music from "../../../../components/Music.svelte";
    import { page } from "$app/stores";
    import type { MusicData } from "../../../../types";

    let musics: MusicData[] = [];

    $: albumId = $page.params.id;

    onMount(async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/albums/${albumId}/musics`,
            );
            musics = response.data;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des musiques de l'album:",
                error,
            );
        }
    });
</script>

{#if musics.length > 0}
    <table class="musics-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Titre</th>
                <th>Album</th>
                <th>Date de sortie</th>
                <th>Durée</th>
            </tr>
        </thead>
        <tbody>
            {#each musics as music, index}
                <Music {music} {index} />
            {/each}
        </tbody>
    </table>
{:else}
    <p>Aucun morceau trouvé pour cet album.</p>
{/if}
