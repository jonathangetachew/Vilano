import ClipboardJS from 'clipboard';
import App from './App.svelte';

new ClipboardJS('.clipboard');

const app = new App({
  target: document.body,
  props: {
    name: 'Viola',
    passwords: [],
  },
});

export default app;
