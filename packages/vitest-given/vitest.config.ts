import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    environment: 'node',
    restoreMocks: true,
    include: ['packages/vitest-given/**/*.spec.ts'],
    coverage: {
      provider: 'v8' as const,
      reporter: ['default'],
    },
  },
});
