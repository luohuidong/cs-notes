# neovim 下载与配置

环境：wsl ubuntu

## 下载

在 ubuntu 环境下使用 apt 安装的 neovim 版本较老，为了体验最新的 neovim 版本，直接在 neovim GitHub 项目的 release 页面下载最新的 `nvim.appimage` 文件。

例如我们将文件下载到当前用户 home 目录的 tools 目录下：

```bash
cd ~/tools
wget https://github.com/neovim/neovim/releases/download/stable/nvim.appimage
```

随后执行以下命令来执行 neovim：

```bash
chmod u+x nvim.appimage && ./nvim.appimage
```

如果系统没有 [FUSE](https://github.com/AppImage/AppImageKit/wiki/FUSE)，例如 windows 的 wsl 环境下，会展示以下错误：

```bash
dlopen(): error loading libfuse.so.2

AppImages require FUSE to run.
You might still be able to extract the contents of this AppImage
if you run it with the --appimage-extract option.
See https://github.com/AppImage/AppImageKit/wiki/FUSE
for more information
```

这时候就需要解压 `nvim.appimage` 文件了：

```bash
./nvim.appimage --appimage-extract
```

然后执行下面的命令就可以执行 neovim 了：

```bash
./squashfs-root/usr/bin/nvim
```

## 命令配置

在这个时候，是没法像 `vim` 那样直接在命令行中输入 `nvim` 来启动 neovim 的，那么需要执行以下操作：

1. 执行 `ln -s nvim.appimage nvim` 来创建软链接
2. 将 `export PATH=$HOME/tools:$PATH` 添加到 `~/.bashrc` 中
3. 执行 `source ~/.bashrc` 来使配置生效

如果是解压了 `nvim.appimage`，则执行下面的操作：

1. 将 `export PATH=$HOME/tools/squashfs-root/usr/bin:$PATH` 添加到 `~/.bashrc` 中
2. 执行 `source ~/.bashrc` 来使配置生效

这时候就能直接在命令行中通过输入 `nvim` 来启动 neovim 了。

另外还可以通过设置别名的方式来启动 neovim：

```bash
alias v='nvim'
```

## 字体设置

在使用 Neovim 的时候，会发现有些字体乱码，原因是很多插件会使用字体图标。这时候就需要给系统安装 Nerd fonts 字体，Nerd fonts 将各种常见的 iconic fonts 打包到常用的字体里，这样在命令行里就支持显示这些图标了。

下载 Nerd fonts 可以在 https://www.nerdfonts.com 这个网站下载。字体安装完毕之后，在终端工具中选择 Nerd fonts 字体即可展示正常。
