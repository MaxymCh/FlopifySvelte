<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import Music from "../../../../components/Music.svelte"; // Vérifiez ce chemin
    import { page } from "$app/stores";
    import type { MusicData } from "../../../../types"; // Vérifiez ce chemin

    let musics: MusicData[] = [];

    $: albumId = $page.params.id; // Assurez-vous que le paramètre 'id' est correctement passé à la route

    onMount(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:3000/albums/${albumId}/musics`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                },
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
