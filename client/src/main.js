import ClipboardJS from 'clipboard';
import App from './App.svelte';

new ClipboardJS('.clipboard');

const app = new App({
  target: document.body,
  props: {
    name: 'Vilano',
    apiUrl: __vilano.env.API_URL,
    passwords: Promise.resolve([]),
    errorMessage: 'Unable to fetch Passwords.',
  },
});

export default app;
