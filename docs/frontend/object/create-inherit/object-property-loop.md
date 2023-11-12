# 对象属性枚举

对象的枚举有以下方式：

- `for...in`
- `Object.keys()`
- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.values()`：返回对象值的数组
- `Object.entries()`：返回键值对的数组

下面将以实例 `person` 为例，介绍这些枚举方式的区别。

```js
function Person(name) {
  this.name = name
  this[Symbol('address')] = 'Beijing'
}

Person.prototype.sayName = function () {
  console.log(this.name)
}

const person = new Person('Tom')

Object.defineProperty(person, 'age', {
  value: 18,
  enumerable: false,
})
```

`for...in`，返回可以通过对象访问且可以被枚举的属性，包括实例属性和原型属性：

```js
for (const key in person) {
  console.log(key)
}
// name
// sayName
```

`Object.keys()`，返回可枚举的实例属性：

```js
console.log(Object.keys(person))
// [ 'name' ]
```

`Object.getOwnPropertyNames()`，可列出所有实例属性，无论是否可枚举：

```js
console.log(Object.getOwnPropertyNames(person))
// [ 'name', 'age' ]
```

前面的属性枚举方式是没法列出以 `Symbol` 为键的属性的，这时就需要使用 `Object.getOwnPropertySymbols()`：

```js
console.log(Object.getOwnPropertySymbols(person))
// [ Symbol(address) ]
```

`Object.values()` 返回的是自身可枚举的、键为字符串的属性的值数组：

```js
console.log(Object.values(person))
// [ 'Tom' ]
```

`Object.entries()` 返回的是实例自身可枚举、键为字符串的属性的键值对数组：

```js
console.log(Object.entries(person))
// [['name', 'Tom']]
```
