# URL 处理

## safeDecode

安全解码 URI 组件，遇到非法转义序列时返回原字符串而不抛错。

```ts
import { safeDecode } from 'fe-toolkits/url'

safeDecode('%E4%B8%AD%E6%96%87') // '中文'
safeDecode('a%20b') // 'a b'
```

`decodeURIComponent` 在遇到孤立的 `%` 或不完整的转义序列时会抛 `URIError`，
而这类字符串在真实链路里很常见（用户输入的 `100%off`、被截断的参数、二次编码的回跳地址）。
一次未捕获的 `URIError` 足以让整个页面白屏，因此这里统一兜底：

```ts
safeDecode('%') // '%'
safeDecode('100%off') // '100%off'
safeDecode('%E4%B8') // '%E4%B8'
```

典型用法是解析地址栏参数。注意 `URLSearchParams.get` 已经做过一次解码，
再套 `safeDecode` 属于二次解码——除非你确实需要这个行为，否则不要重复解码：

```ts
const raw = new URLSearchParams(location.search).get('redirect') ?? ''
const redirect = safeDecode(raw)

// ❌ 危险：解码后直接 assign，可能被恶意构造的 URL 实现开放重定向
// location.assign(redirect)

// ✅ 安全：跳转前校验协议为 http/https，且目标同源或命中白名单
const url = new URL(redirect, location.origin)
const isAllowed = (url.protocol === 'http:' || url.protocol === 'https:')
  && (url.origin === location.origin || ALLOWED_REDIRECT_HOSTS.has(url.host))
if (isAllowed)
  location.assign(redirect)
```
