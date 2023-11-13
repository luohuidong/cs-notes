# 原型链

ECMA-262 把原型链定义为 ECMAScript 的主要继承方式。其基本思想就是通过原型链继承多个引用类型的属性和方法。

重温构造函数、原型和实例的关系：

- 每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。
- 如果原型是另一个类型的实例，那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。这就是原型链的基本构想。

原型链实现：

```js
function SuperType() {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType() {
  this.subproperty = false
}
// 继承SuperType
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function () {
  return this.subproperty
}
let instance = new SubType()
console.log(instance.getSuperValue()) // true
```

原型链扩展了原型搜索机制，在读取实例上的属性时，首先会在实例上搜索这个属性。如果没有找到，则会继承搜索实例的原型。在通过原型链实现继承之后，搜索就可以继续向上，搜索原型的原型。

## 默认原型

任何函数的默认原型都是一个 `Object` 的实例，这意味着这个实例有一个内部指针指向 `Object.prototype`。这也是为什么自定义类型能够继承包括 `toString()`、`valueOf()` 在内的所有默认方法的原因。
