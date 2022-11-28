<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  export let custom = false;
  export let password = '';

  let inputType = 'password';
  let showPassword = false;
  let isShowPasswordIcon = false;

  const dispatch = createEventDispatcher();

  function generatePassword() {
    dispatch('password', {
      text: password,
      custom,
    });
  }

  function inputTypeAction(node) {
    if (custom) inputType = 'text';
    node.type = inputType;
  }

  function toggleInputType() {
    showPassword = !showPassword;
    isShowPasswordIcon = !isShowPasswordIcon;
    document.querySelector('#mainPasswordField').type = showPassword
      ? 'text'
      : 'password';
  }
</script>

<div class="generate-box">
  <form class="generate" on:submit|preventDefault={generatePassword}>
    <input
      use:inputTypeAction
      id={custom ? '' : 'mainPasswordField'}
      placeholder={custom ? 'Enter Custom Service' : 'Enter Main Password'}
      bind:value={password}
      autocomplete="off"
      required
    />
    {#if !custom}
      {#if !isShowPasswordIcon}
        <img
          src="assets/show.png"
          class={showPassword ? 'hidden' : 'inputToggle'}
          on:click={toggleInputType}
          on:keypress={toggleInputType}
          in:fade={{ duration: 200, delay: 100 }}
          alt="Show Password"
        />
      {:else}
        <img
          src="assets/hide.png"
          class={showPassword ? 'inputToggle' : 'hidden'}
          on:click={toggleInputType}
          on:keypress={toggleInputType}
          in:fade={{ duration: 200, delay: 100 }}
          alt="Hide Password"
        />
      {/if}
    {/if}
    <button type="submit">
      <span>Generate</span>
    </button>
  </form>
</div>

<style lang="scss">
  .generate-box {
    background: var(--theme-background);
    padding: 2em 0;
    text-align: center;
    width: 100%;

    .inputToggle {
      cursor: pointer;
      width: 30px;
      height: 30px;
      margin-bottom: -8px;
      margin-left: -50px;
    }

    .hidden {
      display: none;
    }

    .generate {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      align-items: center;

      input {
        width: 80%;
        background: transparent;
        border: 0;
        border-bottom: 2px solid var(--theme-secondaryColor);
        padding: 1em 0 0.8em;
        text-align: center;
        font-size: 18px;
        font-family: inherit;
        font-weight: 300;
        line-height: 1.5;
        color: var(--theme-secondaryColor);
        outline: none;
        &::placeholder {
          color: hsla(var(--theme-secondaryColor), 0%, 100%, 0.5);
          overflow: visible;
        }
      }

      button {
        all: unset;
        margin-top: 2.4em;
        background: transparent;
        border: 2px solid var(--theme-primaryColor);
        padding: 1em 4em;
        border-radius: 50px;
        cursor: pointer;
        display: inline-block;
        font-weight: 600;
        position: relative;
        transition: all 300ms ease;

        span {
          display: inline-block;
          color: var(--theme-primaryColor);
          transition: all 300ms ease;
        }

        &:before,
        &:after {
          content: '';
          display: block;
          position: absolute;
          transition: all 300ms ease;
          opacity: 0;
        }

        &:before {
          height: 7px;
          width: 7px;
          color: var(--theme-primaryColor);
          background: transparent;
          border-right: 2px solid;
          border-top: 2px solid;
          right: 25px;
          top: 20px;
          transform: rotate(45deg);
        }

        &:after {
          background: var(--theme-primaryColor);
          height: 2px;
          width: 50px;
          left: 0;
          top: 1.49em;
        }

        &:hover {
          span {
            transform: translateX(-10px);
          }

          &:before {
            opacity: 1;
          }

          &:after {
            width: 14px;
            opacity: 1;
            transform: translateX(160px);
          }
        }
      }
    }
  }

  @media (max-width: 280px) {
    input {
      &::placeholder {
        font-size: 14px;
      }
    }
  }
</style>
