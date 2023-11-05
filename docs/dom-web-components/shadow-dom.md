# Shadow DOM

custom element 一个重要的作用就是封装可复用的逻辑，为了让这些封装的逻辑能够不受页面运行的 JavaScript 和 CSS 代码的影响，就需要借助 shadow DOM。shadow DOM 可以避免页面的 JavaScript 和 CSS 影响到 shadow DOM 中的内容。

shadow DOM 涉及 shadow host、shadow tree、shadow boundary、shadow root 这几个概念，通过下面的图片来理清它们之间的关系：

![shadow dom](https://cdn.luohuidong.cn/clipboard_20231029_125707.png)

- Shadow host：作为 shadow DOM 所依附的常规 DOM 节点
- Shadow tree：指 shadow DOM 中的 DOM tree
- Shadow boundary：指常规节点的开始到 shadow DOM 结束的范围
- Shadow root：shadow tree 的根节点

shadow DOM 可以将一个 DOM tree（即图中的 shadow tree）依附到一个元素上，shadow DOM 对于页面正在运行的 JavaScript 和 CSS 是不可见的，这种特性可以确保 shadow DOM 之外运行的 JavaScript 和 CSS 不会影响到 shadow DOM 中的内容。同样 shadow DOM 中的代码也不会影响到 shadow DOM 之外的内容。

## 创建 shadow DOM

假设页面包含两个元素：

```html
<div id="host"></div>
<span>I'm not in the shadow DOM.</span>
```

如果要将 `<div>` 元素作为 shadow host，则需要对 `<div>` 元素调用 `attachShadow()` 方法来创建 shaddow DOM。当创建了 shadow DOM 之后，就可以像操作常规 DOM 一样去操作 shadow DOM 中的内容了：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="host"></div>
    <span>I'm not in the shadow DOM</span>

    <script>
      const host = document.querySelector("#host");
      const shadow = host.attachShadow({ mode: "open" });
      const span = document.createElement("span");
      span.textContent = "I'm in the shadow DOM";
      shadow.appendChild(span);
    </script>
  </body>
</html>
```

## JavaScript 和 CSS 的隔离

前面提到，使用 shadow DOM 可以避免页面中的 JavaScript 和 CSS 影响 shadow DOM 中的内容。

下面将举一个 shadow DOM 与页面 JavaScript 隔离的例子。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="host"></div>
    <span>I'm not in the shadow DOM</span>
    <br />

    <button id="upper" type="button">Uppercase span elements</button>
    <button id="reload" type="button">Reload</button>

    <script>
      // 往 shadow DOM 中添加一个 span 元素
      const host = document.querySelector("#host");
      const shadow = host.attachShadow({ mode: "open" });
      const span = document.createElement("span");
      span.textContent = "I'm in the shadow DOM";
      shadow.appendChild(span);

      const upper = document.querySelector("button#upper");
      // 获取页面中所有的 span 元素，并将它们的内容转换为大写
      upper.addEventListener("click", () => {
        const spans = Array.from(document.querySelectorAll("span"));
        for (const span of spans) {
          span.textContent = span.textContent.toUpperCase();
        }
      });

      // 重新加载页面，还原页面内容
      const reload = document.querySelector("#reload");
      reload.addEventListener("click", () => document.location.reload());
    </script>
  </body>
</html>
```

运行例子，点击“Uppercase span elements”按钮，将执行查找页面上的所有 `<span>` 元素，并且将文案内容转换成大写。但我们会看见，转换成大写的逻辑对 shaodow DOM 中的 span 标签的内容并不生效，就像是 shadow DOM 中的元素对页面的 JavaScript 不可见一样。这就是所谓的 shadow DOM 与 页面的 JavaScrip 隔离。

下面将给出一个 shadow DOM 与页面 CSS 隔离的简单例子。执行例子，可以看到页面的 CSS 样式并没有对 shadow DOM 中 `<span>` 产生任何影响：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      span {
        color: blue;
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <div id="host"></div>
    <span>I'm not in the shadow DOM</span>

    <script>
      const host = document.querySelector("#host");
      const shadow = host.attachShadow({ mode: "open" });
      const span = document.createElement("span");
      span.textContent = "I'm in the shadow DOM";
      shadow.appendChild(span);
    </script>
  </body>
</html>
```

## Element.shadowRoot 以及 "mode" 选项

前面我们提到，shadow DOM 与页面的 JavaScript 是隔离的，但不是页面的 JavaScript 就没有办法去访问 shadow DOM。前面所有例子，在创建 shadow DOM 的时候，都会调用 `attachShadow({ mode: "open" })`，将 `mode` 属性设置为 `open` 这个很关键，它能使页面的 JavaScript 通过 `Element.shadowRoot` 的方式来访问 shadow DOM。举个例子：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      span {
        color: blue;
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <div id="host"></div>
    <span>I'm not in the shadow DOM</span>
    <br />

    <button id="upper" type="button">Uppercase shadow DOM span elements</button>
    <button id="reload" type="button">Reload</button>

    <script>
      // 创建 shadow DOM
      const host = document.querySelector("#host");
      const shadow = host.attachShadow({ mode: "open" });
      const span = document.createElement("span");
      span.textContent = "I'm in the shadow DOM";
      shadow.appendChild(span);

      // 获取 shadow DOM 中的 span 元素，并将它们的内容转换为大写
      const upper = document.querySelector("button#upper");
      upper.addEventListener("click", () => {
        const spans = Array.from(host.shadowRoot.querySelectorAll("span"));
        for (const span of spans) {
          span.textContent = span.textContent.toUpperCase();
        }
      });

      // 重新加载页面，还原页面内容
      const reload = document.querySelector("#reload");
      reload.addEventListener("click", () => document.location.reload());
    </script>
  </body>
</html>
```

上面的例子中，通过读取 shadow host 元素的 `shadowRoot`来获取 shadow DOM，并且对 shadow DOM 中的 `<span>` 元素的文字进行大写转换。因此如果想打破 shadow DOM 与页面的隔离行，则可以通过配置 `{ mode: "open" }` 来实现。

`mode` 属性还有一个值，即 `closed`，它是默认值。如果将 `mode` 属性设置为 `closed`，则页面的 JavaScript 就无法通过 `Element.shadowRoot` 来访问 shadow DOM，当读取 `Element.shadowRoot` 的时候，会返回 `null`。

## 在 shadow DOM 中应用样式

有两种方式可以给 shadow DOM 应用样式：

1. 通过构造 `CSSStyleSheet` 对象然后将其附加到 shadow DOM 中。
1. 在 `<template>` 元素声明中添加 `<style>` 元素。

通过这两种方式定义的样式，同样不会影响到页面的样式。

### 使用 CSSStyleSheet 的方式

通过 CSSStyleSheet 的方式给 shadow DOM 添加样式，分三步：

1. 创建 `CSSStyleSheet` 对象。
1. 通过 `CSSStyleSheet.replace()` 或者 `CSSStyleSheet.replaceSync()` 设置 `CSSStyleSheet` 对象的样式。
1. 通过 `ShadowRoot.adoptedStyleSheets` 将 `CSSStyleSheet` 对象附加到 shadow DOM 中。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static</title>
  </head>
  <body>
    <div id="host"></div>
    <span>I'm not in the shadow DOM</span>

    <script>
      const sheet = new CSSStyleSheet();
      sheet.replaceSync("span { color: red; border: 2px dotted black;}");

      const host = document.querySelector("#host");

      const shadow = host.attachShadow({ mode: "open" });
      shadow.adoptedStyleSheets = [sheet];

      const span = document.createElement("span");
      span.textContent = "I'm in the shadow DOM";
      shadow.appendChild(span);
    </script>
  </body>
</html>
```

### 在 `<template>` 元素声明中添加 `<style>` 元素

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static</title>
  </head>
  <body>
    <template id="my-element">
      <style>
        span {
          color: red;
          border: 2px dotted black;
        }
      </style>
      <span>I'm in the shadow DOM</span>
    </template>

    <div id="host"></div>
    <span>I'm not in the shadow DOM</span>

    <script>
      const host = document.querySelector("#host");
      const shadow = host.attachShadow({ mode: "open" });
      const template = document.getElementById("my-element");

      shadow.appendChild(template.content);
    </script>
  </body>
</html>
```
