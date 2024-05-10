# 创建库

一个函数有可能在多个脚本中都会使用到，这个时候如果每个脚本都重复写一遍函数，这就显得非常麻烦。这种情况可以通过创建库去解决。

库中的函数命名规范，可以参考 [Google 的库函数的命名规范](https://google.github.io/styleguide/shellguide.html#function-names) ：

```bash
mypackage::my_func() {
	...
}
```

而 shell 脚本引用库文件直接使用 `source`命令执行库文件即可：

```bash
source ./mypackage.sh

mypackage::my_func
```
