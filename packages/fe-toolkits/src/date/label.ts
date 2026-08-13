import dayjs from 'dayjs'
// isToday / isTomorrow 是 dayjs 插件方法，包内自行注册，
// 不依赖宿主项目是否 extend 过。
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'

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

/** 生成日期标签：今天 / 明天 / 周X。 */
export function getDateSideLabel(
  date: string | number | Date,
  options: DateSideLabelOptions = {},
): string {
  const { today = '今天', tomorrow = '明天', weekLabels = weekLabelMap } = options

  const target = dayjs(date)
  if (target.isToday())
    return today
  if (target.isTomorrow())
    return tomorrow

  return weekLabels[target.day()] ?? ''
}
