# Object.is()

`Object.is()` 用于判断两个值是否相等。`Object.is()` 弥补了 `===` 的不足，比如 `+0` 和 `-0`，`NaN` 和 `NaN`：

```js
// 这些情况在不同JavaScript引擎中表现不同，但仍被认为相等
console.log(+0 === -0) // true
console.log(+0 === 0) // true
console.log(-0 === 0) // true

// 要确定NaN的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN) // false
console.log(isNaN(NaN)) // true
```

```js
// 正确的0、-0、+0相等/不等判定
console.log(Object.is(+0, -0)) // false
console.log(Object.is(+0, 0)) // true
console.log(Object.is(-0, 0)) // false

// 正确的NaN相等判定
console.log(Object.is(NaN, NaN)) // true
```
