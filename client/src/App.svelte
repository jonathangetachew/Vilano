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
    console.log(`Backend at (${apiUrl}) working? ${res.ok}`);
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

<main>
  <h1>Welcome to {name}!</h1>
  <p>Generate your passwords.</p>
  <div class="masterPasswordForm">
    <form class="form" method="GET" on:submit|preventDefault={handleApiEvent}>
      <input
        type="text"
        placeholder="Master Password"
        class="form-field"
        bind:value={masterPassword}
        required
      />
      <button class="btn btn-primary btn-inside">Generate</button>
    </form>
  </div>
  <div class="generated">
    {#await passwords}
      <img src="assets/loading.svg" class="loader" alt="Loading passwords..." />
    {:then pwds}
      {#each pwds as pwd, i}
        <div class="generatedPassword">
          <div class="form-group">
            <span>{pwd.service}</span>
            <input
              class="form-text"
              type="text"
              id="pwd{i}"
              value={pwd.password}
              readonly
            />
            <span
              class="clipboard"
              data-clipboard-target="#pwd{i}"
              title="Copy to clipbaord"
            >
              <img src="assets/copy.png" alt="Copy to clipboard" />
            </span>
          </div>
        </div>
      {/each}
      {#if pwds.length > 0}
        <div class="customPasswordForm">
          <form
            class="form"
            method="GET"
            on:submit|preventDefault={handleCustomPasswordApiEvent}
          >
            <input
              type="text"
              placeholder="Custom Service"
              class="form-field customPasswordField"
              bind:value={customService}
              required
            />
            <button class="btn btn-primary btn-inside">Generate</button>
          </form>
        </div>
        {#if showCustomPasswordOutput}
          {#await customPassword}
            <img
              src="assets/loading.svg"
              class="loader"
              alt="Loading password..."
            />
          {:then pwd}
            <div class="generatedPassword">
              <div class="form-group">
                <span>{pwd[0].service}</span>
                <input
                  class="form-text"
                  type="text"
                  id="pwd{pwd[0].service}"
                  value={pwd[0].password}
                  readonly
                />
                <span
                  class="clipboard"
                  data-clipboard-target="#pwd{pwd[0].service}"
                  title="Copy to clipbaord"
                >
                  <img src="assets/copy.png" alt="Copy to clipboard" />
                </span>
              </div>
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

<style lang="scss">
  // Variables
  $primary-color: #ff785a;
  $secondary-color: #9bc53d;
  $text-color: white;
  $input-color: #99a3ba;
  $input-border: #cdd9ed;
  $input-background: #fff;
  $input-placeholder: #cbd1dc;
  $group-color: $input-color;
  $group-border: $input-border;
  $group-background: #eef4ff;

  main {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: $primary-color;
    text-transform: uppercase;
    font-size: 4em;
  }

  p {
    margin-top: -3em;
    color: $input-color;
  }

  .form {
    &-field {
      width: 50%;
      color: darken($input-color, 10%);
      background: $text-color;
      font: inherit;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
      border: 0;
      outline: 0;
      padding: 22px 18px;

      &::placeholder {
        color: $input-placeholder;
      }
    }
  }

  .btn {
    display: inline-block;
    background: transparent;
    color: inherit;
    font: inherit;
    border: 0;
    outline: 0;
    padding: 0;
    transition: all 200ms ease-in;
    cursor: pointer;

    &-primary {
      background: $secondary-color;
      color: $text-color;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      padding: 12px 36px;

      &:hover {
        background: darken($secondary-color, 4%);
      }

      &:active {
        background: $secondary-color;
        box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
      }
    }

    &-inside {
      margin-left: -90px;
    }
  }

  .form-text {
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: $input-color;
    border: 1px solid $input-border;
    background: $input-background;
    transition: border 0.3s ease;
    &:focus {
      outline: none;
      border-color: $secondary-color;
    }
  }

  .form-group {
    position: relative;
    display: flex;
    width: 100%;
    & > span,
    .form-text {
      white-space: nowrap;
      display: block;
      &:not(:first-child):not(:last-child) {
        border-radius: 0;
      }
      &:first-child {
        border-radius: 6px 0 0 6px;
      }
      &:last-child {
        border-radius: 0 6px 6px 0;
      }
      &:not(:first-child) {
        margin-left: -1px;
      }
    }
    .form-text {
      position: relative;
      z-index: 1;
      flex: 1 1 auto;
      width: 1%;
      margin-top: 0;
      margin-bottom: 0;
    }
    & > span {
      text-align: center;
      text-transform: lowercase;
      padding: 8px 12px;
      font-size: 14px;
      line-height: 25px;
      color: $group-color;
      background: $group-background;
      border: 1px solid $group-border;
      transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
    }
    &:focus-within {
      & > span {
        border-color: $secondary-color;
      }
    }
  }

  .masterPasswordForm,
  .customPasswordForm {
    max-width: 800px;
    margin: inherit;
    margin-top: 2em;
  }

  .customPasswordField {
    width: 340px;
  }

  .generatedPassword {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(1, minmax(50px, 1fr));
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
    padding-top: 0.6em !important;

    img {
      max-width: 24px;
      margin-bottom: -0.5em !important;
    }
  }

  .loader {
    background-color: $primary-color;
    margin-top: 1.5em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .generated {
      max-width: 400px;
      margin: inherit;

      p {
        margin-top: 1.5em;
      }
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

    .btn {
      width: 80%;
      margin: inherit;
    }

    .form-field {
      width: 80%;
      margin-bottom: 1em;
    }

    .generated {
      margin-top: 2em;
    }
    .customPasswordField {
      width: 80%;
    }
  }
</style>
