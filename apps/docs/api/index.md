# API 模块

| 子路径 | 用途 | 当前 API |
| --- | --- | --- |
| `fe-toolkits/regex` | 正则与数据脱敏 | 正则常量、`isValidIdCard`、`maskPhoneNumber`、`maskIdCard`、`maskEmail` |
| `fe-toolkits/date` | 日期与日历 | `getDateSideLabel`、`weekLabelMap` |
| `fe-toolkits/url` | URL 处理 | `safeDecode` |
| `fe-toolkits/number` | 数字与格式化 | `moneyToFixed`、`formatDistance` |
| `fe-toolkits/error` | 错误归一化 | `normalizeErrorInfo` |

## 根入口只汇总零依赖模块

`regex` / `url` / `number` / `error` 同时由根入口 `fe-toolkits` 导出：

```ts
import { maskPhoneNumber, moneyToFixed, safeDecode } from 'fe-toolkits'

maskPhoneNumber('13812345678') // '138****5678'
moneyToFixed(0.1 + 0.2) // 0.3
safeDecode('%E4%B8%AD%E6%96%87') // '中文'
```

**`date` 模块只能经子路径引入**，因为它依赖 `dayjs`（声明为可选 peer 依赖）：

```ts
import { getDateSideLabel } from 'fe-toolkits/date'

getDateSideLabel('2026-03-10') // '今天'（假设今天是 2026-03-10）
```

若把 `date` 并入根入口，未安装 `dayjs` 的项目连 `maskPhoneNumber` 都会解析失败。

- [正则与脱敏](/api/regex)
- [日期与日历](/api/date)
- [URL 处理](/api/url)
- [数字与格式化](/api/number)
- [错误归一化](/api/error)
