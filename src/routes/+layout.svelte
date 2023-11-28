<script>
  import Header from '../components/header.svelte';
  import "@fontsource/roboto";
</script>

<Header/>

<main>
    <slot/>
</main>

<style>
  :global(html) { 
    font-family: 'Roboto', sans-serif;
    background-color: #1f1f1f;
    padding: none;
    margin: none;
  }
  :global(body) {
    background-color: #5c5c5c;
    max-width: 800px;
    width: 90vw;
    margin: auto;
    min-height: 100vh;
    padding: 0 20px;
  }
</style>