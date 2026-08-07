import { ID_CARD_REGEX } from './patterns.js'

const ID_CARD_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] as const
const ID_CARD_CHECK_CODES = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] as const

/** 校验身份证中的出生日期是否为真实且不晚于当前日期。 */
function isValidIdCardBirthDate(idCard: string): boolean {
  const isLegacyIdCard = idCard.length === 15
  const year = Number(isLegacyIdCard ? `19${idCard.slice(6, 8)}` : idCard.slice(6, 10))
  const month = Number(isLegacyIdCard ? idCard.slice(8, 10) : idCard.slice(10, 12))
  const day = Number(isLegacyIdCard ? idCard.slice(10, 12) : idCard.slice(12, 14))
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()

  return birthDate.getFullYear() === year
    && birthDate.getMonth() === month - 1
    && birthDate.getDate() === day
    && birthDate <= today
}

/** 校验中国大陆身份证的格式、出生日期以及 18 位号码的校验码。 */
export function isValidIdCard(idCard: string): boolean {
  const normalizedIdCard = idCard.toUpperCase()
  if (!ID_CARD_REGEX.test(normalizedIdCard) || !isValidIdCardBirthDate(normalizedIdCard))
    return false

  // 15 位旧版身份证没有校验码，通过格式和出生日期校验即可。
  if (normalizedIdCard.length === 15)
    return true

  const sum = ID_CARD_WEIGHTS.reduce(
    (total, weight, index) => total + Number(normalizedIdCard[index]) * weight,
    0,
  )

  return ID_CARD_CHECK_CODES[sum % 11] === normalizedIdCard[17]
}
