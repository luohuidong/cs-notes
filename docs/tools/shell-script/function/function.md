# 自定义函数

bash shell 会将函数当作小型脚本来对待，它的基本语法：

```bash
function function_name {
	commands
}

# 或者

function_name () {
   commands
}
```

commands 是组成函数的一个或多个 bash shell 命令。在调用函数的时候，bash shell 会一次执行函数内的命令。

例子：

```bash
#!/bin/sh

# 函数定义
hello () {
   echo "Hello World"
}

# 函数调用
hello
```

需要注意，函数调用需要在函数被定义之后去调用，否则会报错。

## 向函数传递参数

由于 bash shell 会将函数当作小型脚本来对待，这意味着我们可以像普通脚本那样向函数传递参数：

```bash
#!/bin/sh

# 函数定义
hello() {
    local full_name="$1 $2"
    echo "Hello, $full_name!"
}

# 函数调用
hello "Ryan" "Luo"
```

在函数体中，`$1`读取第一个函数参数，`$2`读取第二个函数参数，如此类推。

## 返回值

Bash Shell 把函数视为一个小型脚本，运行结束时退出状态码是函数中最后一个命令返回的退出状态码，可以通过 `$?`来确定函数的退出状态码。也正是函数退出状态码仅反应最后一个命令，因此是没法确定其他命令是否执行成功。鉴于使用函数的默认退出状态码是一种危险的做法，因此我们可以借助 `return`命令来指定函数的退出状态码，注意状态码必须介于 0~255：

```bash
#!/bin/sh

# 函数定义
foo() {
    return 0
}
# 函数调用
foo
# $? 获取函数返回值之前切忌执行别的命令，否则函数的返回值会丢失
echo $?
```

## 使用函数输出

命令的输出可以保存到 shell 变量中，同样函数的输出也可以保存到 shell 变量中：

```bash
#!/bin/bash

foo() {
    echo 'a'
}

bar=$(foo)
echo $bar # 输出 'a'
```

需要注意的是函数中执行的命令的标准输出以及标准错误输出，是不会包含到变量中的。

## 函数嵌套

```bash
#!/bin/sh

# 函数定义
foo() {
    echo "Hello, world!"
}

bar() {
    foo
}

# 函数调用
bar
```

## 局部变量

默认情况下，在脚本中声明变量为该脚本的全局变量。但是在函数内部是可以使用 `local`来声明局部变量的，通过 `local`声明的局部变量并不会影响到外部，下面通过两个例子来了解通过 `local`声明变量的作用范围：

```bash
#!/bin/bash

foo() {
    hello="Hello world!"
}

foo
echo $hello # 输出 "Hello world!"
```

```bash
#!/bin/bash

foo() {
    local hello="Hello world!"
}

foo
echo $hello # 输出为空
```
