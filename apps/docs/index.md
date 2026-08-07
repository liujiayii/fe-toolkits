# fe-toolkits

一个轻量、框架无关的 TypeScript 正则表达式与数据脱敏工具库。

```ts
import { maskPhoneNumber, PHONE_NUMBER_REGEX } from 'fe-toolkits/regex'

PHONE_NUMBER_REGEX.test('13812345678')
maskPhoneNumber('13812345678') // '138****5678'
```

## 设计约束

- 纯 TypeScript，不绑定 Vue、React 或其他 UI 框架。
- 正则表达式与脱敏工具均提供完整类型声明。
- 脱敏函数不修改输入，格式异常时原样返回。
- 仅输出现代 ESM，支持 Tree Shaking 和 `fe-toolkits/regex` 子路径导入。

[开始使用](/guide/getting-started) · [浏览 API](/api/)
