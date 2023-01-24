import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  optimizeDeps: {
    // so we can npm link anytime here
    exclude: [ "managed-timeout" ]
  },
});
