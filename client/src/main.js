import ClipboardJS from 'clipboard';
import App from './App.svelte';

// eslint-disable-next-line no-new
new ClipboardJS('.clipboard');

const app = new App({
  target: document.body,
  props: {
    name: 'Vilano',
    apiUrl: 'https://vilano-api.vercel.app',
    passwords: Promise.resolve([]),
    errorMessage: 'Unable to fetch Passwords.',
  },
});

export default app;
