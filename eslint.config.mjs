import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // 文档中的 Vue 示例和 VitePress 配置都纳入同一套规则。
    vue: true,
    markdown: true,
    typescript: true,
    formatters: false,
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
      '**/node_modules/**',
    ],
  },
  {
    rules: {
      // 工具库要求公开 API 与测试中的参数保持明确，未使用参数允许以下划线标记。
      'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'antfu/top-level-function': 'off',
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
)
