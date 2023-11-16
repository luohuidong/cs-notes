# 类-继承

ES6 中原生支持了类继承机制。虽然类继承使用的是新语法，但背后依旧使用的是原型链。

## 继承基础

ES6 类支持单继承，使用 `extends` 关键字。

```js
class Vehicle {}

class Bus extends Vehicle {}

let bus = new Bus()
console.log(bus instanceof Bus) // true
console.log(bus instanceof Vehicle) // true
```

类和原型上定义的方法都会带到派生类。`this` 的值会反映调用相应方法的实例或者类。

```js
class Vehicle {
  identifyPrototype(id) {
    console.log(id, this)
  }
  static identifyClass(id) {
    console.log(id, this)
  }
}

class Bus extends Vehicle {}

let v = new Vehicle()
let b = new Bus()

b.identifyPrototype('bus') // bus Bus {}
v.identifyPrototype('vehicle') // vehicle Vehicle {}

Bus.identifyClass('bus') // bus class Bus {}
Vehicle.identifyClass('vehicle') // vehicle class Vehicle {}
```

## super 关键字

派生类的方法可以通过 `super` 关键字访问它们的原型或调用超类的类构造函数。这个关键字只能在派生类中使用，而且仅限于类构造函数、实例方法和静态方法内部。

如果派生类中显式定义了构造函数，则要么必须在其中调用 `super()`，要么必须在其中返回一个对象。另外，不能在调用 `super()` 之前引用 `this`。

```js
class Foo {
  constructor(name) {
    this.name = name
  }

  getNameSeparator() {
    return '-'
  }
}

class FooBar extends Foo {
  constructor(name, index) {
    super(name)
    this.index = index
  }

  getFullName() {
    return this.name + super.getNameSeparator() + this.index
  }
}

const firstFooBar = new FooBar('foo', 1)

console.log(firstFooBar.name)
// Expected output: "foo"

console.log(firstFooBar.getFullName())
// Expected output: "foo-1"
```

在静态方法中可以通过 `super` 调用继承的类上定义的静态方法：

```js
class Vehicle {
  static identify() {
    console.log('vehicle')
  }
}

class Bus extends Vehicle {
  static identify() {
    super.identify()
  }
}

Bus.identify() // vehicle
```
