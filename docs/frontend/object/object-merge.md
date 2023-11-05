# 对象合并

`Object.assign()` 方法专门用于合并对象，这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中可枚举（`Object.propertyIsEnumerable()` 返回 `true`）和自有（`Object.hasOwnProperty()` 返回 `true`）的属性复制到目标对象。

单个源对象：

```js
let dest = {};
const src = { id: "src" };
const result = Object.assign(dest, src);

console.log(dest === result); // true
console.log(dest !== src); // true
console.log(result); // { id: 'src' }
```

多个源对象：

```js
let dest = {};
const result = Object.assign(dest, { a: "foo" }, { b: "bar" });
console.log(result); // { a: 'foo', b: 'bar' }
```

getter 和 setter：

```js
dest = {
  set a(val) {
    console.log(`Invoked dest setter with param ${val}`);
  },
};
src = {
  get a() {
    console.log("Invoked src getter");
    return "foo";
  },
};
Object.assign(dest, src);
```
