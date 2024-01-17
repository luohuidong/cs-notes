# 主题配置

Neovim 本身是内置了一些主题配色的，可以通过 `:colorschema` 查看和选择。但是通过这种方式去配置的话，退出 Neovim 配置就丢失了。如果想让配置一直保持，就需要写入到配置文件中。假设想配置一个叫 blue 的主题，则可以在配置文件中添加 `vim.cmd('colorscheme blue')`。

在实际使用中，一般会使用功能更加强大的第三方的主题。Neovim 的第三方主题推荐使用 [Tokyo Night](https://github.com/folke/tokyonight.nvim) ，它是 GitHub 上 Star 数量比较多的一款主题。
