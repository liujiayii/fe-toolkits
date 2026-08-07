/** 中国大陆手机号：以 1 开头的 11 位号码。 */
export const PHONE_NUMBER_REGEX = /^1[3-9]\d{9}$/

/** 中国大陆身份证号格式：支持 15 位或末位可为 X 的 18 位号码。 */
export const ID_CARD_REGEX = /^[1-9]\d{5}(?:\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}|(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX])$/i

/** 6 到 15 位、同时包含字母和数字的密码。 */
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])[a-z\d]{6,15}$/i

/** 18 位统一社会信用代码，不包含 I、O、S、V、Z。 */
export const UNIFIED_SOCIAL_CREDIT_CODE_REGEX = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
