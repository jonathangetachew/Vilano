<script>
  import ThemeToggle from '../utils/ThemeToggle.svelte';

  export let name;
</script>

<header class="header sticky sticky--top is-active">
  <div class="grid">
    <h1>{name}</h1>
    <span>Generate your passwords</span>
    <div class="theme">
      <ThemeToggle />
    </div>
  </div>
</header>

<style lang="scss">
  .theme {
    position: absolute;
    top: 15px;
    right: 25px;
  }

  .header {
    background-color: var(--theme-background);
    padding-block: 1em;
    width: 100vw;
    z-index: 2;
  }

  .header::after {
    bottom: 0;
    box-shadow: 0 0.0625em 0.5em rgba(0, 0, 0, 0.3);
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  .header.is-active::after {
    opacity: 1;
  }

  .grid {
    inline-size: 90%;
    margin-inline: auto;

    h1 {
      display: inline;
      font-size: 140%;
      font-weight: 600;
      color: var(--theme-primaryColor);
    }

    span {
      margin-top: -5px;
      padding-left: 5px;
      border-left: 2px solid var(--theme-secondaryColor);
      color: var(--theme-secondaryColor);
      font-weight: 300;
    }
  }

  .sticky {
    position: sticky;
    will-change: transform;
  }

  .sticky--top {
    top: 0;
  }

  @media (max-width: 280px) {
    .grid {
      span {
        font-size: xx-small;
      }
    }

    .theme {
      top: 16px;
      right: 15px;
    }
  }
</style>
