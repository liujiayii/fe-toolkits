# fe-toolkits

轻量的 TypeScript 正则表达式与数据脱敏工具库。

## 开发

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 使用

```ts
import { maskPhoneNumber, PHONE_NUMBER_REGEX } from 'fe-toolkits/regex'

PHONE_NUMBER_REGEX.test('13812345678')
maskPhoneNumber('13812345678') // '138****5678'
```

API 文档位于 `apps/docs`，版本发布使用 Changesets 管理。

## 发布

GitHub Actions 会在 `main` 分支更新时运行发布流程，也支持从 Actions 页面手动触发。发布前会自动执行 lint、类型检查和测试。

1. 执行 `pnpm changeset` 创建变更记录并提交。
2. 推送到 `main`，workflow 会创建或更新版本发布 PR。
3. 合并发布 PR 后，workflow 会构建并发布 `fe-toolkits` 到 npm。

请在仓库的 GitHub Secrets 中配置 `NPM_TOKEN`，令牌需要拥有该 npm 包的发布权限。

## 文档部署

执行 `pnpm build:docs` 可单独构建 VitePress 文档，执行 `pnpm preview:docs` 可在本地预览构建结果。

推送文档或工具源码到 `main` 后，GitHub Actions 会自动将文档部署到 GitHub Pages。首次使用时，请在仓库 Settings → Pages 中将 Source 设置为 **GitHub Actions**。
