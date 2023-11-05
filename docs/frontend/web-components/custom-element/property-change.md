# 响应属性变化

与内建元素类似，自定义元素能够使用 HTML 属性来控制元素的行为。为了更有效地利用 HTML 属性，需要自定义元素有能够响应 HTML 属性变化的能力，而要实现这个能力，则需要在 custom element 中声明静态属性 `observedAttributes` 以及实现生命周期回调 `attributeChangedCallback()`。

`attributeChangedCallback` 的值为数组，包含所有需要监听变化的属性名。而 `attributeChangedCallback` 生命周期回调接受参数，第一个参数位属性名，第二个参数为属性变化前的值，第三个参数位属性变化后的值。

下面是实现相应属性变化的简单例子：

```ts
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["size"];

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
```
