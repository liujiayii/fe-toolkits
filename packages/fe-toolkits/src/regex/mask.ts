import { toString } from 'es-toolkit/compat'

import { isValidIdCard } from './validate.js'

/** 手机号脱敏匹配：分别捕获前三位和后四位。 */
const PHONE_NUMBER_MASK_REGEX = /^(\d{3})\d{4}(\d{4})$/

/** 将合法手机号的中间四位替换为星号，输入先经 toString 归一化，null/undefined 返回空串。 */
export function maskPhoneNumber(phoneNumber: string): string {
  return toString(phoneNumber).replace(PHONE_NUMBER_MASK_REGEX, '$1****$2')
}

/** 将合法身份证号脱敏，仅保留前三位和后四位，null/undefined 返回空串。 */
export function maskIdCard(idCard: string): string {
  // 先归一化为字符串，避免数字输入绕过 isValidIdCard 后在 slice 上抛错
  const input = toString(idCard)
  if (!isValidIdCard(input))
    return input

  return `${input.slice(0, 3)}****${input.slice(-4)}`
}

/** 将合法邮箱用户名的中间部分脱敏并保留完整域名，null/undefined 返回空串。 */
export function maskEmail(email: string): string {
  const input = toString(email)
  const atIndex = input.indexOf('@')
  if (atIndex <= 0 || atIndex !== input.lastIndexOf('@') || atIndex === input.length - 1)
    return input

  const username = input.slice(0, atIndex)
  const domain = input.slice(atIndex + 1)
  const visibleUsername = username.length === 1
    ? username
    : `${username[0]}****${username.at(-1)}`

  return `${visibleUsername}@${domain}`
}
