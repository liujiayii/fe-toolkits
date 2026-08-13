# 日期与日历

`fe-toolkits/date` 目前提供日期标签生成。

::: tip 依赖说明
本模块依赖 `dayjs`，它被声明为**可选 peer 依赖**，需要自行安装：

```bash
pnpm add dayjs
```

所需的 `isToday`、`isTomorrow` 插件**由包内自行注册**，不依赖宿主项目是否 `extend` 过。
:::

## getDateSideLabel

生成日期标签：今天 / 明天 / 周X。

```ts
import { getDateSideLabel, weekLabelMap } from 'fe-toolkits/date'

getDateSideLabel('2026-03-10') // '今天'（假设今天是 2026-03-10）
getDateSideLabel('2026-03-11') // '明天'
getDateSideLabel('2026-03-12') // '周四'

weekLabelMap // ['周日', '周一', ..., '周六']，索引与 Date#getDay 一致
```

可定制文案，便于多语言：

```ts
getDateSideLabel(date, {
  today: 'Today',
  tomorrow: 'Tomorrow',
  weekLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
})
```

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `today` | `string` | `'今天'` | 命中今天时的文案 |
| `tomorrow` | `string` | `'明天'` | 命中明天时的文案 |
| `weekLabels` | `readonly string[]` | `weekLabelMap` | 星期文案表，索引 0 为周日 |
