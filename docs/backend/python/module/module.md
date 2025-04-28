# 模块

- 模块的名称为文件名（不包含 .py 后缀）
- 模块中所有的内容都是默认公开的
- 模块的导入使用 `import` 语句导入
  - 模块的导入可以使用 `from ... import ...` 语句导入模块中的特定对象
  - 模块的导入可以使用 `import ... as ...` 语句导入模块并重命名
  - 模块的导入可以使用 `from ... import *` 语句导入模块中的所有对象（不推荐使用）

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

## 参考资料

- [Python Modules](https://docs.python.org/3/tutorial/modules.html)
