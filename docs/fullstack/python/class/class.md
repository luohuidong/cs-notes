# 类

- 类属性
  - 类属性与实例属性的差别
- 继承
  - 单继承
  - 多继承

## 定义类

在 Python 中万物皆对象，而想要创建自定义对象，则需要使用 `class` 关键字定义类：

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")


person1 = Person("Alice", 30)
person1.greet()
```

## 实例方法

例子中定义了两个实例方法，分别是 `__init__` 和 `greet`。实例方法的第一个参数是 `self`，这个是固定的，表示类的实例对象，实例方法可以通过 `self` 参数访问类的属性和其他方法。`self` 是可以约定俗成的名称，可以使用别的名称，但是不推荐。在调用与实例相关的方法时，都会自动传入 `self` 参数，这个参数是不需要我们手动传递的。

`__init__` 是一个特殊的方法，该方法名字是固定的。它是类的构造方法，用于在创建类的实例时初始化对象的属性。`self` 之后的参数是初始化对象时需要传入的参数。当创建类的实例时，`__init__` 方法会自动被调用。`__init__` 方法不是必须的，如果不需要初始化属性，可以省略它。

## 实例属性

`__init__` 方法中定义了两个实例属性 `name` 和 `age`。实例属性并不是一定得在 `__init__` 方法中定义，也可以在其他实例方法中定义，但是为了代码的可读性和一致性，建议在 `__init__` 方法中定义所有需要的实例属性。

## 私有成员

在 Python 中，所有成员都是公开的，没有强制禁止外部访问的“私有成员”。不过，Python 提供了一些机制（如命名约定和名称改写）来实现一定程度的封装，但这些机制更多是为了提醒开发者，而不是强制限制。稍后将会介绍单下划线 `_` 和双下划线 `__` 这两种用来表示私有成员的命名约定。

Python 的设计哲学是“我们都成年人了”（We are all consenting adults here），更注重开发者之间的信任和约定，而不是强制限制。因此：

- 单下划线 `_` 和双下划线 `__` 是一种约定，用于提醒开发者哪些成员是内部实现的细节。
- 如果开发者执意要访问这些成员，Python 不会强制禁止。

### 单下划线

- 约定俗成：以单下划线 `_` 开头的成员被认为是“受保护的”（protected），表示它是内部实现的细节，开发者不应该直接访问。
- 技术上仍可访问：单下划线只是约定，没有任何强制限制。

```py
class Person:
    def __init__(self, name):
        self._name = name  # 受保护属性

person = Person("Alice")
print(person._name)  # 可以访问，但不推荐
```

### 双下划线

- 名称改写（Name Mangling）：以双下划线 `__` 开头的成员会触发名称改写，Python 会将其重命名为 `_类名__成员`名，从而增加访问的难度。
- 仍可通过改写后的名称访问：名称改写只是增加了访问的复杂性，但并没有完全禁止访问。

```py
class Person:
    def __init__(self, name):
        self.__name = name  # 名称改写

person = Person("Alice")
# print(person.__name)  # AttributeError: 'Person' object has no attribute '__name'
print(person._Person__name)  # 可以通过改写后的名称访问
```

## 类变量与类方法

类属性和类方法是与类本身相关的，而不是与类的实例相关的。类属性直接在类体顶部中定义，类方法使用 `@classmethod` 装饰器来定义：

```py
class Animal:
    species = "Dog"  # 类属性

    def __init__(self, name):
        self.name = name

    @classmethod
    def get_species(cls):
        return cls.species  # 访问类属性
```

类变量可以通过类名直接访问，也可以通过实例访问：

```py
print(Animal.get_species())  # Dog
animal = Animal("Foo")
print(animal.get_species())  # Dog
```

类属性它们在所有实例之间共享，所有实例都可以访问和修改他们：

```py
Animal.species = "Cat"
a1 = Animal("Foo")
a2 = Animal("Bar")
print(a1.get_species()) # Cat
print(a2.get_species()) # Cat
```

如果类变量与实例变量同名，实例变量会覆盖类变量：

```py
class Animal:
    species = "Dog"  # 类属性

    def __init__(self):
        self.species = "Cat"

print(Animal.species)  # 输出: Dog

a1 = Animal()
print(a1.species)  # 输出: Cat
```
