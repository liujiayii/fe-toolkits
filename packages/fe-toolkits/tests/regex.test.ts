import { describe, expect, it } from 'vitest'
import {
  ID_CARD_REGEX,
  isValidIdCard,
  maskEmail,
  maskIdCard,
  maskPhoneNumber,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  UNIFIED_SOCIAL_CREDIT_CODE_REGEX,
} from '../src/index.js'

describe('regular expressions', () => {
  it('validates Chinese mainland phone numbers', () => {
    expect(PHONE_NUMBER_REGEX.test('13812345678')).toBe(true)
    expect(PHONE_NUMBER_REGEX.test('12812345678')).toBe(false)
    expect(PHONE_NUMBER_REGEX.test('1381234567')).toBe(false)
  })

  it('validates 15-digit and 18-digit ID card formats', () => {
    expect(ID_CARD_REGEX.test('11010519491231002X')).toBe(true)
    expect(ID_CARD_REGEX.test('110105491231002')).toBe(true)
    expect(ID_CARD_REGEX.test('01010519491231002X')).toBe(false)
    expect(ID_CARD_REGEX.test('11010519491331002X')).toBe(false)
    expect(ID_CARD_REGEX.test('11010519491232002X')).toBe(false)
    expect(ID_CARD_REGEX.test('11010519491231002A')).toBe(false)
    expect(ID_CARD_REGEX.test('11010519491231002X0')).toBe(false)
  })

  it('validates ID card birth dates and check codes', () => {
    expect(isValidIdCard('11010519491231002X')).toBe(true)
    expect(isValidIdCard('11010519491231002x')).toBe(true)
    expect(isValidIdCard('110105491231002')).toBe(true)
    expect(isValidIdCard('11010519490231002X')).toBe(false)
    expect(isValidIdCard('110105194912310021')).toBe(false)
  })

  it('validates passwords with both letters and digits', () => {
    expect(PASSWORD_REGEX.test('abc123')).toBe(true)
    expect(PASSWORD_REGEX.test('123456')).toBe(false)
    expect(PASSWORD_REGEX.test('abcdef')).toBe(false)
    expect(PASSWORD_REGEX.test('abc123!')).toBe(false)
  })

  it('validates unified social credit code formats', () => {
    expect(UNIFIED_SOCIAL_CREDIT_CODE_REGEX.test('91350100M000100Y43')).toBe(true)
    expect(UNIFIED_SOCIAL_CREDIT_CODE_REGEX.test('91350100M000100I43')).toBe(false)
    expect(UNIFIED_SOCIAL_CREDIT_CODE_REGEX.test('91350100M000100Y4')).toBe(false)
  })
})

describe('masking utilities', () => {
  it('masks valid phone numbers and preserves invalid input', () => {
    expect(maskPhoneNumber('13812345678')).toBe('138****5678')
    expect(maskPhoneNumber('1381234567')).toBe('1381234567')
    expect(maskPhoneNumber('')).toBe('')
  })

  it('masks valid ID cards and preserves invalid input', () => {
    expect(maskIdCard('11010519491231002X')).toBe('110****002X')
    expect(maskIdCard('110105491231002')).toBe('110****1002')
    expect(maskIdCard('110105194912310021')).toBe('110105194912310021')
    expect(maskIdCard('invalid')).toBe('invalid')
    expect(maskIdCard('')).toBe('')
  })

  it('masks email usernames without producing invalid fragments', () => {
    expect(maskEmail('developer@example.com')).toBe('d****r@example.com')
    expect(maskEmail('ab@example.com')).toBe('a****b@example.com')
    expect(maskEmail('a@example.com')).toBe('a@example.com')
    expect(maskEmail('invalid')).toBe('invalid')
    expect(maskEmail('@example.com')).toBe('@example.com')
    expect(maskEmail('user@')).toBe('user@')
    expect(maskEmail('')).toBe('')
  })
})
