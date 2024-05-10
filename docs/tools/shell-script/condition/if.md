# if 判断

语法：

```bash
if [ 测试条件成立 ] 或 命令返回值是否为 0
then
	执行命令
else
	执行命令
fi
```

使用：

```bash
#!/bin/bash

if [ -e foo.txt ]; then
    echo "foo.txt exists"
else
    echo "foo.txt does not exist"
fi
```

## if-elif-else

```bash
#!/bin/bash

if [ -d foo ]; then
    echo "foo is a directory"
elif [ -f foo ]; then
    echo "foo is a file"
else
    echo "foo does not exist"
fi
```

## 单括号与双括号的区别（写作中）

`[]`与`[[]]`
