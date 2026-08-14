# fe-toolkits

## 0.2.0

### Minor Changes

- 081e978: 新增 `date`、`url`、`number`、`error` 四个工具模块

  - `date`：日期与日历标签（`getDateSideLabel`、`weekLabelMap`），依赖可选 peer `dayjs`，仅经子路径 `fe-toolkits/date` 导出
  - `url`：URL 安全解码 `safeDecode`
  - `number`：金额精度修正 `moneyToFixed`、距离格式化 `formatDistance`
  - `error`：错误信息归一化 `normalizeErrorInfo`

  `regex` / `url` / `number` / `error` 由根入口 `fe-toolkits` 统一汇总导出；`date` 因依赖 `dayjs` 仅走子路径，避免污染零依赖入口。同步更新 Vite 多入口构建、文档与导航。
