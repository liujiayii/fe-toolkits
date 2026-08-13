# 数字与格式化

## moneyToFixed

金额保留指定小数位，规避浮点数累加的精度问题，返回 `number` 而非字符串。

```ts
import { moneyToFixed } from 'fe-toolkits/number'

moneyToFixed(0.1 + 0.2) // 0.3
moneyToFixed(19.999) // 20
moneyToFixed(1.2345, 3) // 1.234
```

默认保留 2 位。适合在提交订单金额、累加价格明细后收口一次：

```ts
const total = moneyToFixed(items.reduce((sum, item) => sum + item.price, 0))
submitOrder({ total })
```

## formatDistance

把以米为单位的距离格式化为可读文案，超过阈值自动切换到公里。

```ts
import { formatDistance } from 'fe-toolkits/number'

formatDistance(500) // '500米'
formatDistance(1000) // '1.0公里'
formatDistance(1500) // '1.5公里'
```

前缀、单位、阈值、精度均可配置：

```ts
formatDistance(1500, { prefix: '距您直线' }) // '距您直线1.5公里'
formatDistance(1500, { kilometerUnit: 'km', precision: 2 }) // '1.50km'
formatDistance(800, { threshold: 500 }) // '1.6公里'
```

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `prefix` | `string` | `''` | 文案前缀 |
| `meterUnit` | `string` | `'米'` | 米的单位文案 |
| `kilometerUnit` | `string` | `'公里'` | 公里的单位文案 |
| `threshold` | `number` | `1000` | 切换到公里的阈值（米） |
| `precision` | `number` | `1` | 公里保留的小数位 |
