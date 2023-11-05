# 对象合并

`Object.assign()` 方法专门用于合并对象，这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中可枚举（`Object.propertyIsEnumerable()` 返回 `true`）和自有（`Object.hasOwnProperty()` 返回 `true`）的属性复制到目标对象。

```js
let dest = {};
const src = { id: "src" };
const result = Object.assign(dest, src);

console.log(dest === result); // true
console.log(dest !== src); // true
console.log(result); // { id: 'src' }
```

`Object.assign()` 对每个源对象执行的是浅复制，如果多个源对象都有相同的属性，则使用最后一个复制的值。

```js
let dest = {};
const result = Object.assign(dest, { id: "src1", a: "foo" }, { id: "src2", b: "bar" });
console.log(result); // { id: 'src2', a: 'foo', b: 'bar' }
```

有 getter 和 setter 的情况：

```js
let dest = {
  set a(val) {
    console.log(`Invoked dest setter with param ${val}`);
  },
};

const src = {
  get a() {
    console.log("Invoked src getter");
    return "foo";
  },
};

Object.assign(dest, src);

// 调用src的获取方法
// 调用dest的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来
console.log(dest); // { set a(val) {...} }
```

另外需要注意 `Object.assign()` 并不能在两个对象间转移获取函数和设置函数。
