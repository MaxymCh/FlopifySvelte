<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { page } from "$app/stores";
  import type { MusicData, AlbumData } from "../../../../types"; // Assurez-vous que ces types sont bien définis
  import Music from "../../../../components/Music.svelte";
  import Navbar from "../../../../components/Navbar.svelte";

  let musics: MusicData[] = [];
  let album: AlbumData | null = null;
  let albumId: number | string;

  $: albumId = $page.params.id;

  onMount(async () => {
    try {
      const token = localStorage.getItem("token");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      const albumResponse = await axios.get(
        `http://localhost:3000/albums/${albumId}`,
        config,
      );
      album = albumResponse.data;

      const musicsResponse = await axios.get(
        `http://localhost:3000/albums/${albumId}/musics`,
        config,
      );
      musics = musicsResponse.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  });
</script>

<Navbar />

{#if album}
  <div class="album-header">
    <img class="album-image" src={album.url_image} alt={album.name} />
    <div class="album-details">
      <h1>{album.name}</h1>
      <p>{album.artist_name} · {album.release_date} · {musics.length} titres</p>
    </div>
  </div>
{/if}

<div class="musics-list">
  {#each musics as music, index (music.music_id)}
    <Music {music} index={index + 1} />
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

  .album-image {
    width: 200px; /* ou une autre taille appropriée */
    height: 200px; /* ou une autre taille appropriée */
    object-fit: cover;
    border-radius: 4px;
  }

  .album-details h1 {
    margin: 0;
    font-size: 2.5rem;
  }

  .album-details p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
  }

  .musics-list {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  /* Adaptation de vos styles Music existants */
  /* Vous devez définir les styles pour le composant Music ici ou dans son fichier .svelte */
</style>
