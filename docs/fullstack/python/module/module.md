# 模块

模块可以是标准库的一部分、自定义模块或者第三方模块。这里仅介绍自定义模块的创建和使用，因为理解了自定义模块的使用就理解了标准库跟第三方模块的使用。

创建自定义模块非常简单，只需要将相关代码写入 `.py` 文件中即可，模块可以包含可执行语句、变量、函数和类等，声明的内容默认都是公开的。如：

```py
# math_utils.py

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
```

在其它文件中可以通过 `import` 语句导入该模块：

```py
# main.py

import math_utils

result1 = math_utils.add(5, 3)
result2 = math_utils.subtract(10, 4)

print(f"Addition: {result1}")  # 输出: Addition: 8
print(f"Subtraction: {result2}")  # 输出: Subtraction: 6
```

## import 语句

前面给出了使用 `import` 的简单示例，但是 `import` 语句还有很多其他的用法。

### 导入特定内容

当我们想导入模块中声明的特定内容，可以使用 `from ... import ...` 语句：

```py
from math_utils import add
```

### 使用别名

使用 `as` 关键字可以为导入的内容指定别名。给模块指定别名：

```py
import math_utils as mu
result = mu.add(5, 3)
```

给导入的特定内容指定别名：

```py
from math_utils import add as a
result = a(5, 3)
```

### 导入模块所有内容

使用 `from ... import *` 可以导入模块中所有的内容，但不推荐使用这种方式，因为可能会导致命名冲突：

```py
from math_utils import *
result1 = add(5, 3)
result2 = subtract(10, 4)
```

### 延迟导入

在模块中导入其他模块时，通常会在文件的开头进行导入，这样可以避免循环导入的问题。但是在某些情况下，我们可能需要在函数内部进行导入，以避免不必要的依赖关系：

```py
# my_module.py
def my_function():
    import math_utils
    result = math_utils.add(5, 3)
    print(f"Result: {result}")
```

在这种情况下，`math_utils` 模块只会在 `my_function` 被调用时才会被导入，这样可以减少模块之间的依赖关系。

## import 路径

## 模块注意点

- 模块名使用小写字母，多个单词之间使用下划线分隔。
- 模块名避免与 Python 内置模块同名。
- 模块中的内容，只会在模块首次导入的时候执行。

## 参考资料

- [Python Modules](https://docs.python.org/3/tutorial/modules.html)
