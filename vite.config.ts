/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/common/styles'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    coverage: {
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
      exclude: [
        'src/main.tsx',
        'src/components/atoms/index.ts',
        'src/components/molecules/index.ts',
        'src/test',
        'src/vite-env.d.ts',
        '*.cjs',
        '.dev_tools',
      ],
    },
    exclude: ['node_modules', '.dev_tools', 'src/test'],
  },
});
