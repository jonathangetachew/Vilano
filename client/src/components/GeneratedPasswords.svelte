<script>
  import { fade } from 'svelte/transition';

  import PasswordForm from './PasswordForm.svelte';
  import GeneratedPassword from './GeneratedPassword.svelte';

  export let passwords = [];
  export let customPassword;
  export let showCustomPasswordOutput;
</script>

<div class="generated">
  {#await passwords}
    <img
      src="assets/loading.svg"
      class="loader"
      alt="Loading passwords..."
      in:fade
    />
  {:then pwds}
    <div class="generated-list">
      {#each pwds as pwd, i}
        <GeneratedPassword {pwd} colorIndex={i} />
      {/each}
    </div>
    {#if pwds.length > 0}
      <div class="customGenerator">
        <PasswordForm on:password custom={true} />
        {#if showCustomPasswordOutput}
          {#await customPassword}
            <img
              src="assets/loading.svg"
              class="loader"
              alt="Loading password..."
              in:fade
            />
          {:then pwd}
            <GeneratedPassword pwd={pwd[0]} />
          {:catch error}
            <p>{error.message}</p>
          {/await}
        {/if}
      </div>
    {/if}
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<style lang="scss">
  .generated {
    display: grid;
    width: 100%;
    grid-template-rows: auto 1fr auto;

    .generated-list {
      display: grid;
      grid-gap: 2em;
      margin-bottom: 3em;
      grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
    }

    .loader {
      background-color: var(--theme-primaryColor);
      margin: 1.5em auto;
    }
  }

  .customGenerator {
    margin-bottom: 2em;
  }

  @media (min-width: 640px) {
    .generated {
      margin: inherit;
      margin-bottom: 2em;

      p {
        margin-top: 1.5em;
      }
    }
  }

  @media (max-width: 640px) {
    .generated {
      margin-bottom: 2em;
    }
  }

  @media (max-width: 280px) {
    .generated-list {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
</style>
