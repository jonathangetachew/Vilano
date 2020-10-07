import ClipboardJS from 'clipboard';
import App from './App.svelte';

new ClipboardJS('.clipboard');

const app = new App({
  target: document.body,
  props: {
    name: 'Viola',
    apiUrl: __vilano.env.URL,
    passwords: Promise.resolve([]),
    errorMessage: 'Unable to fetch Passwords.',
  },
});

export default app;
