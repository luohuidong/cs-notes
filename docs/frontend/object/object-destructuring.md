# 对象解构

## 对象解构的基本使用

对象解构就是使用与对象匹配的结构来实现对象属性赋值。使用解构，可以在一个类似对象字面量的解构中，声明多个变量，同时执行多个赋值操作：

```js
// 使用对象解构
let person = {
  name: 'Matt',
  age: 27,
}
let { name: personName, age: personAge } = person
console.log(personName) // Matt
console.log(personAge) // 27
```

如果想让变量直接使用属性的名称，那么可以使用简写语法：

```js
let person = {
  name: 'Matt',
  age: 27,
}

let { name, age } = person
console.log(name) // Matt
console.log(age) // 27
```

如果引用的属性不存在，则该变量的值就是 `undefined`：

```js
let person = {
  name: 'Matt',
  age: 27,
}
let { name, job } = person
console.log(name) // Matt
console.log(job) // undefined
```

在解构赋值的同时还能定义默认值，适用于引用的属性不存在的情况：

```js
let person = {
  name: 'Matt',
  age: 27,
}

let { name, job = 'Software Engineer' } = person
console.log(name) // Matt
console.log(job) // Software Engineer
```

解构在内部使用函数 `ToObject()` 把原数据解构转换成对象。这意味着对象解构的上下文中，原始值会被当成对象，同时也意味着 `null` 和 `undefined` 不能被解构，否则会抛出错误：

```js
let { length } = 'hello'
console.log(length) // 5

let { constructor: c } = 4
console.log(c === Number) // true

let { _ } = null // TypeError
let { _ } = undefined // TypeError
```

解构并不要求变量必须在结构表达式中声明。如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中：

```js
let personName, personAge
let person = {
  name: 'Matt',
  age: 27,
}

;({ name: personName, age: personAge } = person)
console.log(personName) // Matt
console.log(personAge) // 27
```
