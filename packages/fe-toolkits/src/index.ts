// 根入口只汇总不依赖 peer 的模块；regex/url 引用的 es-toolkit 是普通依赖，会随包自动安装。
// date 模块依赖 dayjs（peer），只能经 `fe-toolkits/date` 子路径引入——
// 若并入这里，未安装 dayjs 的项目连 maskPhoneNumber 都会解析失败。
export * from './error'
export * from './number'
export * from './regex'
export * from './url'
