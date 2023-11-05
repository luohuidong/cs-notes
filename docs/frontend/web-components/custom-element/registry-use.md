# 注册与使用

## 注册 Custom element

为了使得 custom element 可以在页面上正常使用，需要通过 `Window.customElements` 对象的 `define()` 方法对 customer element 进行注册。`define()` 方法接收三个参数：

- `name`：自定义元素的名称，必须包含一个短横线，比如 `my-custom-element`。
- `constructor`：自定义元素的构造函数
- `options`：仅在 custom element 继承自内建元素的时候使用。该对象仅包含 `extends` 属性，值为扩展的内建元素的名称。

```ts
customElements.define("my-custom-element", MyCustomElement);
```

## 使用 Custom element

当定义和注册了 custom element 之后，就可以在页面上使用了。

```html
<my-custom-element></my-custom-element>
```
