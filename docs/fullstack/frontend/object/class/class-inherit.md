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

`super` 关键字作用：

- 访问原型上的属性
- 调用父类的构造函数
- 调用父类的静态方法

使用 `super` 关键字有两种方式，一种是作为函数调用，另外一种是作为属性查找。

在派生类的构造函数中，`super` 作为函数调用，并且需要在使用 `this` 之前调用。`super()` 会调用父类的构造函数，并且绑定父类中的 public fields。

```js
class Rectangle {
  constructor(height, width) {
    this.name = 'Rectangle'
    this.height = height
    this.width = width
  }
  sayName() {
    console.log(`Hi, I am a ${this.name}.`)
  }
  get area() {
    return this.height * this.width
  }
  set area(value) {
    this._area = value
  }
}

class Square extends Rectangle {
  constructor(length) {
    // Here, it calls the parent class's constructor with lengths
    // provided for the Rectangle's width and height
    super(length, length)

    // Note: In derived classes, super() must be called before you
    // can use 'this'. Moving this to the top causes a ReferenceError.
    this.name = 'Square'
  }
}
```

在静态方法中可以通过 `super` 调用继承的类上定义的静态方法：

```js
class Rectangle {
  static logNbSides() {
    return 'I have 4 sides'
  }
}

class Square extends Rectangle {
  static logDescription() {
    return `${super.logNbSides()} which are all equal`
  }
}
Square.logDescription() // 'I have 4 sides which are all equal'
```

在 class field 声明中访问 `super`：

```js
class Base {
  static baseStaticField = 90
  baseMethod() {
    return 10
  }
}

class Extended extends Base {
  extendedField = super.baseMethod() // 10
  static extendedStaticField = super.baseStaticField // 90
}
```
