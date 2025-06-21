# 装饰器

装饰器很好用，而且本身并不复杂。

装饰器是一种用于修改函数或方法行为的高阶函数，它们允许你在不修改函数本身代码的情况下，添加额外的功能。装饰器通常用于日志记录、访问控制、性能测量等场景。

所谓的高阶函数满足以下至少一个条件：

1. 接受一个或多个函数作为参数。
2. 返回一个函数作为结果。

以下为装饰器的简单例子：

```py
import time

def my_decorator(func):
    def wrapper():
        start = time.time()
        func()
        stop = time.time()
        print(f"Execution time:  {(stop-start) * 1000:.3f} ms")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
```

## 使用 wraps() 装饰器保持函数元数据

从前面的例子可以看出，`say_hello` 函数经 `my_decorator` 装饰器包裹后，实际上调用的是 `wrapper` 函数。因此如果用户获取 `say_hello` 的名字的时候，会发现得到的名字是 `wrapper`。除了这个问题外，其它函数的额外属性也会出现这个问题，例如文档属性等等。

为了解决上述问题，需要使用 `@wraps` 装饰函数：

```py
import time
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper():
        start = time.time()
        func()
        stop = time.time()
        print(f"Execution time:  {(stop-start) * 1000:.3f} ms")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

print(say_hello.__name__)
```
