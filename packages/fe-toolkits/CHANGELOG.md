# fe-toolkits

## 0.2.1

### Patch Changes

- bd12214: 修复工具函数传入空值抛错：`maskPhoneNumber` / `maskIdCard` / `maskEmail` / `safeDecode` / `isValidIdCard` 的输入统一经 es-toolkit 的 `toString` 归一化，`null` / `undefined` 返回空串或判定无效，数字等其他类型先转为字符串再处理；`getDateSideLabel` 用 `isNil` 显式拦截空日期，避免 `dayjs(undefined)` 被误判为“今天”。新增 `es-toolkit` 运行时依赖。

## 0.2.0

### Minor Changes

- 081e978: 新增 `date`、`url`、`number`、`error` 四个工具模块

  - `date`：日期与日历标签（`getDateSideLabel`、`weekLabelMap`），依赖可选 peer `dayjs`，仅经子路径 `fe-toolkits/date` 导出
  - `url`：URL 安全解码 `safeDecode`
  - `number`：金额精度修正 `moneyToFixed`、距离格式化 `formatDistance`
  - `error`：错误信息归一化 `normalizeErrorInfo`

  `regex` / `url` / `number` / `error` 由根入口 `fe-toolkits` 统一汇总导出；`date` 因依赖 `dayjs` 仅走子路径，避免污染零依赖入口。同步更新 Vite 多入口构建、文档与导航。
