<script lang="ts">
    import type { AlbumData } from "../types";
    import { goto } from "$app/navigation";
    import Button from "@smui/button/src/Button.svelte";
    export let album: AlbumData;

    function goToAlbumMusics() {
        goto(`/albums/${album.id}/musics`);
    }

    function goToArtistAlbums(event) {
        event.stopPropagation(); // Cela empêche l'événement de clic d'atteindre le bouton parent.
        goto(`/artists/${album.artist_id}/albums`);
    }
</script>

<button class="album-card" on:click={goToAlbumMusics}>
    <div class="album-image-container">
        {#if album.url_image}
            <img
                src={album.url_image}
                alt={`Couverture de ${album.name}`}
                class="album-image"
            />
        {:else}
            <div class="image-placeholder">No Image Available</div>
        {/if}
    </div>
    <div class="album-info">
        <h2>{album.name}</h2>
        <p>Date de sortie : {album.release_date}</p>
        <p>
            Artiste :
            <button class="artist-name" on:click={goToArtistAlbums}>
                {album.artist_name}
            </button>
        </p>
    </div>
</button>

<style>
    .album-card {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        text-align: left;
        width: 100%; /* Assurez-vous que le bouton remplit le conteneur */
        cursor: pointer;
        display: block; /* Pour permettre de prendre toute la largeur */
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }

    .album-card:hover {
        background-color: #f2f2f2; /* ou une autre couleur de votre choix */
        transform: translateY(-5px);
    }

    /* Container pour l'image de l'album */
    .album-image-container {
        width: 100%;
        height: 200px;
        overflow: hidden;
    }

    /* Style pour l'image de l'album */
    .album-image,
    .image-placeholder {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    /* Placeholder pour l'image manquante */
    .image-placeholder {
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
    }

    /* Informations sur l'album */
    .album-info {
        padding: 15px;
    }

    /* Style pour le titre de l'album */
    .album-info h2 {
        margin: 0;
        font-size: 18px;
        color: #333;
    }

    /* Style pour la date de sortie de l'album */
    .album-info p {
        margin-top: 10px;
        font-size: 16px;
        color: #666;
    }

    .artist-name {
        cursor: pointer;
        border: none;
        background-color: transparent;
    }

    .artist-name:hover {
        text-decoration: underline;
        color: #0645ad; /* Ou une couleur indiquant qu'il s'agit d'un lien */
    }
</style>
