<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import Album from "./Album.svelte";
  
    let albums: Album[] = [];

  
    onMount(async () => {
      try {
        const response = await axios.get("http://localhost:3000/albums");
        albums = response.data;
        console.log("albums", albums);
      } catch (error) {
        console.error("Erreur lors de la récupération des albums:", error);
      }
    });
  </script>
  
  {#if albums}
    <ul>
        {#each albums as album}
        <div>
          <h2>{album.name}</h2>
          <p>Sorti le : {album.release_date}</p>
        </div>
      {/each}
    </ul>
  {:else}
    <p class="loading">Chargement...</p>
  {/if}
  
  <style>
    .loading {
      opacity: 0;
      animation: 0.4s 0.8s forwards fade-in;
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    li {
      list-style-type: none; /* Adapté pour les albums */
    }
  </style>
  