# 栈

- 栈是一种线性结构
- 相比数组，栈对应的操作是数组的子集
- 只能从一端添加元素，也只能从一端取出元素。这一端成为栈顶。

栈一般有如下方法：

```typescript
interface Stack<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
  isEmpty(): boolean
  getSize(): number
}
```

## 使用数组的方式实现栈

```typescript
class ArrayStack<T> implements Stack<T> {
  #arr: T[] = []

  push(item: T): void {
    this.#arr.push(item)
  }

  pop(): T | undefined {
    return this.#arr.pop()
  }

  peek(): T | undefined {
    return this.#arr[this.#arr.length - 1]
  }

  isEmpty() {
    return this.#arr.length === 0
  }

  getSize() {
    return this.#arr.length
  }
}
```
