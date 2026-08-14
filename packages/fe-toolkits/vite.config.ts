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
        date: resolve(projectRoot, 'src/date/index.ts'),
        error: resolve(projectRoot, 'src/error/index.ts'),
        number: resolve(projectRoot, 'src/number/index.ts'),
        regex: resolve(projectRoot, 'src/regex/index.ts'),
        url: resolve(projectRoot, 'src/url/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      // dayjs 是 date 子路径的 peer 依赖，不要打进产物
      external: ['dayjs', /^dayjs\//],
      output: {
        exports: 'named',
      },
    },
  },
})
