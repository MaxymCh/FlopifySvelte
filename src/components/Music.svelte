<script lang="ts">
    import type { MusicData } from "../types"; 
    export let music: MusicData;
    export let index: number;
</script>

<div class="music-item">
    <div class="track-number">{index}</div>
    <div class="album-art">
        {#if music.url_image}
            <img src={music.url_image} alt={`Couverture de l'album ${music.album_name}`} />
        {/if}
    </div>
    <div class="track-info">
        <div class="track-title">{music.title}</div>
        <div class="track-artist">{music.artist_name}</div>
    </div>
    <div class="album-info">
        <div class="track-album">{music.album_name}</div>
    </div>
    <div class="album-date">
        <div class="track-release-date">{music.albums_release_date}</div>
    </div>
</div>

<style>
    .music-item {
        display: flex;
        align-items: center;
        justify-content: space-between; /* Ajouté pour espacer les éléments */
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .track-number {
        flex-basis: 10%;
        text-align: center;
    }

    .album-art img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        flex-basis: 10%;
    }

    .track-info {
        flex-basis: 30%;
    }

    .track-title {
        font-weight: bold;
    }

    .track-artist {
        font-size: 0.9em;
        color: #666;
    }

    .album-info {
        flex-basis: 25%;
        text-align: left;
    }

    .track-album {
        font-weight: bold;
    }

    .album-date {
        flex-basis: 25%;
        text-align: right;
    }

    .track-release-date {
        font-size: 0.9em;
        color: #666;
    }
</style>
