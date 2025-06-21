# custom element 生命周期回调

Custom element 包含几个生命周期回调：

- `connectedCallback()`：每当元素被添加到文档的时候被调用。
- `disconnectedCallback()`：每当元素从文档中移除的时候被调用。
- `adoptedCallback()`：每当元素被移动到新的文档的时候被调用。
- `attributeChangedCallback()`：每当元素的一个属性被增加、移除或者更改的时候被调用。

下面是 custom element 包含生命周期回调的最小实现：

```ts
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
```
