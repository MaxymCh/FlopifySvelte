<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
    import type { MusicData } from "../../../../types"; // Assurez-vous que AlbumData est bien défini
    import { goto } from "$app/navigation";
    import Music from "../../../../components/Music.svelte";

    let musics: MusicData[] = [];
    let albumId: number | string;

    $: albumId = $page.params.id;

    onMount(async () => {
        try {
            const musicsResponse = await axios.get(
                `http://localhost:3000/albums/${albumId}/musics`,
            );
            musics = musicsResponse.data;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des données :",
                error,
            );
        }
    });
</script>

<div class="content">
    <div class="albums-container">
        {#each musics as music}
            <Music {music} />
        {/each}
    </div>
</div>

<style>
    .album-header {
        text-align: center;
        margin-bottom: 20px;
    }

    .album-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px; /* Optionnel */
    }

    .musics-list {
        display: flex;
        flex-direction: column;
    }

    .music-item {
        cursor: pointer;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .music-item:hover {
        background-color: #f0f0f0;
    }
</style>
