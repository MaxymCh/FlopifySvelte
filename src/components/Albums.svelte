<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Album from "./Album.svelte";
  import type { AlbumData } from "../types";
  import Navbar from "./Navbar.svelte";
  import { Search, Button } from "flowbite-svelte";

  let albums: AlbumData[] = [];
  let searchQuery = ""; // Variable pour stocker la requête de recherche

  async function fetchAlbums(query: string = "") {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/search/albums?q=${query}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      albums = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des albums:", error);
    }
  }

  onMount(() => {
    searchAlbums(); // Charge initialement tous les albums
  });

  // Fonction pour rechercher des albums
  function searchAlbums() {
    fetchAlbums(searchQuery);
  }
</script>

<Navbar />
<div class="main-layout">
  <div class="content">
    <div class="search">
      <Search
        on:input={searchAlbums}
        on:change={searchAlbums}
        size="lg"
        placeholder="Rechercher un album..."
        bind:value={searchQuery}
      >
        <Button variant="primary" on:click={searchAlbums}>Search</Button>
      </Search>
    </div>
    <div class="albums-container">
      {#each albums as album}
        <Album {album} />
      {/each}
    </div>
  </div>
</div>

<style>
  .search {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .main-layout {
    display: flex;
    min-height: 100vh;
  }

  .sidebar {
    width: 240px;
    background-color: #000;
    color: white;
    height: fit-content;
  }

  .content {
    flex-grow: 1;
    background-color: #fff;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .albums-container {
    display: grid;
    margin: 1%;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    justify-content: start;
  }
</style>
