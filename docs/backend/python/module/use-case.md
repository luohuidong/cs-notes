# 使用场景

## 标准库的使用

Python 标准库是 Python 官方自带的一组模块和包，如 `os`、`sys`、`json`、`math` 等，标准库的包无需安装即可直接使用：

```python
import math

print(math.sqrt(16))  # 输出: 4.0
```

## 第三方包的使用

通过 `pip` 安装第三方包并使用：

```bash
pip install requests
```

示例：

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)
```

### 自定义包

开发者可以自己创建包并在项目中使用，甚至可以将其发布到 [PyPI](https://pypi.org/)。

### 发布和安装 Python 包

第一步：创建包：

使用工具如 `setuptools` 或 `poetry` 来定义包的元数据和依赖项。

第二步：打包和上传到 PyPI，使用 `twine` 将包上传到 PyPI：

```bash
python setup.py sdist
twine upload dist/*
```

第三步：安装包：

安装发布到 PyPI 的包：

```bash
pip install your-package-name
```

### **总结**

- **Python 包的核心作用**是组织代码、实现模块化和重用性。
- **使用方法**包括创建包结构、编写模块、初始化包、导入和使用包。
- **实际应用**包括内置包、第三方包和自定义包。
