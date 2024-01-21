# 插件

- [aerial](https://github.com/stevearc/aerial.nvim)：代码大纲
- [barbecue](https://github.com/utilyre/barbecue.nvim)
- [bufferline](https://github.com/akinsho/bufferline.nvim)：顶部状态栏
- [comment](https://github.com/numToStr/Comment.nvim)：快捷注释
- [copilot](https://github.com/github/copilot.vim)
- [dashboard-nvim](https://github.com/nvimdev/dashboard-nvim)：nvim 启动页
- [formatter](https://github.com/mhartington/formatter.nvim)：格式化代码
- [gitsigns](https://github.com/lewis6991/gitsigns.nvim)
- [indent-blankline](https://github.com/lukas-reineke/indent-blankline.nvim)
- [lualine-lsp-progress](https://github.com/arkav/lualine-lsp-progress)
- [lualine](https://github.com/nvim-lualine/lualine.nvim)：状态栏
- [nvim-autopairs](https://github.com/windwp/nvim-autopairs)
- [nvim-cmp](https://github.com/hrsh7th/nvim-cmp)：LSP、formatter、Linter 管理
- [nvim-colorizer](https://github.com/norcalli/nvim-colorizer.lua)
- [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)
- [nvim-tree](https://github.com/nvim-tree/nvim-tree.lua)：文件目录
- [telescope](https://github.com/nvim-telescope/telescope.nvim)：搜索
- [toggleterm](https://github.com/akinsho/toggleterm.nvim)
- [tokyonight](https://github.com/norcalli/nvim-colorizer.lua)：主题
- [treesitter](https://github.com/nvim-treesitter/nvim-treesitter)
- [trouble](https://github.com/folke/trouble.nvim)
- [web-devicons](https://github.com/nvim-tree/nvim-web-devicons)
- [which-key](https://github.com/folke/which-key.nvim)：快捷键提示

## 主题

Neovim 本身是内置了一些主题配色的，可以通过 `:colorschema` 查看和选择。但是通过这种方式去配置的话，退出 Neovim 配置就丢失了。如果想让配置一直保持，就需要写入到配置文件中。假设想配置一个叫 blue 的主题，则可以在配置文件中添加 `vim.cmd('colorscheme blue')`。

在实际使用中，一般会使用功能更加强大的第三方的主题。Neovim 的第三方主题推荐使用 [Tokyo Night](https://github.com/folke/tokyonight.nvim) ，它是 GitHub 上 Star 数量比较多的一款主题。
