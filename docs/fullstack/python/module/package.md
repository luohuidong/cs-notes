# 包

包是一个包含多个模块的或者子包的目录，包有几个作用：

1. 组织代码：包可以将相关的模块组合在一起，使项目结构更清晰。例如，一个大型项目可以包含多个子包，每个子包对应不同的功能模块。
2. 命名空间管理：包通过创建独立的命名空间，避免了模块之间的名称冲突。
3. 代码复用：通过封装功能模块到包中，可以方便地在不同项目中复用这些代码。
4. 易于分发和安装：通过工具（如 pip 和 setuptools），开发者可以将包发布到 PyPI（Python Package Index），供他人下载和使用。

## 包的结构

常见的包结构如下：

```plain text
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...my_package/
```

包含 `__init__.py` 文件的目录，Python 会将其视为一个包。`__init__.py` 文件可以是空的，也可以包含初始化代码。

## 导入包的内容

导入包的内容本质上是导入包中模块的内容，因此导入包的内容可以使用 `import` 或者 `from ... import ...` 的形式。

如果直接 `import sound`，实际上是导入了 `sound/__init__.py` 文件中定义的内容。如果我们想导入子包 `formats` 的 `wavread` 模块，则可以写成 `import sound.formats.wavread`，这样就可以使用 `wavread` 模块中的函数和类了。

如果觉得 `import sound.formats.wavread` 太长，可以使用 `from ... import ...` 语句来简化，`from sound.formats import wavread`。

## 包内引用

包内引用是指在同一个包（或子包）内部，不同模块之间相互导入和使用。包内引用有两种常见方式：绝对导入和相对导入。

### 绝对导入

绝对导入是推荐方式，尤其适合大型项目。它以项目的顶层包为起点，明确指定完整的包路径。

写法：

```py
from 包名.模块名 import 对象
import 包名.模块名
```

- “包名”是顶层包的名称，不是磁盘路径。
- 解释器会从 sys.path（通常包含项目根目录）查找包和模块。

示例结构：

```plaintext
myproject/
    __init__.py
    main.py
    utils/
        __init__.py
        helper.py
```

示例代码：

```py
# 在 main.py 中
from utils.helper import some_function
```

### 相对导入

相对导入是指从当前模块出发，使用点（`.`）表示当前包或父包，进行模块导入。

写法：

```py
from .模块名 import 对象      # 当前包
from ..子包.模块名 import 对象 # 父包
```

这里以前面 sound 包结构展示相对导入的示例：

```py
# 在 sound/formats/wavread.py 中
from .aiffread import read_aiff
from ..effects.echo import add_echo
```

只能用于包内模块之间的导入，且不能在顶层脚本直接运行（否则会报错）。
