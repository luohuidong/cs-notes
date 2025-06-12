# Python 概览

## Python 安装

在实际开发场景，我们可能需要切换不同的 Python 版本，使用 [pyenv](https://github.com/pyenv/pyenv) 可以轻松地安装和管理 Python 版本。

## 模块与包概览

模块是一个包含 Python 定义和语句的文件，而包则是包含多个模块的目录。对模块和包有一个快速的了解可以阅览 [Modules](https://docs.python.org/3/tutorial/modules.html) 文档。

项目中标准库以及自定义模块并不一定都能满足需求，因此需要使用第三方模块。第三方模块的安装、升级可以通过阅览 [Installing Python Modules](https://docs.python.org/3/installing/index.html#installing-index) 文档进行简单快速的。

`pip` 默认将第三方库装在全局环境。在全局环境下，同一个包只能有一个版本，这会导致不同的项目之间的库版本有可能存在冲突，因为不同的项目可能需要不同版本的同一个库。而使用虚拟环境，可以为每个项目创建独立的库安装环境。阅读 [venv](https://docs.python.org/3/tutorial/venv.html) 可快速了解虚拟环境的创建和使用。

有了前面的基础之后，可以阅读 [Python Packaging User Guide](https://packaging.python.org/en/latest/) 来详细了解 Python 库的安装、管理与分发。
