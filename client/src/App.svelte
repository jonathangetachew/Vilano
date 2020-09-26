<script>
  import { onMount } from 'svelte';

  export let name;
  export let passwords;

  let masterPassword;

  onMount(async () => {
    const res = await fetch('http://localhost:3000');
    console.log(await res.json());
  });

  async function getPasswords() {
    const res = await fetch(
      `http://localhost:3000/pass?master=${masterPassword}`
    );

    const pwds = await res.json();

    if (res.ok) {
      console.log(pwds);
      return pwds;
    } else {
      throw new Error(text);
    }
  }

  function handleApiEvent(e) {
    e.preventDefault();
    if (masterPassword) passwords = getPasswords();
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

  #masterPasswordField {
    width: 40%;
    border-color: var(--primary-color);
  }

  #masterPasswordField:focus {
    border-color: var(--secondary-color) !important;
  }

  #generateButton {
    cursor: pointer;
    border-color: var(--primary-color);
  }

  #generateButton:hover {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
    color: var(--text-color);
  }

  .masterPasswordForm {
    margin-top: 2em;
    max-width: 800px;
    margin: inherit;
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .generated {
      max-width: 800px;
      margin: inherit;
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
  }
</style>

<main>
  <h1>Welcome to {name}!</h1>
  <p>Generate your passwords.</p>
  <form
    class="masterPasswordForm"
    method="GET"
    on:submit|preventDefault={handleApiEvent}>
    <input
      type="text"
      placeholder="Master Password"
      id="masterPasswordField"
      bind:value={masterPassword} />
    <button id="generateButton">Generate</button>
  </form>
  <div class="generated">
    {#await passwords}
      <img src="assets/loading.svg" alt="Loading passwords..." />
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
      {#if passwords.length > 0}
        <div class="customPassword">Custom</div>
      {/if}
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
</main>
