# 增强的对象语法

ES6 中为定义和操作对象新增了很多极其有用的语法糖特性。这些特性都没有改变现有引擎的行为，但极大地提升了处理对象的方便程度。

## 属性名简写语法

在给对象添加变量的时候，如果属性名和变量名一样，则可以省略属性名直接使用变量名，这时候变量名会自动解释位同名的属性键。如果没有找到同名变量，则会抛出错误。

使用属性名简写：

```js
let name = 'Matt'

let person = {
  name,
}

console.log(person) // { name: 'Matt' }
```

## 可计算属性

使用可计算属性，可以在对象字面量中完成动态属性赋值：

```js
const nameKey = 'name'
const ageKey = 'age'
const jobKey = 'job'

let person = {
  [nameKey]: 'Matt',
  [ageKey]: 27,
  [jobKey]: 'Software engineer',
}

console.log(person) // { name: 'Matt', age: 27, job: 'Software engineer' }
```

中括号包围的对象属性键告诉运行时将其作为 JavaScript 表达式而不是字符串来求值，所以可计算属性本身可以是复杂的表达式：

```js
const nameKey = 'name'
const ageKey = 'age'
const jobKey = 'job'
let uniqueToken = 0

function getUniqueKey(key) {
  return `${key}_${uniqueToken++}`
}

let person = {
  [getUniqueKey(nameKey)]: 'Matt',
  [getUniqueKey(ageKey)]: 27,
  [getUniqueKey(jobKey)]: 'Software engineer',
}

console.log(person) // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
```

## 简写方法名

使用简写方法名之前定义方法：

```js
let person = {
  sayName: function (name) {
    console.log(`My name is ${name}`)
  },
}

person.sayName('Matt') // My name is Matt
```

使用简写方法名：

```js
let person = {
  sayName(name) {
    console.log(`My name is ${name}`)
  },
}

person.sayName('Matt') // My name is Matt
```
