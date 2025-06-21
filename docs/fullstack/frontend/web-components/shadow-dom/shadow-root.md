# Element.shadowRoot 以及 "mode" 选项

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
