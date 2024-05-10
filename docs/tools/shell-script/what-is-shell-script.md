# 认识 Shell 脚本

有时候我们需要通过 Shell 去实现某个功能，需要将一条条的命令组合起来。为了更便捷地复用这些命令的组合，这个时候就需要借助 Shell 脚本文件来保存需要执行的命令。

## Shell 脚本包含的基本要素

下面给出一个简单的 Shell 脚本，通过该脚本来解释 Shell 脚本所包含的基本要素：

```bash
#!/bin/bash

# Shell脚本使用curl命令获取指定URL的内容

# 要获取内容的URL
URL="https://example.com"

# 使用curl命令发送GET请求并将响应保存到文件
curl \
  --header "Content-Type: application/json" \
  --user-agent "My User Agent" \
  --request GET \
  --data '{"param1": "value1", "param2": "value2"}' \
  --output output.txt \
  "$URL"
```

### Sha-Bang

第一行 `#!/bin/bash`叫 Sha-Bang。Sha-Bang 是位于可执行脚本文件第一行的特殊注释，它的格式通常为 `#!interpreter`，其中 `interpreter` 是解释器的路径或命令。例子中 `#!/bin/bash` 告诉系统，用 Bash 解释器来执行该脚本文件。

### 注释

除了 Sha-Bang，其它以 `#`开头的均为注释。

### 命令

Shell 脚本主要部分就是我们所写的命令，如前面例子所写的 curl 命令。当命令过长的时候，可以使用 `\`来进行换行。

## Shell 脚本执行权限

要执行 Shell 脚本，需要给赋予该文件执行权限。之所以只关注执行权限而不关注读权限，因为文件创建的时候就默认赋予了读权限。赋予文件可执行权限，执行 `chmod +x finame` 即可。
