<script lang="ts">
    // Utilisez les liens de SvelteKit pour une navigation optimisée
    import { goto } from "$app/navigation";
</script>

<nav class="navbar">
    <div class="nav-logo">MonApp</div>
    <ul class="nav-links">
        <li>
            <a href="/albums" on:click|preventDefault={() => goto("/albums")}
                >Albums</a
            >
        </li>
        <li>
            <a
                href="/musiques"
                on:click|preventDefault={() => goto("/musiques")}>Musiques</a
            >
        </li>
        <li>
            <a
                href="/playlists"
                on:click|preventDefault={() => goto("/playlists")}>Playlists</a
            >
        </li>
    </ul>
</nav>

<style>
    .navbar {
        display: flex;
        align-items: center;
        background-color: #222;
        padding: 0.5rem 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    .nav-logo {
        color: #fff;
        font-weight: bold;
        font-size: 1.5rem;
        cursor: pointer;
        margin-right: 2rem;
        user-select: none;
    }

    .nav-links {
        display: flex;
        list-style: none;
        margin-left: auto;
        padding: 0;
    }

    .nav-links li a {
        color: #ddd;
        text-decoration: none;
        font-size: 1rem;
        padding: 0.75rem 1rem;
        transition: color 0.3s ease;
        border-radius: 4px;
    }

    .nav-links li a:hover,
    .nav-links li a:focus {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>
