<script lang="ts">
    interface Album {
      name: string;
      release_date: string;
    }
  
    export let album: Album;
</script>
<article>
    <h1>{album.name}</h1>
    <small>
        Sorti le : <b>{album.release_date}</b>
    </small>
</article>

<style>
    article {
        margin: 0 0 1em 0;
    }
    h1 {
        font-size: 1.4em;
        margin: 0;
        display: block;
    }
</style>
  