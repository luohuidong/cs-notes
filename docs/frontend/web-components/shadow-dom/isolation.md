# JavaScript 和 CSS 的隔离

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
