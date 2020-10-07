<script>
  import { onMount } from 'svelte';

  export let name;
  export let apiUrl;
  export let errorMessage;
  export let passwords;

  let masterPassword = '';
  let customService = '';
  let customPassword = {};
  let showCustomPasswordOutput = false;

  onMount(async () => {
    const res = await fetch(apiUrl);
    console.log(`Backend working? ${res.ok}`);
  });

  async function getCustomPassword() {
    const res = await fetch(
      `${apiUrl}/pass/custom?master=${masterPassword}&service=${customService}`
    );

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(errorMessage);
    }
  }

  async function getPasswords() {
    const res = await fetch(`${apiUrl}/pass?master=${masterPassword}`);

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(errorMessage);
    }
  }

  function handleApiEvent(e) {
    e.preventDefault();
    if (masterPassword) {
      passwords = getPasswords();
    }
  }

  function handleCustomPasswordApiEvent(e) {
    e.preventDefault();
    if (customService) {
      customPassword = getCustomPassword();
      showCustomPasswordOutput = true;
    }
  }
</script>

<style>
  :root {
    --primary-color: #ff785a;
    --secondary-color: #9bc53d;
    --text-color: white;
  }
  main {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: var(--primary-color);
    text-transform: uppercase;
    font-size: 4em;
  }

  p {
    margin-top: -3em;
  }

  input[type='text'] {
    outline-offset: 0px !important;
    outline: none !important;
  }

  #masterPasswordField,
  #customPasswordField {
    width: 40%;
    border-color: var(--primary-color);
  }

  #masterPasswordField:focus,
  #customPasswordField:focus {
    border-color: var(--secondary-color) !important;
  }

  #generateButton,
  #generateCustomPasswordButton {
    cursor: pointer;
    border-color: var(--primary-color);
  }

  #generateButton:hover,
  #generateCustomPasswordButton:hover {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
    color: var(--text-color);
  }

  .masterPasswordForm,
  .customPasswordForm {
    max-width: 800px;
    margin: inherit;
    margin-top: 2em;
  }

  .generatedPassword {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(3, minmax(50px, 1fr));
    margin-top: 1em;
  }

  .generatedPassword span {
    text-align: right;
    align-items: flex-end;
    padding-top: 0.6em;
  }

  .clipboard {
    max-width: 48px;
    cursor: pointer;
  }

  .clipboard:hover {
    color: var(--secondary-color);
  }

  .clipboard img {
    max-width: 18px;
    margin-top: 0.3em;
  }

  .loader {
    background-color: var(--primary-color);
    margin-top: 1.5em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .generated {
      max-width: 800px;
      margin: inherit;
    }

    .generated p {
      margin-top: 1.5em;
    }
  }

  @media (max-width: 640px) {
    main {
      max-width: none;
    }

    h1 {
      font-size: 2.5em;
    }

    p {
      margin-top: -2em;
    }

    #generateButton {
      width: 80%;
    }

    #masterPasswordField {
      width: 80%;
    }

    .generated {
      margin-top: 2em;
    }
  }
</style>

<main>
  <h1>Welcome to {name}!</h1>
  <p>Generate your passwords.</p>
  <div class="masterPasswordForm">
    <form method="GET" on:submit|preventDefault={handleApiEvent}>
      <input
        type="text"
        placeholder="Master Password"
        id="masterPasswordField"
        bind:value={masterPassword} />
      <button id="generateButton">Generate</button>
    </form>
  </div>
  <div class="generated">
    {#await passwords}
      <img src="assets/loading.svg" class="loader" alt="Loading passwords..." />
    {:then pwds}
      {#each pwds as pwd, i}
        <div class="generatedPassword">
          <span>{pwd.service}</span>
          <input type="text" id="pwd{i}" value={pwd.password} readonly />
          <button
            class="clipboard"
            data-clipboard-target="#pwd{i}"
            title="Copy to Clipboard">
            <img src="assets/copy.svg" alt="Copy to clipboard" />
          </button>
        </div>
      {/each}
      {#if pwds.length > 0}
        <div class="customPasswordForm">
          <form
            method="GET"
            on:submit|preventDefault={handleCustomPasswordApiEvent}>
            <input
              type="text"
              placeholder="Custom Service"
              id="customPasswordField"
              bind:value={customService} />
            <button id="generateCustomPasswordButton">Generate</button>
          </form>
        </div>
        {#if showCustomPasswordOutput}
          {#await customPassword}
            <img
              src="assets/loading.svg"
              class="loader"
              alt="Loading password..." />
          {:then pwd}
            <div class="generatedPassword">
              <span>{pwd[0].service}</span>
              <input
                type="text"
                id="pwd{pwd[0].service}"
                value={pwd[0].password}
                readonly />
              <button
                class="clipboard"
                data-clipboard-target="#pwd{pwd[0].service}"
                title="Copy to Clipboard">
                <img src="assets/copy.svg" alt="Copy to clipboard" />
              </button>
            </div>
          {:catch error}
            <p>{error.message}</p>
          {/await}
        {/if}
      {/if}
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
</main>
