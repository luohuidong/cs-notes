# 使用 echo 输出内容

在 Shell 脚本中，会经常使用 `echo`来输出变量的值或者输出字符串：

```bash
#!/bin/bash

echo Hi, Ryan!

foo="Hello world"
echo ${foo}
```

在默认的情况下，无需使用引号将要输出的字符串包裹，但是如果字符串中包含引号，则可以利用单引号或者双引号将字符串进行包裹：

```bash
#!/bin/bash

echo 'Rich says "scriptting is easy".'
```
