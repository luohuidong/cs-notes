# 输入法

环境：Ubuntu 24.04

输入法推荐使用 [RIME](https://rime.im/)，官方的 linux 版本是基于 IBus 输入法架构的。

设置如下：

1. 在 Settings-System-Manage Input Methods 中将输入法切换为 IBus 并添加中文语言的支持。
1. 命令行中执行 `sudo apt-get install ibus-rime` 安装 RIME 输入法。
1. 注销当前用户并重新登录，然后在 Keyboard-Input Sources 中添加 RIME 输入法。

RIME 与 ctrl+\` 这个快捷键与 vscode 的快捷键冲突，可以执行`sudo vim /usr/share/rime-data/default.yaml`，将 switcher-hotkeys 下的 Control+grave 删除。删除完毕之后，注销并重新登录。
