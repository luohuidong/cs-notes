# 第三方库

## 第三方库的安装与使用

在 Python 中，第三方库是由社区或公司开发并发布到 PyPI（Python Package Index）上的模块或包。它们极大地扩展了 Python 的功能，涵盖了如网络请求、数据分析、机器学习、Web 开发等各个领域。

第三方库通常使用 `pip` 工具来安装：

```bash
pip install requests
```

安装完成后，就可以像使用标准库一样导入和使用了：

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)
```

## 虚拟环境

`pip` 默认将第三方库装在全局环境。在全局环境下，同一个包只能有一个版本，这会导致不同的项目之间的库版本有可能存在冲突，因为不同的项目可能需要不同版本的同一个库。而为了解决这个问题，则可以使用 Python 提供的虚拟环境。

虚拟环境是一种用于隔离项目依赖的工具，它为每一个项目创建独立的库安装环境。创建和管理虚拟环境使用的模块为 `venv`，在运行 `venv` 创建虚拟环境时，会安装运行命令的 Python 版本。
