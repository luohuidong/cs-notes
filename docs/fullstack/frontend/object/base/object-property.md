# 对象属性

属性类型:

- 数据属性
- 访问器属性

## 数据属性

数据属性包含一个保存数据值的位置， 值回从这个位置读取，也会写入到这个位置

描述数据属性行为的 4 个特性：

- `[[Configurable]]`
  - 属性是否可以通过 delete 删除并重新定义
  - 是否可以修改属性的特性
  - 是否可以改为访问器属性
  - 默认为 true
- `[[Enumerable]]`
  - 是否可以通过 for-in 循环返回
  - 默认为 true
- `[[Writable]]`
  - 表示属性的值是否可以被修改
  - 默认为 true
- `[[value]]`
  - 包含属性实际的值
  - 读取和写入属性的位置
  - 默认为 `undefined`

要修改属性特性，需要使用 `Object.defineProperty()` 方法。

```js
let person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas",
});
console.log(person.name); // Nicholas
person.name = "Greg";
console.log(person.name); // Nicholas
```

`Object.defineProperty()` 接收三个参数：

- 属性所在的对象
- 属性的名字
- 描述符对象，描述符对象的属性必须是：`configurable`、`enumerable`、`writable`、`value`、`get`、`set`。如果 `configurable`、`enumerable`、`writable` 没有指定，则默认为 false。

一般情况下，很少情况会使用 `Object.defineProperty()` 方法。

## 访问器属性

访问器属性不包含数据值，包含一个 getter 和一个 setter 函数，但这两个函数并不是必须的。

访问器属性描述符的 4 个特性：

- `[[Configurable]]`
  - 属性是否可以通过 delete 删除并重新定义
  - 是否可以修改属性的特性
  - 是否可以改为数据属性
  - 默认为 true
- `[[Enumerable]]`
  - 是否可以通过 for-in 循环返回
  - 默认为 true
- `[[Get]]`
  - 在读取属性时调用的函数
  - 默认为 undefined
- `[[Set]]`
  - 在写入属性时调用的函数
  - 默认为 undefined

访问器属性不能直接定义，必须使用 `Object.defineProperty()` 方法。

```js
let book = {
  _year: 2004,
  edition: 1,
};

Object.defineProperty(book, "year", {
  get: function () {
    return this._year;
  },
  set: function (newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  },
});

book.year = 2005;
console.log(book.edition); // 2
```

## 定义多个属性

使用 `Object.defineProperties()` 方法可以通过多个描述符一次性定义多个属性。

```js
let book = {};

Object.defineProperties(book, {
  _year: {
    value: 2004,
  },
  edition: {
    value: 1,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    },
  },
});
```

## 读取属性的特性

使用 `Object.getOwnPropertyDescriptor()` 方法可以取得给定属性的描述符。

```js
let book = {};

Object.defineProperties(book, {
  _year: {
    value: 2004,
  },
  edition: {
    value: 1,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    },
  },
});

let descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor.value); // 2004
console.log(descriptor.configurable); // false
console.log(typeof descriptor.get); // undefined

let descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value); // undefined
console.log(descriptor.enumerable); // false
console.log(typeof descriptor.get); // function
```

如果觉得使用 `Object.getOwnPropertyDescriptor()` 方法太麻烦，可以使用 `Object.getOwnPropertyDescriptors()` 方法，该方法返回一个对象，包含所有自有属性的描述符。

```js
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017,
  },
  edition: {
    value: 1,
  },
  year: {
    get: function () {
      return this.year_;
    },
    set: function (newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    },
  },
});
console.log(Object.getOwnPropertyDescriptors(book));
// {
//    edition: {
//      configurable: false,
//      enumerable: false,
//      value: 1,
//      writable: false
//    },
//    year: {
//      configurable: false,
//      enumerable: false,
//      get: f(),
//      set: f(newValue),
//    },
//    year_: {
//      configurable: false,
//      enumerable: false,
//      value: 2017,
//      writable: false
//    }
// }
```
