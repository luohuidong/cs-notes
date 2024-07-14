# 冒泡排序

## 基本思路

冒泡排序从第一个元素开始，重复比较相邻的两个项，如果前一项比后一项大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。

## 排序过程

[冒泡排序的动画展示](https://algorithm-visualizer.org/brute-force/bubble-sort)

![冒泡排序.png](https://cdn.luohuidong.cn/bubble-sort.jpg)

## 代码实现

```typescript
type CompareFunction<T> = (a: T, b: T) => number

function swap<T>(arr: T[], indexA: number, indexB: number) {
  const tmp = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = tmp
}

export function bubbleSort<T>(arr: T[], compareFunc: CompareFunction<T>) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (compareFunc(arr[j], arr[j + 1])) swap(arr, j, j + 1)
    }
  }
  return arr
}
```

## 时间复杂度

时间复杂度： $O(n^2)$
