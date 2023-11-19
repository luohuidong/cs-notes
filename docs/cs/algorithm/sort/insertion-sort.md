## 基本思路

插入排序关键是要找出当前元素在前面序列中的正确位置。前提是当前元素前面的序列是有序的，这样才能从后往前找到当前元素的正确位置。

## 过程

[插入排序动画](https://algorithm-visualizer.org/brute-force/insertion-sort)

![插入排序.png](https://cdn.luohuidong.cn/clipboard_20231119_014140.png)

## 实现

```typescript
type CompareFunction<T> = (a: T, b: T) => number

function swap<T>(arr: T[], indexA: number, indexB: number) {
  const tmp = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = tmp
}

function sort<T>(arr: T[], compareFunc: CompareFunction<T>): T[] {
  const tmpArr = [...arr]

  for (let i = 1; i < tmpArr.length; i++) {
    for (let j = i; j - 1 >= 0; j--) {
      if (compareFunc(tmpArr[j - 1], tmpArr[j]) > 0) {
        swap(tmpArr, j - 1, j)
      } else {
        break
      }
    }
  }

  return tmpArr
}
```

## 时间复杂度

时间复杂度分析：$O(n^2)$
