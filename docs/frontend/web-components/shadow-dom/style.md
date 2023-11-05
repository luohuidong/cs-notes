# 在 shadow DOM 中应用样式

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
