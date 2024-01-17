# 插件管理

lazy.nvim 是一个 Neovim 插件管理器，可以非常便捷地管理插件的安装、升级以及卸载。

lazy.nvim 的安装比较简单，只需要在 `init.lua` 中添加以下内容即可：

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)
```

上面的代码主要做了三件事：

1. 定义了 lazy.nvim 插件的路径
2. 检查 lazy.nvim 是否已经安装，如果没有安装则执行 `git clone` 命令来安装
3. 将 lazy.nvim 插件的路径添加到 `runtimepath` 中，这样 Neovim 在查找文件时会首先查找 lazy.nvim 插件的路径，确保能够正确找到插件的相关文件。

随后插件的管理就可以通过下面的代码进行配置：

```lua
require("lazy").set(plugins, optis)
```
