# 类

ES6 的类是封装了 ES5 构造函数加原型继承的语法糖。

类的构成：

- 构造函数方法
- 实例方法
- 获取函数
- 设置函数
- 静态类方法

## 类构造函数 (constructor)

`constructor` 关键字用于在类定义块内部创建类的构造函数。方法名 `constructor` 会告诉解释器在使用 new 操作符创建类的新实例时，应该调用这个函数。构造函数的定义不是必须的，不定义构造函数相当于将构造函数定义为空函数。

new 调用类的构造函数执行如下操作：

1. 在内存中创建一个新对象
2. 这个新对象内部的 `[[Prototype]]` 指针被赋值为构造函数的 `prototype` 属性。
3. 构造函数内部的 `this` 被赋值为这个新对象（即 this 指向新对象）
4. 执行构造函数内部的代码（给新对象添加属性）
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

类构造函数与构造函数的主要区别是，调用类构造函数必须使用 `new` 操作符。而普通构造函数如果不使用 `new` 调用，那么就会以全局的 `this` 作为内部对象。调用类构造函数时如果忘了使用 `new` 则会抛出错误。

类构造函数没有什么特殊之处，实例化之后，它会成为普通的实例方法（但作为类构造函数，仍然要使用 `new` 调用）。因此，实例化之后可以在实例上引用它。

## 把类当成特殊函数

ECMAScript 类是一种特殊函数，通过 `typeof` 操作符检测类标识符会返回 `"function"`。

```js
class Person {}
console.log(typeof Person) // function
```

类标识符有 prototype 属性，而这个原型也有一个 `constructor` 属性指向类自身：

```js
class Person {}
console.log(Person.prototype.constructor === Person) // true
```

根据前面的描述，类本身具有与普通构造函数一样的行为。在类的上下文中，类本身在使用 `new` 调用时就会被当成构造函数。重点在于，类中定义的 `constructor` 方法不会被当成构造函数，在对它使用 `instanceof` 操作符时会返回 `false`。但是，如果在创建实例时直接将类构造函数当成普通构造函数来使用，那么 `instanceof` 操作符的返回值会反转：

```js
class Person {}
let p1 = new Person()
console.log(p1.constructor === Person) // true
console.log(p1 instanceof Person) // true
console.log(p1 instanceof Person.constructor) // false

let p2 = new Person.constructor()
console.log(p2.constructor === Person) // false
console.log(p2 instanceof Person) // false
console.log(p2 instanceof Person.constructor) // true
```

## 实例、原型和类成员

类的语法可以非常方便地定义应该存在于实例、原型和类本身的成员。

- 在 `constructor` 函数内部，可以为新创建的实例添加属性。
- 为了在实例间共享方法，类定义语法把在类块中定义的方法作为原型方法。
- 类定义支持 `getter` 和 `setter`，语法与行为跟普通对象一样。
- 在类上定义静态方法。这些方法通常用于执行不特定于实例的操作，也不要求存在于类的实例。静态类成员在类定义中使用 `static` 关键字作为前缀。在静态成员中，`this` 引用类自身。

## 迭代器与生成器方法

类定义语法支持在原型和类本身上定义生成器方法：

```js
class Person {
  // 在原型上定义生成器方法
  ＊createNicknameIterator() {
    yield 'Jack';
    yield 'Jake';
    yield 'J-Dog';
  }
  // 在类上定义生成器方法
  static ＊createJobIterator() {
    yield 'Butcher';
    yield 'Baker';
    yield 'Candlestick maker';
  }
}

let jobIter = Person.createJobIterator()
console.log(jobIter.next().value) // Butcher
console.log(jobIter.next().value) // Baker
console.log(jobIter.next().value) // Candlestick maker
let p = new Person()
let nicknameIter = p.createNicknameIterator()
console.log(nicknameIter.next().value) // Jack
console.log(nicknameIter.next().value) // Jake
console.log(nicknameIter.next().value) // J-Dog
```

因为支持生成器方法，所以可以通过添加一个默认的迭代器，把类实例变成可迭代对象：

```js
class Person {
  constructor() {
    this.nicknames = ['Jack', 'Jake', 'J-Dog'];
  }
  ＊[Symbol.iterator](){
    yield＊this.nicknames.entries();
  }
}
let p = new Person();
for (let [idx, nickname] of p) {
  console.log(nickname);
}
// Jack
// Jake
// J-Dog
```
