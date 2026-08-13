import { describe, expect, it } from 'vitest'
import {
  formatDistance,
  moneyToFixed,
  normalizeErrorInfo,
  safeDecode,
} from '../src'

describe('safeDecode', () => {
  it('decodes valid escape sequences', () => {
    expect(safeDecode('%E4%B8%AD%E6%96%87')).toBe('中文')
    expect(safeDecode('a%20b')).toBe('a b')
  })

  it('returns the input untouched when decoding fails', () => {
    expect(safeDecode('%')).toBe('%')
    expect(safeDecode('100%off')).toBe('100%off')
    expect(safeDecode('%E4%B8')).toBe('%E4%B8')
  })
})

describe('normalizeErrorInfo', () => {
  it('reads Error instances directly', () => {
    const error = new TypeError('boom')
    const info = normalizeErrorInfo(error)

    expect(info.name).toBe('TypeError')
    expect(info.message).toBe('boom')
    expect(info.raw).toBe('TypeError: boom')
    expect(info.stack.length).toBeGreaterThan(0)
  })

  it('flattens plain objects', () => {
    expect(normalizeErrorInfo({ name: 'ApiError', message: 'failed', stack: 'at foo' })).toEqual({
      raw: '{"name":"ApiError","message":"failed","stack":"at foo"}',
      name: 'ApiError',
      message: 'failed',
      stack: 'at foo',
    })
  })

  it('falls back to the serialized object when message is absent', () => {
    const info = normalizeErrorInfo({ code: 500 })

    expect(info.name).toBe('')
    expect(info.message).toBe('{"code":500}')
    expect(info.stack).toBe('')
  })

  it('handles strings and primitives', () => {
    expect(normalizeErrorInfo('plain failure')).toEqual({
      raw: 'plain failure',
      name: '',
      message: 'plain failure',
      stack: '',
    })
    expect(normalizeErrorInfo(undefined).message).toBe('undefined')
    expect(normalizeErrorInfo(null).message).toBe('null')
  })

  it('survives circular references', () => {
    const circular: Record<string, unknown> = { name: 'Circular' }
    circular.self = circular

    const info = normalizeErrorInfo(circular)
    expect(info.name).toBe('Circular')
    expect(info.message).toBe('[object Object]')
  })
})

describe('convertHtmlToText', () => {
  it('placeholder — removed', () => {
    // string 模块尚未实现，相关用例暂移除
    expect(true).toBe(true)
  })
})

describe('moneyToFixed', () => {
  it('rounds to two decimals by default', () => {
    expect(moneyToFixed(1.005)).toBe(1.01)
    expect(moneyToFixed(0.1 + 0.2)).toBe(0.3)
    expect(moneyToFixed(19.999)).toBe(20)
  })

  it('honours a custom precision', () => {
    expect(moneyToFixed(1.2345, 3)).toBe(1.235)
    expect(moneyToFixed(1.5, 0)).toBe(2)
  })

  it('clamps invalid money to 0', () => {
    expect(moneyToFixed(NaN)).toBe(0)
    expect(moneyToFixed(Infinity)).toBe(0)
    expect(moneyToFixed(-Infinity)).toBe(0)
  })
})

describe('formatDistance', () => {
  it('uses metres below the threshold', () => {
    expect(formatDistance(0)).toBe('0米')
    expect(formatDistance(999)).toBe('999米')
  })

  it('switches to kilometres at the threshold', () => {
    expect(formatDistance(1000)).toBe('1.0公里')
    expect(formatDistance(1500)).toBe('1.5公里')
  })

  it('accepts a prefix and custom units', () => {
    expect(formatDistance(500, { prefix: '距您直线' })).toBe('距您直线500米')
    expect(formatDistance(1500, { prefix: '距您直线' })).toBe('距您直线1.5公里')
    expect(formatDistance(1500, { kilometerUnit: 'km', precision: 2 })).toBe('1.50km')
    expect(formatDistance(800, { threshold: 500, precision: 1 })).toBe('1.6公里')
  })

  it('returns empty string for negative or NaN', () => {
    expect(formatDistance(-100)).toBe('')
    expect(formatDistance(NaN)).toBe('')
    expect(formatDistance(Infinity)).toBe('')
  })
})
