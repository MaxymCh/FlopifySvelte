<script lang="ts">
    import type { MusicData } from "../types";
    export let music: MusicData;
    export let index: number;
</script>

<div class="music-item">
    <div class="album-art">
        {#if music.url_image}
            <img
                src={music.url_image}
                alt={`Couverture de l'album ${music.album_name}`}
                class="album-image"
            />
        {:else}
            <div class="image-placeholder">Pas d'image disponible</div>
        {/if}
    </div>
    <div class="track-info">
        <div class="track-title">{music.title}</div>
        <div class="track-artist">{music.artist_name}</div>
        <div class="track-album">{music.album_name}</div>
        <div class="track-release-date">{music.albums_release_date}</div>
    </div>
</div>

<style>
    .music-item {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .album-art {
        flex-shrink: 0;
        margin-right: 20px;
    }

    .album-image {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        object-fit: cover;
    }

    .image-placeholder {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
    }

    .track-info {
        flex-grow: 1;
        margin-right: 20px;
    }

    .track-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .track-artist,
    .track-album,
    .track-release-date {
        font-size: 16px;
        color: #666;
    }

    .track-number {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        flex-shrink: 0;
    }
</style>
