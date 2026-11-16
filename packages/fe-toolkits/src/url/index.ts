import { toString } from 'es-toolkit/compat'

/** 安全解码 URI 组件，null/undefined 返回空串，遇到非法转义序列时返回原字符串而不抛错。 */
export function safeDecode(value: string): string {
  const input = toString(value)
  try {
    return decodeURIComponent(input)
  }
  catch {
    return input
  }
}
