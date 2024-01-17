# test 命令

`test`命令用于条件判断。

假设想知道 `foo`文件是否存在，那么用 `test` 来实现就非常简单：

```bash
test -e foo.txt && echo "foo.txt exists" || echo "foo.txt does not exist"
```

除了做文件测试之外，`test`命令还可以做整数比较以及字符串比较，使用起来都是比较简单的，可以直接查阅文档 `man test`。

## test 简写形式

`test`命令的简化形式为 `[]`，这种形式常与 `if` 进行搭配使用。

将前面的例子以简化形式来进行编写：

```bash
[ -e foo.txt ] && echo "foo.txt exists" || echo "foo.txt does not exist"
```

使用中括号的时候有几点需要注意：

1. 中括号两端需要有空格符来分隔，否则运行会报错。
2. 中括号内的变量，需要使用双引号包裹
