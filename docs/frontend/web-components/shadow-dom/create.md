# 创建 shadow DOM

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
