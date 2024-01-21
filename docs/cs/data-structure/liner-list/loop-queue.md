# 循环队列

普通队列中出队的操作时间复杂度为 `O(n)`，因为每出队一个元素，都需要将其他所有的元素往前挪动。假设数组中有 100 万个元素，则每次出队都需要进行 100 万次的操作，这种时间花费是比较大的。

而使用循环队列，则可以解决普通队列出队操作时间复杂对为 `O(n)`的问题。

循环队列接口：

```typescript
interface LoopQueueInterface<T> {
  size: number
  isEmpty: boolean
  capacity: number

  enqueue: (element: T) => void
  dequeue: () => T | undefined
  getFront: () => T | undefined
  clear: () => void
}
```

循环队列具体实现：

```typescript
class LoopQueue<T> implements LoopQueueInterface<T> {
  #data: T[]
  #front: number
  #tail: number
  #size: number
  #initialCapacity: number

  constructor(capacity: number = 10) {
    this.#data = new Array(capacity)
    this.#front = 0
    this.#tail = 0
    this.#size = 0
    this.#initialCapacity = capacity
  }

  get isEmpty() {
    return this.#size === 0
  }

  get capacity() {
    return this.#data.length
  }

  get size() {
    return this.#size
  }

  #resize(newCapacity: number) {
    const newData = new Array(newCapacity)

    for (let i = 0; i < this.#size; i++) {
      newData[i] = this.#data[(i + this.#front) % this.#data.length]
    }

    this.#front = 0
    this.#tail = this.#size

    this.#data = newData
  }

  enqueue(element: T) {
    if (this.#size === this.capacity) {
      this.#resize(this.capacity * 2)
    }

    this.#data[this.#tail] = element
    this.#tail = (this.#tail + 1) % this.#data.length
    this.#size++
  }

  dequeue() {
    if (this.isEmpty) {
      return undefined
    }

    const result = this.#data[this.#front]
    this.#front = (this.#front + 1) % this.#data.length
    this.#size--

    if (this.#size === Math.floor(this.capacity / 4) && Math.floor(this.capacity / 2) !== 0) {
      this.#resize(this.capacity / 2)
    }

    return result
  }

  getFront() {
    if (this.isEmpty) {
      return undefined
    }

    return this.#data[this.#front]
  }

  clear() {
    this.#data = new Array(this.#initialCapacity)
    this.#front = 0
    this.#tail = 0
    this.#size = 0
  }
}
```

## 使用 Deque 实现

[Deque](https://www.yuque.com/luohuidong/voczso/szcuwr) 内部其实也是使用 LoopQueue 实现，Deque 的接口会比 LoopQueue 丰富一些。

```typescript
class LoopQueue<T> implements LoopQueueInterface<T> {
  deque: Deque<T>

  constructor(capacity: number = 10) {
    this.deque = new Deque({
      capacity,
      autoShrink: true,
    })
  }

  get isEmpty() {
    return this.deque.isEmpty
  }

  get capacity() {
    return this.deque.capacity
  }

  get size() {
    return this.deque.size
  }

  enqueue(element: T) {
    this.deque.addLast(element)
  }

  dequeue() {
    return this.deque.removeFirst()
  }

  getFront() {
    return this.deque.peekFirst()
  }

  clear() {
    this.deque.clear()
  }
}
```
