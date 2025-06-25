# Server-Sent Events

在仅需要服务端向客户端推送数据的场景中，[Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) 是一个非常合适的选择。

SSE 的实现比 WebSocket 更简单，原因如下：

1. 基于 HTTP 协议。不需要建立新的协议栈，服务端和客户端都可以使用已有的 HTTP 库实现。
2. 单向通信。SSE 只负责服务端向客户端推送消息，客户端无法主动发送消息给服务端，所以协议和实现逻辑较为简单。
3. 内置自动重连机制。如果连接中断，浏览器会自动尝试重新连接，开发者无需手动编写重连逻辑。

但 SSE 仅能传输文本数据，且不支持二进制数据传输。如果需要双向通信或传输二进制数据，WebSocket 可能是更好的选择。

快速了解 SSE 的使用可以查阅 [Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)，根据这篇文章的内容，使用 node 作为后端弄一个简单的 SSE 例子：

::: code-group

```html [index.html]
<!doctype html>
<html>
  <body>
    <h1>SSE Demo</h1>
    <div id="messages"></div>
    <script>
      const evtSource = new EventSource('/events')
      evtSource.onmessage = function (event) {
        const div = document.getElementById('messages')
        div.innerHTML += `<p>${event.data}</p>`
      }
    </script>
  </body>
</html>
```

```javascript [server.js]
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

http
  .createServer((req, res) => {
    if (req.url === '/events') {
      console.log('Client connected to SSE endpoint')
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      })
      let count = 0
      const interval = setInterval(() => {
        res.write(`data: Message ${++count}\n\n`)
        if (count >= 5) {
          clearInterval(interval)
          res.end()
        }
      }, 1000)
    } else if (req.url === '/' || req.url === '/index.html') {
      const filePath = path.join(__dirname, 'index.html')
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500)
          res.end('Error loading index.html')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    } else {
      res.writeHead(404)
      res.end('Not found')
    }
  })
  .listen(3000, () => {
    console.log('SSE server running at http://localhost:3000')
  })
```

:::
