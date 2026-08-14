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

  // 阈值必须是有限正数，否则回退默认值，防止后续出现 NaN/Infinity
  const safeThreshold = Number.isFinite(threshold) && threshold > 0 ? threshold : 1000
  // 精度需为 0–100 的整数，否则回退默认值，确保 toFixed 行为可控
  const safePrecision
    = Number.isInteger(precision) && precision >= 0 && precision <= 100 ? precision : 1

  if (distance < safeThreshold)
    return `${prefix}${distance}${meterUnit}`

  // 公里结果固定除以 1000，与阈值解耦，避免 threshold 变化导致换算漂移
  const km = distance / 1000
  return `${prefix}${km.toFixed(safePrecision)}${kilometerUnit}`
}

/**
 * 金额保留指定小数位，规避浮点数累加的精度问题。
 *
 * 直接用 toFixed 会踩 IEEE-754 表示坑（如 `(1.005).toFixed(2) === '1.00'`），
 * 而用固定 `Number.EPSILON` 修正对 `10.075` 这类量级力度不够，且 `Math.round`
 * 对负数向 +∞ 取整会把 `-1.005` 算成 `-1`。这里借鉴 es-toolkit `decimalAdjust`
 * 的整数域思路（把数字拆成 `magnitude e (exponent + precision)` 后在整数域 round），
 * 并先取绝对值再还原符号，保证十进制语义下正负数边界一致。非有限值兜底为 0。
 *
 * @example moneyToFixed(0.1 + 0.2) // 0.3
 * @example moneyToFixed(10.075, 2) // 10.08
 * @example moneyToFixed(-1.005, 2) // -1.01
 */
export function moneyToFixed(money: number, decimal = 2): number {
  // 非有限值兜底为 0，避免金额出现 NaN/Infinity
  if (!Number.isFinite(money))
    return 0

  // 精度需为 0–100 的整数，否则回退默认 2，防止指数爆出 Infinity
  const safeDecimal
    = Number.isInteger(decimal) && decimal >= 0 && decimal <= 100 ? decimal : 2

  return Number(roundToDecimal(money, safeDecimal).toFixed(safeDecimal))
}

/**
 * 十进制对称四舍五入。
 *
 * 用 `magnitude e (exponent + precision)` 把目标小数位移到整数位，
 * 让 `Math.round` 在整数域操作，规避浮点放大后的表示误差；
 * 先对绝对值取整、再还原符号，使 `-1.005` 与 `1.005` 结果对称（均进位）。
 */
function roundToDecimal(value: number, precision: number): number {
  const negative = value < 0
  const abs = Math.abs(value)

  // 拆出尾数与指数：例如 1.005 → ['1.005']、1.5e-7 → ['1.5', -7]
  const [magnitude, exponent = 0] = abs.toString().split('e')
  // 平移到整数域：1.005e2 → 100.5，Math.round 得 101
  const shifted = Math.round(Number(`${magnitude}e${Number(exponent) + precision}`))
  // 拆回尾数与指数，再把指数减回去：101e-2 → 1.01
  const [newMagnitude, newExponent = 0] = shifted.toString().split('e')
  const result = Number(`${newMagnitude}e${Number(newExponent) - precision}`)

  return negative ? -result : result
}
