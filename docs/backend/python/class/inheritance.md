# 继承

## 使用继承

一个类继承另一个类时，子类会自动获得父类的所有属性和方法。下面给出的是一个继承的简单例子：

```py
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclasses must implement this method")

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

dog = Dog("Buddy")
print(cat.speak())  # 输出: Kitty says Meow!
```

子类可以重写父类的方法，也可以添加新的属性和方法，也可以通过 `super()` 函数调用父类的方法：

```py
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # 调用父类的构造函数
        self.breed = breed

    def speak(self):
        parent_speak = super().speak()  # 调用父类的方法
        return f"{parent_speak}, but {self.name} ({self.breed}) says Woof!"

    def run(self):
        return f"{self.name} is running!"


dog = Dog("Buddy", "Golden Retriever")
print(dog.speak())  # 输出: Buddy makes a sound, but Buddy (Golden Retriever) says Woof!
print(dog.run())    # 输出: Buddy is running!
```

## 多继承

多继承是指一个类可以同时继承多个父类，从而获得多个父类的属性和方法。Python 支持多继承，但需要谨慎使用。

```py
class Parent1:
    def method1(self):
        return "Method from Parent1"

class Parent2:
    def method2(self):
        return "Method from Parent2"

class Child(Parent1, Parent2):
    pass

child = Child()
print(child.method1())  # 输出: Method from Parent1
print(child.method2())  # 输出: Method from Parent2
```

当一个类从两个父类继承，而这两个父类又继承自同一个基类时，会出现菱形结构，这种结构可能导致方法或属性的调用顺序混乱，如：

```py
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):  # D 同时继承 B 和 C
    pass

d = D()
print(d.method())  # 输出: ?
```

菱形继承产生的具体问题：

1. 方法解析冲突：
   - 如果 B 和 C 都重写了 A 的方法，D 不知道应该调用哪个父类的方法。
   - 例如，上述例子中，d.method() 是调用 B.method() 还是 C.method()？
2. 代码维护困难：
   - 菱形继承会导致类之间的关系复杂化，增加代码的可读性和维护难度。
3. 重复调用问题：
   - 如果基类 A 的方法被 B 和 C 调用，而 D 又调用了 B 和 C 的方法，可能会导致 A 的方法被重复调用。

Python 使用 C3 线性化算法（Method Resolution Order, MRO）来解决菱形继承问题。MRO 确定了方法的调用顺序，确保每个类的方法只被调用一次，并且遵循从左到右的继承顺序。这可以通过 `ClassName.mro()` 或 `help(ClassName)` 查看 MRO：

```py
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):
    pass

print(D.mro())  # 输出: [<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>]
```
