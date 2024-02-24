<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Album from "./Album.svelte";
  import type { AlbumData } from "../types"; // Ajustez le chemin selon votre structure de dossier
  import Navbar from "./Navbar.svelte";
  import Sidebar from "./Sidebar.svelte";

  let albums: AlbumData[] = [];
  let currentPage = 1;
  const albumsPerPage = 9; // Nombre d'albums à afficher par page

  onMount(async () => {
    fetchAlbums();
  });

  async function fetchAlbums() {
    try {
      const response = await axios.get(`http://localhost:3000/albums?page=${currentPage}&limit=${albumsPerPage}`);
      albums = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des albums:", error);
    }
  }

  function nextPage() {
    currentPage++;
    fetchAlbums();
  }

  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
      fetchAlbums();
    }
  }
</script>

<Navbar />
<div class="main-layout">
  <Sidebar />

  <div class="content">
    <div class="albums-container">
      {#each albums as album}
        <Album {album} />
      {/each}
    </div>
    <div class="pagination">
      <button on:click={previousPage}>Previous</button>
      <span>Page {currentPage}</span>
      <button on:click={nextPage}>Next</button>
    </div>
  </div>
</div>


<style>
  .main-layout {
    display: flex;
    min-height: 100vh; /* Hauteur minimum pour l'ensemble de la mise en page */
  }

  .sidebar {
    width: 240px; /* Largeur fixe pour la sidebar */
    background-color: #000;
    color: white;
    /* Si vous souhaitez que la sidebar ait une hauteur qui s'adapte à son contenu plutôt qu'à l'écran : */
    height: fit-content; /* ou auto, selon le comportement souhaité */
  }

  .content {
    flex-grow: 1; /* Le contenu prend l'espace restant */
    background-color: #fff; /* Ou toute autre couleur que vous souhaitez */
    padding: 20px; /* Ajustez le padding comme nécessaire */
    overflow-x: hidden; /* Empêche le défilement horizontal */
    overflow-y: auto; /* Ajoute un défilement vertical si nécessaire */
  }

  .albums-container {
    display: grid;
    margin: 1%;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px; /* Espacement entre les éléments de la grille */
    justify-content: start; /* Aligner les éléments de grille au début du conteneur */
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .pagination button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pagination button:hover {
    background-color: #0056b3;
  }

  .pagination span {
    margin: 0 10px;
    font-size: 18px;
  }
</style>
