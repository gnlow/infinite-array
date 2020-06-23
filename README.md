# infinite-array
Infinite array for JS
## Use (Deno)
```ts
import infiniteArray from "https://raw.githubusercontent.com/gnlow/infinite-array/master/mod.ts"

const x2 = infiniteArray(n => n * 2)
const [a, b] = x2

console.log(a, b) // 0 2
console.log(x2[123]) // 246
```
## How it works
- `x[123]`: Proxy - get handler
- `[a, b] = x`: Symbol.iterator
