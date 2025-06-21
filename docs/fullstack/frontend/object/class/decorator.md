# 装饰器

装饰器应用范围：

- Classes
- Class fields (public, private, and static)
- Class methods (public, private, and static)
- Class accessors (public, private, and static)

## 新的类元素

Class Auto-Accessors 通过在 class field 前面添加 `accessor` 关键字来创建：

```js
class C {
  accessor x = 1
}
```

等价于

```js
class C {
  #x = 1

  get x() {
    return this.#x
  }

  set x(val) {
    this.#x = val
  }
}
```

## `addInitializer`

可以在装饰器中定义一个 `addInitializer` 方法，用来执行初始化逻辑。`addInitializer` 初始化时间取决于是何种类型的装饰器：

- Class decorator initializers are run after the class has been fully defined, and after class static fields have been assigned.
- Class element initializers run during class construction, before class fields are initialized.
- Class static element initializers run during class definition, before static class fields are defined, but after class elements have been defined.

典型的使用场景：通过装饰器在浏览器中注册一个自定义元素
