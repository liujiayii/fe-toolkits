# 错误归一化

## normalizeErrorInfo

把任意抛出物抹平成统一的 `{ raw, name, message, stack }` 结构。

```ts
import { normalizeErrorInfo } from 'fe-toolkits/error'

normalizeErrorInfo(new TypeError('boom'))
// { raw: 'TypeError: boom', name: 'TypeError', message: 'boom', stack: 'TypeError: boom\n    at ...' }
```

## 为什么需要它

JavaScript 里 `throw` 可以抛任何值，各端 SDK 和小程序运行时更是五花八门：

```ts
// 普通对象
normalizeErrorInfo({ name: 'ApiError', message: 'failed', stack: 'at foo' })
// { raw: '{"name":"ApiError",...}', name: 'ApiError', message: 'failed', stack: 'at foo' }

// 没有 message 的对象，退化为序列化结果
normalizeErrorInfo({ code: 500 })
// { raw: '{"code":500}', name: '', message: '{"code":500}', stack: '' }

// 字符串
normalizeErrorInfo('plain failure')
// { raw: 'plain failure', name: '', message: 'plain failure', stack: '' }

// 原始值
normalizeErrorInfo(undefined) // message: 'undefined'
normalizeErrorInfo(null) // message: 'null'
```

直接读取这些值的属性行为并不一致：
对 `null` / `undefined` 读 `.message` / `.stack` 会**抛 `TypeError`**；
对字符串、数字、普通对象这类「属性不存在」的值，读取结果则是 `undefined`。
不管哪种情况，上报到监控平台都会变成一条无法定位的空记录或直接抛错中断。
归一化之后可以放心地喂给上报通道：

```ts
try {
  await risky()
}
catch (error) {
  const info = normalizeErrorInfo(error)
  report({ msg: info.message, trace: info.stack, raw: info.raw })
}
```

## 循环引用

`JSON.stringify` 失败时退化为 `String(value)`，不会二次抛错：

```ts
const circular: Record<string, unknown> = { name: 'Circular' }
circular.self = circular

normalizeErrorInfo(circular)
// { raw: '[object Object]', name: 'Circular', message: '[object Object]', stack: '' }
```
