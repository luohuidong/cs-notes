# 创建 custom element

创建 custom element 是 Web components 一个关键的功能。custom element 跟我们常用内建标签（如 `<div>`、`<span>`）都是 HTML 元素，只不过 custom element 的行为由开发者自己定义。

custom element 的定义通过类来实现，这个类继承自 `HTMLElement` 或者内建的 HTML 元素。如果 custom element 继承自 `HTMLElement`，则元素的所有功能都需要开发者重新实现。下面的例子展示了一个继承自 `HTMLElement` 的 custom element 的定义：

```ts
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
  }

  // 在此处编写自定义元素的功能
}
```

在 class 的 constructor 中，我们可以设置初始化状态以及默认值，注册事件监听器，创建 shadow DOM 等。但需要注意的是，在 constructor 中不能访问元素的属性以及子元素，因为在实例化的时候，custom element 还没有添加到文档中。
