# case...esac 判断

`case...esac`判断即编程语言中的 `switch...case`，只不过语法上有区别：

语法：

```bash
case 变量 in
变量内容1 )
  逻辑 ;;
变量内容2 )
  逻辑 ;;
*)
  逻辑 ;;
esac
```

使用：

```bash
#!/bin/bash

case "$1" in
"foo")
    echo foo
    ;;
"bar")
    echo bar
    ;;
*)
    echo other
    ;;
esac
```
