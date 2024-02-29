<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let username = "";

    onMount(() => {
        username = localStorage.getItem("username") || "Invité"; // Récupère le username du localStorage
    });

    function logout() {
        console.log("Utilisateur déconnecté");
        localStorage.removeItem("token");
        localStorage.removeItem("username"); // Assurez-vous de supprimer le username également lors de la déconnexion
        goto("/login");
    }
</script>

<nav class="navbar">
    <a href="/" class="nav-logo" on:click={() => goto("/")}>Flopify</a>
    <ul class="nav-links">
        <li>
            <a href="/albums" on:click|preventDefault={() => goto("/")}
                >Albums</a
            >
        </li>
        <li>
            <a href="/musics" on:click|preventDefault={() => goto("/musics")}
                >Musiques</a
            >
        </li>
        <li class="user-info">
            <i class="fas fa-user"></i>
            <p>{username}</p>
        </li>
        <li>
            <button class="logout-button" on:click={logout}
                >Se déconnecter</button
            >
        </li>
    </ul>
</nav>

<style>
    .user-info {
        display: flex;
        align-items: center;
        color: white; /* Couleur du texte */
    }
    .user-info i {
        margin-right: 8px; /* Espacement entre l'icône et le texte */
    }
    .user-info p {
        margin: 0; /* Retire la marge par défaut */
        font-size: 1.2rem; /* Taille plus grande */
    }
    .navbar {
        display: flex;
        align-items: center;
        background-color: #333;
        padding: 0.5rem 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    .nav-logo {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        font-size: 1.5rem;
        cursor: pointer;
        margin-right: auto; /* Align to the left */
        user-select: none;
    }

    .nav-links {
        align-items: center;
        display: flex;
        list-style: none;
        padding: 0;
        gap: 1rem; /* Adds space between links and logout button */
    }

    .nav-links li a,
    .logout-button {
        color: #ddd;
        text-decoration: none;
        font-size: 1rem;
        padding: 0.75rem 1rem;
        transition: all 0.3s ease;
        border-radius: 4px;
        cursor: pointer;
        background: none;
        border: none;
        outline: none;
    }

    .nav-links li a:hover,
    .nav-links li a:focus,
    .logout-button:hover,
    .logout-button:focus {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .logout-button {
        background-color: #f44336; /* Red color for the logout button */
        color: white;
        font-weight: bold;
    }
</style>
