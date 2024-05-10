# shell 脚本预定义变量

```bash
#!/bin/bash

echo 当前脚本名称：$0

echo 第一个位置参数：$1
echo 第二个位置参数：$2
echo 第三个位置参数：$3

echo 位置参数个数：$#
echo 所有位置参数：$@
```

输出结果：

```
当前脚本名称：./params.sh
第一个位置参数：opt1
第二个位置参数：opt2
第三个位置参数：opt3
位置参数个数：3
所有位置参数：opt1 opt2 opt3
```

另外 `$?`可用于查看前一个 shell 进程是否正常退出。当值为 `0` 的额时候，表示正常退出：

```bash
#!/bin/bash

echo 随便输出一点内容
echo $?

echa # 这里故意输错 echo 命令的名称
echo $?
```

输出结果：

```
随便输出一点内容
0
./foo.sh: line 6: echa: command not found
127
```

在编写 shell 脚本的时候，我们可以搭配 `exit`命令以及 `$?`预定义变量来实现某些判断逻辑，`exit 0`程序正常退出。如果在脚本中某些逻辑没有按照预期去运行的话，可以执行 `exit`+自定义的数字，如 `exit 20`。
