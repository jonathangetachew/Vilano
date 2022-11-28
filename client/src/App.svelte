<script>
  import ThemeProvider from './utils/ThemeProvider.svelte';
  import Home from './pages/Home.svelte';
  import Header from './components/Header.svelte';

  export let name;
  export let apiUrl;
  export let errorMessage;
  export let passwords;
</script>

<ThemeProvider>
  <Header {name} />
  <Home {apiUrl} {passwords} {errorMessage} />
</ThemeProvider>

<style>
  :global(html) {
    background-color: var(--theme-background);
    color: var(--theme-textColor);
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
