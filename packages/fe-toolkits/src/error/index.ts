/** 归一化后的错误信息。 */
export interface NormalizedErrorInfo {
  /** 错误的原始文本形式。 */
  raw: string
  /** 错误名，无法判定时为空字符串。 */
  name: string
  /** 错误描述。 */
  message: string
  /** 调用栈，无法判定时为空字符串。 */
  stack: string
}

/** 将任意值转为字符串，JSON 序列化失败时退化为 String()。 */
function safeStringify(value: unknown): string {
  if (typeof value === 'string')
    return value

  try {
    const json = JSON.stringify(value)
    return json || String(value)
  }
  catch {
    return String(value)
  }
}

/**
 * 抹平不同运行环境抛出的错误形态。
 *
 * 各端抛出的可能是 Error、普通对象甚至字符串，直接读 name/message/stack
 * 会拿到 undefined，导致上报时丢失关键信息。
 */
export function normalizeErrorInfo(error: unknown): NormalizedErrorInfo {
  if (error instanceof Error) {
    return {
      raw: error.toString(),
      name: error.name,
      message: error.message,
      stack: error.stack || '',
    }
  }

  if (typeof error === 'object' && error !== null) {
    const record = error as Record<string, unknown>
    return {
      raw: safeStringify(record),
      name: typeof record.name === 'string' ? record.name : '',
      message: typeof record.message === 'string' ? record.message : safeStringify(record),
      stack: typeof record.stack === 'string' ? record.stack : '',
    }
  }

  return {
    raw: safeStringify(error),
    name: '',
    message: safeStringify(error),
    stack: '',
  }
}
