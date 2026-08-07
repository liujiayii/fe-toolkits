import { env } from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const toolkitSource = fileURLToPath(new URL('../../../packages/fe-toolkits/src', import.meta.url))
const docsBase = env.DOCS_BASE ?? '/'

export default defineConfig({
  base: docsBase,
  title: 'fe-toolkits',
  description: 'TypeScript 正则表达式与数据脱敏工具库',
  lang: 'zh-CN',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '概览', link: '/' },
          { text: '快速开始', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: '模块索引', link: '/api/' },
          { text: '正则与脱敏', link: '/api/regex' },
        ],
      },
    ],
    socialLinks: [],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本页内容' },
  },
  vite: {
    resolve: {
      alias: [
        { find: /^fe-toolkits\/(.+)$/, replacement: `${toolkitSource}/$1/index.ts` },
        { find: /^fe-toolkits$/, replacement: `${toolkitSource}/index.ts` },
      ],
    },
  },
})
