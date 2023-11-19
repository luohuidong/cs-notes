## 基本思路

选择排序的关键是找出当前循环范围中的“最小值”。

循环遍历数组找出当前范围内的最小值，将最小值放到当前范围的开头。随后缩小范围，重复前面的操作，直到数组完全有序为止。

## 选择排序过程

[选择排序动画](https://algorithm-visualizer.org/brute-force/selection-sort)

![选择排序.png](https://cdn.luohuidong.cn/clipboard_20231119_012142.png)

## 代码实现

```typescript
type CompareFunction<T> = (a: T, b: T) => number

function swap<T>(arr: T[], indexA: number, indexB: number) {
  const tmp = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = tmp
}

function sort<T>(arr: T[], compareFunc: CompareFunction<T>): T[] {
  const tmpArr = [...arr]

  for (let i = 0; i < tmpArr.length; i++) {
    let minIndex = i

    for (let j = i + 1; j < tmpArr.length; j++) {
      if (compareFunc(tmpArr[minIndex], tmpArr[j]) > 0) {
        minIndex = j
      }
    }

    swap(tmpArr, i, minIndex)
  }

  return tmpArr
}
```

## 时间复杂度

时间复杂度分析：$O(n^2)$
