<script>
  let albums = [];

  console.log('Script start');

  async function fetchData() {
    try {
      console.log('fetchData');
      const res = await fetch("http://localhost:3000/albums");
      if (res.ok) {
        albums = await res.json();
      } else {
        console.log('Response not OK', res);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();
</script>
<h1>Liste des Albums</h1>
<p> { albums } </p>
{#if albums && albums.length > 0}
  <ul>
    {#each albums as album (album.id)}
      <li>{album.name} - Sorti le {album.release_date}</li>
    {/each}
  </ul>
{:else}
  <p>Aucun album trouvé.</p>
{/if}
