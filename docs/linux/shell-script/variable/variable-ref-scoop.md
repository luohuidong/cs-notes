# 自定义变量的引用与作用范围

## 变量引用

变量的引用方式为`${变量名}`，前面变量赋值举的例子其实就已经大量使用变量的引用了。想查看变量值的话，使用 `echo ${变量名}`进行查看：

```bash
#!/bin/bash

hello="Hello world!"
echo ${hello}
```

变量引用 `${变量名}`在部分情况下可以省略为 `$变量名`：

```bash
#!/bin/bash

hello="Hello world!"
echo $hello
```

个人推荐是直接使用 `${变量名}`这种方式即可，这样能省去很多麻烦，例如我们想将 `hello`这个变量与 `123`进行拼接，这种情况使用缩写就会有问题：

```bash
#!/bin/bash

hello="Hello world!"

# 这里会认为是引用 hello123 这个变量，实际上我们期望的效果是输出 Hello world!123
echo $hello123
```

如果使用 `${变量名}`就不会存在这种问题：

```bash
#!/bin/bash

hello="Hello world!"
echo ${hello}123
```

## 变量作用范围

变量的作用范围分为全局以及局部。全局环境变量它作用的范围就是当前 Shell 对话以及所有的子 Shell。而用户自定义局部变量以及局部环境变量则仅针对当前 Shell，父 Shell 以及子 Shell 都无法读取。

如果想要子进程能够读取到父进程定义的变量，则可以在父进程中使用 `export`导出变量。通过 `export`导出的变量，对所有的子 Shell 都是可见的。终端执行下面的命令可以进行验证 `export`对变量作用范围的影响：

```shell
hello="Hello world!"

bash
echo $hello # 输出为空
exit

export hello
echo $hello # 输出 "Hello world!"
exit
```

需要注意的是，子 Shell 对变量的操作不会影响父 Shell，如 unset 全局变量。

使用 `export`的时候，可以将设置变量和导出变量放在一个命令里完成：

```shell
export hello="Hello world!"
```
