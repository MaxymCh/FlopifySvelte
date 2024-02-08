<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    // Mise à jour du chemin avec un niveau supplémentaire
    import Album from "../../../../components/Album.svelte";
    import Navbar from "../../../../components/Navbar.svelte";
    import type { AlbumData } from "../../../../types.ts"; // Assurez-vous que ce chemin est également correct
    import { page } from "$app/stores";

    let albums: AlbumData[] = [];

    $: artistId = $page.params.id; // Réactif : se met à jour si l'ID de l'artiste change

    onMount(async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/artists/${artistId}/albums`,
            );
            albums = response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des albums:", error);
        }
    });
</script>

<Navbar />

<div class="albums-container">
    {#each albums as album}
        <Album {album} />
    {/each}
</div>

<style>
    :root {
        --bg-color: #f9f9f9;
        --text-color-main: #333;
        --text-color-secondary: #666;
        --card-bg-color: #ffffff;
        --card-shadow: rgba(0, 0, 0, 0.1);
        --card-radius: 10px;
        --card-hover-shadow: rgba(0, 0, 0, 0.2);
        --transition-speed: 0.3s;
    }

    .albums-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
        padding: 2rem;
        justify-items: center;
    }
</style>
