# while 循环与 until 循环

## while 循环

语法：

```bash
while [ condition ]

do
	命令
done
```

使用：

```bash
#!/bin/bash

while [ "${yn}" != "yes" -a "${yn}" != "YES" ]; do
    read -p "Please input yes/YES to stop this program: " yn
done
```

## util 循环

`until`循环与 `while`循环相反。当循环测试为假时，执行循环；为真时循环停止。

语法：

```bash
until [ condition ]
do
	命令
done
```

基本使用：

```bash
#!/bin/bash

until [ "${yn}" == "yes" -o "${yn}" == "YES" ]; do
    read -p "Please input yes/YES to stop this program: " yn
done
```
