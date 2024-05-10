# break 和 continue

在 shell 编程中，`continue`和`break`是用于控制循环流程的关键字。

## break 语句

- `break`语句用于立即终止当前循环，并跳出循环体。它会使程序执行流程跳出最近的循环结构，并继续执行循环之后的代码。
- `break`语句通常与条件判断结合使用，以便在满足某些条件时提前终止循环。
- `break`语句只适用于循环结构（如`for`循环、`while`循环等）。

示例：

```bash
while true; do
    read -p "Enter a number (0 to exit): " num
    if (( num == 0 )); then
        break
    fi
    echo "Number entered: $num"
done
```

上述示例中，程序将循环要求用户输入一个数字，如果输入的数字为 0，则使用`break`语句终止循环，否则输出输入的数字。这样，当用户输入 0 时，程序将停止循环并退出。

通过使用`continue`和`break`语句，您可以更精确地控制循环的流程，根据条件跳过某些迭代或提前终止循环。这些关键字提供了更大的灵活性和控制能力，以满足不同的编程需求。

## continue 语句

- `continue`语句用于跳过当前循环中剩余的代码，并开始下一次循环迭代。它将忽略循环体中`continue`语句之后的所有代码，并直接进入下一次循环的判断条件。
- `continue`语句通常与条件判断结合使用，以便在满足某些条件时跳过当前迭代。
- `continue`语句只适用于循环结构（如`for`循环、`while`循环等）。

示例：

```bash
for (( i=1; i<=5; i++ )); do
    if (( i == 3 )); then
        continue
    fi
    echo $i
done
```

上述示例中，当`i`等于 3 时，`continue`语句将跳过该次循环迭代，不执行`echo $i`语句，直接进入下一次迭代。因此，输出将是 1、2、4、5。
