<script lang="ts">
    import type { MusicData } from "../types"; // Assurez-vous que ce chemin correspond à l'emplacement de vos définitions de type
    export let music: MusicData;
    export let index: number; // Pour afficher le numéro de la piste
</script>

<tr class="music-item">
    <td>
        <div class="music-title">
            {#if music.url_image}
                <img
                    class="album-cover"
                    src={music.url_image}
                    alt={`Couverture de l'album ${music.album_name}`}
                />
            {/if}
            {music.title}
        </div>
    </td>
    <td>{music.album_name}</td>
    <!-- Supposons que duration est un champ disponible dans MusicData -->
</tr>

<style>
    .music-item {
        cursor: pointer;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .music-item:hover {
        background-color: #f0f0f0;
    }

    .music-title {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .album-cover {
        width: 40px; /* ou toute autre taille appropriée */
        height: 40px; /* Maintenez le rapport d'aspect */
        object-fit: cover; /* Assurez-vous que l'image couvre la zone sans être déformée */
        border-radius: 4px; /* Optionnel: pour les coins arrondis */
    }
</style>
