# 参数

## 参数默认值

定义函数的时候，可以为一个或多个参数定义默认值：

```py
def sum(a:int, b:int=4):
    return a+b

print(sum(1, 3)) # 4
print(sum(1)) # 5
```

参数的默认值仅执行一次，因此需要注意参数默认值为可变对象的场景：

```py
def f(a, L=[]):
    L.append(a)
    return L

print(f(1)) # [1]
print(f(2)) # [1, 2]
print(f(3)) # [1, 2, 3]
```
