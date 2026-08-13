/** 安全解码 URI 组件，遇到非法转义序列时返回原字符串而不抛错。 */
export function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  }
  catch {
    return value
  }
}
