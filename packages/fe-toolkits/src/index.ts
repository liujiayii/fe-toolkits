// 根入口只汇总零依赖模块，保持 `import from 'fe-toolkits'` 不需要任何 peer 依赖。
// date 模块依赖 dayjs（peer），只能经 `fe-toolkits/date` 子路径引入——
// 若并入这里，未安装 dayjs 的项目连 maskPhoneNumber 都会解析失败。
export * from './error'
export * from './number'
export * from './regex'
export * from './url'
