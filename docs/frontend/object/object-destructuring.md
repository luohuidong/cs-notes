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

## 嵌套解构

解构赋值可以使用嵌套解构，以匹配嵌套的属性：

```js
let person = {
  name: 'Matt',
  age: 27,
  job: {
    title: 'Software engineer',
  },
}
// 声明title变量并将person.job.title的值赋给它
let {
  job: { title },
} = person
console.log(title) // Software engineer
```

在外层属性没有定义的情况下不能使用嵌套解构：

```js
let person = {
  job: {
    title: 'Software engineer',
  },
}
let personCopy = {}

// foo在源对象上是undefined
;({
  foo: { bar: personCopy.bar },
} = person)
// TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'.

// job在目标对象上是undefined
;({
  job: { title: personCopy.job.title },
} = person)
// TypeError: Cannot set property 'title' of undefined
```

## 部分解构

如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分：

```js
let person = {
  name: 'Matt',
  age: 27,
}
let personName, personBar, personAge
try {
  // person.foo是undefined，因此会抛出错误
  ;({
    name: personName,
    foo: { bar: personBar },
    age: personAge,
  } = person)
} catch (e) {}
console.log(personName, personBar, personAge)
// Matt, undefined, undefined
```

## 函数参数解构赋值

在函数参数列表中也可以进行解构赋值：

```js
let person = {
  name: 'Matt',
  age: 27,
}
function printPerson(foo, { name, age }, bar) {
  console.log(name, age)
}
function printPerson2(foo, { name: personName, age: personAge }, bar) {
  console.log(personName, personAge)
}
printPerson('1st', person, '2nd')
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
printPerson2('1st', person, '2nd')
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
```
