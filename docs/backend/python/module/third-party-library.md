# 第三方库

这篇文章将介绍与 Python 第三方库相关的工具，如 `pip` 和 `venv`。范围包括如何管理第三方库的安装、管理以及虚拟环境的创建和管理。

## 包管理工具 pip

在 Python 中，第三方库是由社区或公司开发并发布到 PyPI（Python Package Index）上的模块或包。它们极大地扩展了 Python 的功能，涵盖了如网络请求、数据分析、机器学习、Web 开发等各个领域。而要使用这些第三方库，通常需要借助 `pip` 这个包管理工具。pip 用于安装、升级和卸载第三方库。

安装第三方库：

```bash
python -m pip install requests
```

安装完成后，就可以像使用标准库一样导入和使用了：

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)
```

如果想安装指定版本的第三方库，可以在安装命令中指定版本号：

```bash
python -m pip install requests==2.6.0
```

升级第三方库到最新版本：

```bash
python -m pip install --upgrade requests
```

卸载第三方库：

```bash
python -m pip uninstall requests
```

## 虚拟环境

`pip` 默认将第三方库装在全局环境。在全局环境下，同一个包只能有一个版本，这会导致不同的项目之间的库版本有可能存在冲突，因为不同的项目可能需要不同版本的同一个库。而为了解决这个问题，则可以使用 Python 提供的虚拟环境。虚拟环境是一种用于隔离项目依赖的工具，它为每一个项目创建独立的库安装环境。

创建和管理虚拟环境使用的模块为 `venv`，执行下面的命令可创建一个虚拟环境：

```bash
python -m venv .venv
```

该命令会在当前目录创建一个名为 `.venv` 的目录，里面包含了 Python 解释器和标准库的副本。生成的 `site-packages` 目录用于存放安装的第三方库。

在使用虚拟环境之前，还需要对其进行激活。激活虚拟环境会改变更改当前 Shell 环境以及 shell 提示符，以便使用虚拟环境中的 Python 解释器和库。下面是在 Linux 和 Mac 上激活虚拟环境的命令：

```bash
source .venv/bin/activate  # Linux/Mac
```

如果需要停用虚拟环境，可以使用以下命令：

```bash
deactivate
```

## 参考资料

- [Virtual Environments and Packages](https://docs.python.org/3/tutorial/venv.html)
- [Installing Python Modules](https://docs.python.org/3/installing/index.html#installing-index)
