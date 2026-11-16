import dayjs from 'dayjs'
// isToday / isTomorrow 是 dayjs 插件方法，包内自行注册，
// 不依赖宿主项目是否 extend 过。
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import { isNil } from 'es-toolkit'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

/** 默认星期文案，索引与 Date#getDay 一致，0 为周日。 */
export const weekLabelMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/** 日期标签配置。 */
export interface DateSideLabelOptions {
  /** 今天的文案，默认 '今天'。 */
  today?: string
  /** 明天的文案，默认 '明天'。 */
  tomorrow?: string
  /** 星期文案表，索引 0 为周日。 */
  weekLabels?: readonly string[]
}

/** 生成日期标签：今天 / 明天 / 周X，日期缺省或无法解析时返回空串。 */
export function getDateSideLabel(
  date: string | number | Date,
  options: DateSideLabelOptions = {},
): string {
  const { today = '今天', tomorrow = '明天', weekLabels = weekLabelMap } = options

  // dayjs(undefined) 会回退为当前时间，导致缺数时被误判为“今天”，需显式拦截；
  // 这里只判空不强转——Date/number 是合法入参，toString 会破坏 dayjs 解析
  if (isNil(date))
    return ''

  const target = dayjs(date)
  if (target.isToday())
    return today
  if (target.isTomorrow())
    return tomorrow

  return weekLabels[target.day()] ?? ''
}
