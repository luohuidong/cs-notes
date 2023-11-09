# 构造函数模式

ECMAScript 中的构造函数是用于创建特定类型对象的：

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}

const person1 = new Person('Nicholas', 29, 'Software Engineer')
const person2 = new Person('Greg', 27, 'Doctor')

person1.sayName() // 'Nicholas'
person2.sayName() // 'Greg'
```

通过构造函数创建对象，需要使用 new 操作符，以这种方式调用构造函数会执行如下操作：

1. 在内存中创建一个新对象
2. 这个新对象内部的 [[Prototype]] 特性被赋值为构造函数的 prototype 属性
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
4. 执行构造函数内部的代码（给新对象添加属性）
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

在实例化时，如果不想传参数，那么构造函数后面的括号可加可不加。只要有 new 操作符，就可以调用相应的构造函数。

## constructor 属性与 instanceof 操作符

上面的例子中，person1 跟 person2 分别保存着 `Person` 的不同实例。这两个实例对象都有一个 `constructor` 属性指向 Person：

```js
console.log(person1.constructor === Person) // true
console.log(person2.constructor === Person) // true
```

`constructor` 本来是用于标识对象类型的，但是在 ECMAScript 中，`constructor` 也是可以被改变的，因此使用 `instanceof` 操作符确定对象类型更可靠：

```js
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
console.log(person2 instanceof Object) // true
console.log(person2 instanceof Person) // true
```

## 构造函数也是函数

构造函数与普通函数唯一的区别就是调用方式不同。除此之外，构造函数也是函数。并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用 `new` 操作符调用就是构造函数，而不使用 `new` 操作符调用的函数就是普通函数。

```js
const person = new Person('Nicholas', 29, 'Software Engineer')
person.sayName() // 'Nicholas'

Person('Greg', 27, 'Doctor') // 添加到 window
window.sayName() // 'Greg'

const o = new Object()
Person.call(o, 'Kristen', 25, 'Nurse')
o.sayName() // 'Kristen'
```

## 构造函数的问题

构造函数的主要问题在于其定义的方法会在每个实例上都创建一遍。由于方法都是做一样的事，因此没必要定义两个不同的 Function 实例。这个问题可以使用原型模式来解决。
