# 快速开始

## 安装

```bash
pnpm add fe-toolkits
```

## 从正则子路径导入

推荐从 `regex` 子路径导入，让依赖关系更清晰：

```ts
import { ID_CARD_REGEX, maskIdCard } from 'fe-toolkits/regex'

ID_CARD_REGEX.test('11010519491231002X')
maskIdCard('11010519491231002X') // '110****002X'
```

也可以从根入口导入稳定 API：

```ts
import { maskPhoneNumber, PHONE_NUMBER_REGEX } from 'fe-toolkits'

PHONE_NUMBER_REGEX.test('13812345678')
maskPhoneNumber('13812345678')
```

## 环境要求

- 现代浏览器或 Node.js
- 支持 ESM 的构建工具
- TypeScript 5 或兼容的类型检查器（可选）
