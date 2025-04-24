# 模块

Python 模块是一个包含 Python 代码的文件，通常以 .py 结尾。模块可以包含变量、函数、类以及可执行代码。通过模块，我们可以将代码组织成逻辑单元，方便复用和维护。

为什么需要模块？

1. 代码复用：将常用的功能封装到模块中，其他程序可以直接导入使用，避免重复编写代码。
1. 提高可维护性：将代码分成多个模块，每个模块负责特定的功能，便于管理和调试。
1. 命名空间隔离：模块提供独立的命名空间，避免变量和函数名冲突。

在两个模块在相同目录下时，可以直接使用 `import` 语句导入模块。模块名即为文件名（不包含 .py 后缀）：

::: code-group

```py [main.py]
import math_utils

result1 = math_utils.add(5, 3)
result2 = math_utils.subtract(10, 4)

print(f"Addition: {result1}")  # 输出: Addition: 8
print(f"Subtraction: {result2}")  # 输出: Subtraction: 6
```

```py [math_utils.py]
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
```

:::
