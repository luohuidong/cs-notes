# 变量声明、赋值与取消

变量分类：

- 全局变量
  - 全局环境变量
  - 全局自定义变量
- 局部变量
  - 局部环境变量
  - 局部自定义变量

按照惯例，使用小写定义自定义变量，使用大写来定义环境变量。局部变量仅针对当前 Shell，也就是说父 Shell 以及子 Shell 都无法读取当前 Shell 的自定义局部变量。而全局变量，它对整个 Shell 对话以及所有的子 Shell 都是生效的。

虽然不同的变量的作用范围不同，但是它们的声明、赋值以及取消的方式都是相同的。

## 变量声明

变量名的命名规则遵循以下规则：

- 变量名由字母、数字、下划线组成
- 变量名不能以数字开头

## 变量赋值

通过 `=`将变量值赋值给变量，需要注意的是 `=`两边是没有空格的：

```bash
#!/bin/bash

foo=Hello
bar=1
```

### 引号

如果变量值有特殊字符的话（如空格），需要使用 `"`或者 `'`将变量值包裹起来：

```bash
#!/bin/bash

foo="Hello world"

# 等价于
foo='Hello world'
```

上面的例子看似 `"`跟 `'`相同，但是实际上还是有区别的。在 `"`中，特殊字符（如`$`）能保持原来的特性。但是在 `'`中，特殊字符则仅作为一般字符：

```bash
#!/bin/bash

hello="Hello world!"

foo="${hello}"
echo ${foo} # 输出为： Hello world!

bar='${hello}'
echo ${bar} # 输出为：${hello}
```

### 赋值命令

命令也可以赋值给变量：

```bash
#!/bin/bash

foo=ls

${foo} # 等同于执行 ls
```

### 赋值命令输出

想将命令输出赋值给变量的话，可以使用 `$()`或者 ````：

```bash
#!/bin/bash

foo=$(ls)
echo ${foo}

# 等价于
foo=`ls`
ehco ${foo}
```

## 取消变量

取消变量使用 `unset`：

```bash
#!/bin/bash

hello="Hello world!"
echo ${hello} # 输出：Hello world!

unset hello
echo ${hello} # 输出空白
```
