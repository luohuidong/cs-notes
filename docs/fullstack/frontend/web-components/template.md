# Template

当需要重复使用相同的 HTML 结构时，可以使用 `<template>` 元素。`<template>` 元素中的内容不会渲染到 DOM 中，但可以通过 JavaScript 引用。template 的常用场景是与自定义元素搭配使用：

下面通过 `<template>` 定义一个 `<p>`：

```html
<template id="my-paragraph">
  <p>My paragraph</p>
</template>
```

将 `template` 中的内容插入到 shadown DOM 中：

```js
customElements.define(
  'my-paragraph',
  class extends HTMLElement {
    constructor() {
      super()
      let template = document.getElementById('my-paragraph')
      let templateContent = template.content

      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(templateContent.cloneNode(true))
    }
  }
)
```

## 样式定义

当想添加样式信息的时候，可以在 `<template>` 使用 `<style>` 元素：

```html
<template id="my-paragraph">
  <style>
    p {
      color: white;
      background-color: #666;
      padding: 5px;
    }
  </style>
  <p>My paragraph</p>
</template>
```

## slot

到目前为止，自定义元素的内容是固定的，如果想让 `<my-paragraph>` 元素可以像 `<p>` 元素一样可以展示自定义的内容，则可以使用 `<slot>` 元素。不同的 slot 通过 `name` 属性来区别。另外 slot 还可以定义占位符，当没有传入内容的时候，则展示占位符内容。

在 template 中定义 slot：

```html
<template id="my-paragraph">
  <p><slot name="my-text">My default text</slot></p>
</template>
```

使用自定义元素的时候通过 slot 定义内容：

```html
<my-paragraph>
  <span slot="my-text">My custom text</span>
</my-paragraph>
```

`<slot>` 是可以不定义 `name` 属性的，这样的 `<slot>` 会被自定义元素顶层没有 `slot` 属性的子节点填充。
