<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import Music from "./Music.svelte";
    import type { MusicData } from "../types";
    import Navbar from "./Navbar.svelte";
    import { Search, Button } from "flowbite-svelte";

    let musics: MusicData[] = [];
    let searchQuery = ""; // Variable pour stocker la requête de recherche

    async function fetchMusics(query: string = "") {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:3000/search/musics?q=${query}`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                },
            );
            musics = response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des musics:", error);
        }
    }

    onMount(() => {
        searchMusics(); // Charge initialement tous les albums
    });

    // Fonction pour rechercher des albums
    function searchMusics() {
        fetchMusics(searchQuery);
    }
</script>

<Navbar />
<div class="main-layout">
    <div class="content">
        <div class="search">
            <Search
                on:input={searchMusics}
                on:change={searchMusics}
                size="lg"
                placeholder="Rechercher une musique..."
                bind:value={searchQuery}
            >
                <Button variant="primary" on:click={searchMusics}>Search</Button
                >
            </Search>
        </div>
        <div class="albums-container">
            {#each musics as music, index (music.music_id)}
                <Music {music} index={index + 1} />
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
