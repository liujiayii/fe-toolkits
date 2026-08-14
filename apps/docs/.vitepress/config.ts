import { env } from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const toolkitSource = fileURLToPath(new URL('../../../packages/fe-toolkits/src', import.meta.url))
const docsBase = env.DOCS_BASE ?? '/'

export default defineConfig({
  base: docsBase,
  title: 'fe-toolkits',
  description: 'TypeScript 前端通用工具箱：正则校验与脱敏、日期、URL、数字、错误归一化',
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
          { text: '日期与日历', link: '/api/date' },
          { text: 'URL 处理', link: '/api/url' },
          { text: '数字与格式化', link: '/api/number' },
          { text: '错误归一化', link: '/api/error' },
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
