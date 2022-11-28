<script>
  import { onMount } from 'svelte';

  import superFly from '../superFly';
  import PasswordForm from '../components/PasswordForm.svelte';
  import GeneratedPasswords from '../components/GeneratedPasswords.svelte';

  export let apiUrl;
  export let errorMessage;
  export let passwords;

  let viewWidth = 0;
  let viewHeight = 0;
  let mainPassword = '';
  let customService = '';
  let customPassword = {};
  let showCustomPasswordOutput = false;
  let passwordGenerationInitiated = false;

  onMount(async () => {
    const res = await fetch(apiUrl);
    console.log(`Backend at (${apiUrl}) working? ${res.ok}`);
  });

  async function getCustomPassword() {
    const res = await fetch(
      `${apiUrl}/pass/custom?main=${mainPassword}&service=${customService}`
    );

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(errorMessage);
    }
  }

  async function getPasswords() {
    const res = await fetch(`${apiUrl}/pass?main=${mainPassword}`);

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(errorMessage);
    }
  }

  function handleMainPasswordApiEvent(e) {
    if (e.detail.text) {
      passwordGenerationInitiated = true;
      showCustomPasswordOutput = false;
      mainPassword = e.detail.text;
      passwords = getPasswords();
    }
  }

  function handleCustomPasswordApiEvent(e) {
    if (e.detail.text) {
      customService = e.detail.text;
      customPassword = getCustomPassword();
      showCustomPasswordOutput = true;
    }
  }

  function handlePasswordFormEvent(e) {
    if (e.detail.custom) handleCustomPasswordApiEvent(e);
    else handleMainPasswordApiEvent(e);
  }
</script>

<div
  class="container"
  bind:clientWidth={viewWidth}
  bind:clientHeight={viewHeight}
>
  {#if passwordGenerationInitiated}
    <div
      class={viewWidth > 1200 ? 'intro' : ''}
      in:superFly={{
        x: viewWidth > 640 ? viewWidth / 4 : 0,
        y: viewWidth < 640 ? viewHeight / 4 : 0,
        duration: 1500,
      }}
      out:superFly={{ delay: 400, duration: 0, none: true }}
    >
      <PasswordForm
        on:password={handlePasswordFormEvent}
        password={mainPassword}
      />
    </div>
    <div
      class="generated-passwords"
      in:superFly={{ y: viewHeight / 4, duration: 1500 }}
      out:superFly={{ delay: 400, duration: 0, none: true }}
    >
      <GeneratedPasswords
        on:password={handlePasswordFormEvent}
        {passwords}
        {customPassword}
        {showCustomPasswordOutput}
      />
    </div>
  {/if}
  <div class={passwordGenerationInitiated ? 'hidden' : 'intro'}>
    <PasswordForm on:password={handlePasswordFormEvent} />
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    text-align: center;
    width: 100vw;
    height: 90vh;
    margin: 1.5em auto;

    div {
      margin: 0 auto;
    }

    .intro {
      width: 50vw;
      margin: 30vh auto;
    }

    .generated-passwords {
      width: 100%;
      margin: 1em auto;
    }

    .hidden {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    .container {
      max-width: none;

      .intro {
        width: 100vw;
      }
    }
  }

  @media (max-width: 640px) {
    .container {
      max-width: none;

      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

      .intro {
        width: 100vw;
      }
    }
  }

  @media (max-width: 280px) {
    .container {
      max-width: none;

      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

      .intro {
        width: 100vw;
      }
    }
  }
</style>
