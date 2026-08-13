import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getDateSideLabel,
} from '../src/date'

describe('getDateSideLabel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 2026-03-10 是周二
    vi.setSystemTime(new Date('2026-03-10T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('labels today and tomorrow', () => {
    expect(getDateSideLabel('2026-03-10')).toBe('今天')
    expect(getDateSideLabel('2026-03-11')).toBe('明天')
  })

  it('falls back to the weekday label', () => {
    expect(getDateSideLabel('2026-03-12')).toBe('周四')
    expect(getDateSideLabel('2026-03-15')).toBe('周日')
  })

  it('accepts custom labels', () => {
    expect(getDateSideLabel('2026-03-10', { today: 'Today' })).toBe('Today')
    expect(getDateSideLabel('2026-03-12', {
      weekLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    })).toBe('Thu')
  })
})
