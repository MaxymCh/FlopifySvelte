<script>
  import Albums from "../components/Albums.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation"; // SvelteKit pour la redirection

  onMount(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      goto("/login");
    }
  });
</script>

<body>
  <main>
    <Albums />
  </main>
</body>

<style>
  /* Réinitialise les marges et paddings pour tous les éléments */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Assure que padding et border sont inclus dans la dimension totale des éléments */
  }

  body,
  html {
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }

  main {
    background-color: lavenderblush;
    font-size: 15px;
    width: 100%;
    height: 100%; /* S'assure que le main prend toute la hauteur disponible */
  }

  h1 {
    font-size: 25px;
  }
</style>
