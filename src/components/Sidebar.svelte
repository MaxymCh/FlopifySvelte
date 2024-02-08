<script>
    // Importez tout état ou méthode nécessaire ici
</script>

<aside class="sidebar">
    <nav>
        <ul class="nav-list">
            <li><a href="/home">Accueil</a></li>
            <li><a href="/search">Rechercher</a></li>
            <li><a href="/library">Bibliothèque</a></li>
        </ul>

        <ul class="nav-list">
            <li><a href="/create-playlist">+ Créer une playlist</a></li>
            <li><a href="/favorites">Titres likés</a></li>
            <!-- Ajoutez d'autres liens de navigation ou de playlist ici -->
        </ul>

        <ul class="nav-list playlists">
            <li><a href="/playlist/1">Hits</a></li>
        </ul>
    </nav>
</aside>

<style>
    .sidebar {
        width: 100px;
        background-color: #000;
        color: white;
        height: min-content;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        flex: 0 0 240px;
    }

    .nav-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem 0;
    }

    .nav-list li {
        margin: 1rem 0;
    }

    .nav-list li a {
        color: white;
        text-decoration: none;
        font-weight: bold;
    }

    .nav-list li a:hover {
        color: #1db954; /* Couleur verte de Spotify */
    }

    .playlists {
        overflow-y: auto;
        margin-top: auto;
    }

    /* Ajoutez plus de styles selon vos préférences */
</style>
