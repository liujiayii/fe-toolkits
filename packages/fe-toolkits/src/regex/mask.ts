import { isValidIdCard } from './validate.js'

/** 手机号脱敏匹配：分别捕获前三位和后四位。 */
const PHONE_NUMBER_MASK_REGEX = /^(\d{3})\d{4}(\d{4})$/

/** 将合法手机号的中间四位替换为星号，其他输入原样返回。 */
export function maskPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(PHONE_NUMBER_MASK_REGEX, '$1****$2')
}

/** 将合法身份证号脱敏，仅保留前三位和后四位。 */
export function maskIdCard(idCard: string): string {
  if (!isValidIdCard(idCard))
    return idCard

  return `${idCard.slice(0, 3)}****${idCard.slice(-4)}`
}

/** 将合法邮箱用户名的中间部分脱敏，并保留完整域名。 */
export function maskEmail(email: string): string {
  const atIndex = email.indexOf('@')
  if (atIndex <= 0 || atIndex !== email.lastIndexOf('@') || atIndex === email.length - 1)
    return email

  const username = email.slice(0, atIndex)
  const domain = email.slice(atIndex + 1)
  const visibleUsername = username.length === 1
    ? username
    : `${username[0]}****${username.at(-1)}`

  return `${visibleUsername}@${domain}`
}
