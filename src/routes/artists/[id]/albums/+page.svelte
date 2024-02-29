<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import Album from "../../../../components/Album.svelte";
    import Navbar from "../../../../components/Navbar.svelte";
    import type { AlbumData } from "../../../../types.ts";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let albums: AlbumData[] = [];

    $: artistId = $page.params.id; // Réactif : se met à jour si l'ID de l'artiste change

    onMount(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            goto("/login");
        }
        try {
            const response = await axios.get(
                `http://localhost:3000/artists/${artistId}/albums`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                },
            );
            albums = response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des albums:", error);
        }
    });
</script>

<Navbar />

{#if albums.length > 0}
    <div class="album-header">
        <div class="album-details">
            <h1>{albums[0].artist_name}</h1>
            <p>{albums.length} albums</p>
        </div>
    </div>
{/if}

<div class="albums-container">
    {#each albums as album}
        <Album {album} />
    {/each}
</div>

<style>
    .album-header {
        background-color: #8c67ab;
        color: white;
        padding: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .album-details h1 {
        margin: 0;
        font-size: 2.5rem;
    }

    .album-details p {
        margin: 0.5rem 0 0;
        font-size: 1rem;
    }
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
