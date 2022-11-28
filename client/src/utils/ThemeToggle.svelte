<script>
  import { getContext } from 'svelte';
  const { toggle } = getContext('theme');
</script>

<span>
  <input
    class="tgl tgl-skewed"
    id="themeToggle"
    type="checkbox"
    on:click={toggle}
  />
  <label class="tgl-btn" data-tg-off="🌙" data-tg-on="☀️" for="themeToggle" />
</span>

<style lang="scss">
  .tgl {
    display: none;

    &,
    &:after,
    &:before,
    & + .tgl-btn {
      box-sizing: border-box;
      &::selection {
        background: none;
      }
    }

    + .tgl-btn {
      display: inline-block;
      outline: 0;
      width: 3em;
      height: 2em;
      cursor: pointer;
      user-select: none;

      &:after,
      &:before {
        position: relative;
        display: block;
        content: '';
        width: 50%;
        height: 100%;
      }

      &:after {
        left: 0;
      }

      &:before {
        display: none;
      }
    }

    &:checked + .tgl-btn:after {
      left: 50%;
    }
  }
  .tgl-skewed {
    + .tgl-btn {
      overflow: hidden;
      transform: skew(-10deg);
      backface-visibility: hidden;
      transition: all 0.2s ease;
      background: var(--theme-inverseBackground);
      &:after,
      &:before {
        transform: skew(10deg);
        display: inline-block;
        transition: all 0.2s ease;
        width: 100%;
        text-align: center;
        position: absolute;
        line-height: 2em;
        font-weight: bold;
        color: var(--theme-textColor);
        text-shadow: 0 1px 0 var(--theme-inverseBackground);
      }

      &:after {
        left: 100%;
        content: attr(data-tg-on);
      }

      &:before {
        left: 0;
        content: attr(data-tg-off);
      }

      &:active {
        background: var(--theme-inverseBackground);
        &:before {
          left: -10%;
        }
      }
    }

    &:checked + .tgl-btn {
      background: var(--theme-inverseBackground);
      &:before {
        left: -100%;
      }

      &:after {
        left: 0;
      }

      &:active:after {
        left: 10%;
      }
    }
  }
</style>
