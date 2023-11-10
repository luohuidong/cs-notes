# 原型模式

每个函数都会创建一个 `prototype` 属性，这个属性是一个对象。这个对象是通过调用构造函数创建的对象的原型。使用原型对象的好处是，在它上卖弄定义的属性和方法可以被对象实例共享。

```js
function Person() {}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function () {
  alert(this.name)
}

var person1 = new Person()
person1.sayName() // "Nicholas"

var person2 = new Person()
person2.sayName() // "Nicholas"

alert(person1.sayName == person2.sayName) // true
```

## 理解原型

- 无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 `prototype` 属性。
- 默认情况下，所有原型对象自动获取一个名为 `constructor` 的属性，指回与之关联的构造函数。

```js
function Person() {}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function () {
  alert(this.name)
}
console.log(Person.prototype.constructor === Person) // true

let person1 = new Person(),
  person2 = new Person()

console.log(Object.getPrototypeOf(person1) === Person.prototype) // true
console.log(Object.getPrototypeOf(person1).constructor === Person) // true

// 同一个构造函数创建的两个实例共享同一个原型对象
console.log(Object.getPrototypeOf(person1) === Object.getPrototypeOf(person2)) // true
```

下面的图梳理了前面例子中构造函数、实例与原型的关系：

![原型链](https://cdn.luohuidong.cn/clipboard_20231110_011637.png)

## 设置原型

`Object.setPrototypeOf()` 方法可以设置实例的的原型对象：

```js
let biped = {
  numLegs: 2,
}
let person = {
  name: 'Matt',
}

Object.setPrototypeOf(person, biped)

console.log(person.name) // Matt
console.log(person.numLegs) // 2
console.log(Object.getPrototypeOf(person) === biped) // true
```

但是 `Object.setPrototypeOf()` 这个方法可能会严重影响代码性能。因此，不推荐使用这个方法，而是使用 `Object.create()` 方法来创建一个新对象，同时为其指定原型：

```js
let biped = {
  numLegs: 2,
}
let person = Object.create(biped)
person.name = 'Matt'

console.log(person.name) // Matt
console.log(person.numLegs) // 2
console.log(Object.getPrototypeOf(person) === biped) // true
```

## 原型层级

- 在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。
- 如果在这个实例上发现了给定的名称，则返回该名称对应的值。
- 如果没有找到这个属性，则搜索会沿着指针进入原型对象，然后在原型对象上找到属性后，再返回对应的值。
