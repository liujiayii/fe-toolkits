# 正则与脱敏

## 正则常量

```ts
import {
  ID_CARD_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  UNIFIED_SOCIAL_CREDIT_CODE_REGEX,
} from 'fe-toolkits/regex'

PHONE_NUMBER_REGEX.test('13812345678') // true
ID_CARD_REGEX.test('11010519491231002X') // true
PASSWORD_REGEX.test('abc123') // true
UNIFIED_SOCIAL_CREDIT_CODE_REGEX.test('91350100M000100Y43') // true
```

这些常量用于格式级校验，不验证号码或证件是否真实存在。身份证需要完整校验时请使用 `isValidIdCard`。

## isValidIdCard

校验中国大陆身份证的格式和真实出生日期，并验证 18 位身份证的末位校验码。15 位旧版身份证没有校验码，因此校验格式和出生日期。

```ts
import { isValidIdCard } from 'fe-toolkits/regex'

isValidIdCard('11010519491231002X') // true
isValidIdCard('110105194912310021') // false
```

## maskPhoneNumber

将合法手机号的中间四位替换为 `****`，格式不匹配时原样返回。

```ts
import { maskPhoneNumber } from 'fe-toolkits/regex'

maskPhoneNumber('13812345678') // '138****5678'
maskPhoneNumber('1381234567') // '1381234567'
```

## maskIdCard

将通过 `isValidIdCard` 完整校验的身份证号脱敏，仅保留前三位和后四位。

```ts
import { maskIdCard } from 'fe-toolkits/regex'

maskIdCard('11010519491231002X') // '110****002X'
```

## maskEmail

保留邮箱用户名首尾字符及完整域名，并将用户名中间部分替换为 `****`。单字符用户名保持不变，格式异常时原样返回。

```ts
import { maskEmail } from 'fe-toolkits/regex'

maskEmail('developer@example.com') // 'd****r@example.com'
maskEmail('a@example.com') // 'a@example.com'
```
