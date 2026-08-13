/** 距离格式化配置。 */
export interface FormatDistanceOptions {
  /** 文案前缀，默认空字符串。 */
  prefix?: string
  /** 米的单位文案，默认 '米'。 */
  meterUnit?: string
  /** 公里的单位文案，默认 '公里'。 */
  kilometerUnit?: string
  /** 切换到公里的阈值（米），默认 1000。 */
  threshold?: number
  /** 公里保留的小数位，默认 1。 */
  precision?: number
}

/**
 * 将以米为单位的距离格式化为可读文案。
 * @example formatDistance(500) // '500米'
 * @example formatDistance(1500, { prefix: '距您直线' }) // '距您直线1.5公里'
 */
export function formatDistance(distance: number, options: FormatDistanceOptions = {}): string {
  const {
    prefix = '',
    meterUnit = '米',
    kilometerUnit = '公里',
    threshold = 1000,
    precision = 1,
  } = options

  // 负数与非有限值属于上游异常，统一返回空串避免脏数据直接展示给用户
  if (!Number.isFinite(distance) || distance < 0)
    return ''

  if (distance < threshold)
    return `${prefix}${distance}${meterUnit}`

  return `${prefix}${(distance / threshold).toFixed(precision)}${kilometerUnit}`
}

/**
 * 金额保留指定小数位，规避浮点数累加的精度问题。
 *
 * 直接用 toFixed 会踩 IEEE-754 表示坑（如 (1.005).toFixed(2) === '1.00'），
 * 这里先放大到整数域再四舍五入，结果更贴合「金额」语义。
 * 非有限值（NaN/Infinity）统一兜底为 0。
 */
export function moneyToFixed(money: number, decimal = 2): number {
  // 非有限值兜底为 0，避免金额出现 NaN/Infinity
  if (!Number.isFinite(money))
    return 0

  const factor = 10 ** decimal
  // 先放大到整数域，借助 Number.EPSILON 修正浮点误差后再四舍五入
  const rounded = Math.round((money + Number.EPSILON) * factor) / factor
  return Number(rounded.toFixed(decimal))
}
