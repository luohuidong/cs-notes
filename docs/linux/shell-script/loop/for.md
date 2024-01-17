# for 循环

## 基本使用

语法：

```bash
for 参数 in 列表
do
	执行命令
done
```

使用场景：

```bash
#!/bin/bash

for var in dog cat elephant; do
    echo "There are ${var}s..."
done

```

输出结果：

```
There are dogs...
There are cats...
There are elephants...
```

如果想将命令的结果当作列表进行处理，则可以使用反引号或者 `$()`方式来执行命令：

```bash
#!/bin/bash

for var in $(ls tmp); do
    echo "File: ${var}"
done
```

或者：

```bash
#!/bin/bash

for var in $(ls tmp); do
    echo "File: ${var}"
done

```

输出结果：

```
File: 1.txt
File: 2.txt
File: 3.txt
File: 4.txt
```

## for 循环的另外一种写法

除了前面一种写法外，for 循环还有另外一种写法，语法如下：

```bash
#!/bin/bash

for ((变量初始化; 循环判断条件; 变量变化))
do
	循环执行的命令
done
```

使用场景：

```bash
#!/bin/bash

for ((i = 1; i < 5; i++)); do
    echo number: $i
done

```

输出结果：

```
number: 1
number: 2
number: 3
number: 4
```
