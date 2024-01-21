# 队列

- 一种线性结构
- 一种先进先出的数据结构
- 相比数组，队列对应的操作是数组的子集
- 只能从一端（队尾）添加元素，只能从另外一端（队首）取出元素

数组队列接口如下：

```typescript
interface ArrayQueueInterface<T> {
  size: number
  isEmpty: boolean

  enqueue: (element: T) => void
  dequeue: () => T | undefined
  getFront: () => T | undefined
  clear: () => void
}
```

数组队列具体实现如下：

```typescript
class ArrayQueue<T> implements ArrayQueueInterface<T> {
  #queue: T[] = []

  get size(): number {
    return this.#queue.length
  }

  get isEmpty(): boolean {
    return this.#queue.length === 0
  }

  enqueue(element: T): void {
    this.#queue.push(element)
  }

  dequeue(): T | undefined {
    return this.#queue.shift()
  }

  getFront(): T | undefined {
    return this.#queue[0]
  }

  clear() {
    this.#queue = []
  }
}
```
