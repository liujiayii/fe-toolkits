import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    dts({
      entryRoot: resolve(projectRoot, 'src'),
      include: ['src'],
      exclude: ['tests', 'vite.config.ts', 'vitest.config.ts'],
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(projectRoot, 'src/index.ts'),
        regex: resolve(projectRoot, 'src/regex/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
})
