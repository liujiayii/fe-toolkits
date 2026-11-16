---
'fe-toolkits': patch
---

修复工具函数传入空值抛错：`maskPhoneNumber` / `maskIdCard` / `maskEmail` / `safeDecode` / `isValidIdCard` 的输入统一经 es-toolkit 的 `toString` 归一化，`null` / `undefined` 返回空串或判定无效，数字等其他类型先转为字符串再处理；`getDateSideLabel` 用 `isNil` 显式拦截空日期，避免 `dayjs(undefined)` 被误判为“今天”。新增 `es-toolkit` 运行时依赖。
