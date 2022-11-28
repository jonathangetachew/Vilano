<script>
  export let pwd;
  export let colorIndex = 1;

  const colors = [
    'cyan',
    'red',
    'blue',
    'orange',
    'cyan',
    'red',
    'blue',
    'orange',
    'cyan',
    'red',
    'blue',
    'orange',
  ];
</script>

<div class={'box ' + colors[colorIndex]}>
  <h2>{pwd.service}</h2>
  <p id="pwd{pwd.service}">{pwd.password}</p>
  <span
    class="clipboard"
    data-clipboard-target="#pwd{pwd.service}"
    title="Copy to clipbaord"
  >
    <img src="assets/copy.svg" alt="Copy to" />
  </span>
</div>

<style lang="scss">
  .box {
    border-radius: 5px;
    box-shadow: 0px 20px 30px -20px hsl(240, 6%, 7%);
    padding: 20px;
    margin: 0 auto;
    width: 260px;

    h2 {
      color: var(--theme-textColor);
      font-weight: 700;
    }

    p {
      display: inline-block;
      color: var(--theme-textColor);
    }
  }

  .clipboard {
    cursor: pointer;
    display: inline-block;
    margin-left: 10px;
    width: 30px;
    margin-top: 5px;
    padding: 6px 7px 2px;
    font-weight: 300;
    border: 1px solid hsl(229, 6%, 80%);
    border-radius: 5px;

    &:hover {
      background-color: var(--theme-backgroundHover);
      transition: all 400ms ease-in;
    }

    img {
      max-width: 18px;
      margin-bottom: -2px;
    }
  }

  .cyan {
    border-top: 3px solid hsl(180, 62%, 55%);
  }

  .red {
    border-top: 3px solid hsl(0, 78%, 62%);
  }

  .blue {
    border-top: 3px solid hsl(212, 86%, 64%);
  }

  .orange {
    border-top: 3px solid hsl(34, 97%, 64%);
  }

  @media (max-width: 280px) {
    .box {
      width: 200px;
      padding: 10px;
    }
  }
</style>
