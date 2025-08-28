# 指导原则

本篇介绍有利于写好 prompt 的原则及这些原则对应的技巧。

## 配置

代码推荐使用 jupyter notebook 运行。`openai` 使用的是 `1.x` 的版本；`python-dotenv` 使用的是 `1.x` 的版本。

```python
import os
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

api_key = os.getenv("API_KEY")
base_url = os.getenv("BASE_URL")
default_model = os.getenv("MODEL") or "gpt-3.5-turbo"

client = OpenAI(
    api_key=api_key, base_url=base_url
)

def get_completion(prompt: str, model=default_model):
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        stream=False,
    )
    return response.choices[0].message.content
```

## 原则一：编写清晰与具体的指令

清晰具体的提示词，能为大模型提供更明确的指导和上下文，从而生成更详细、更相关的输出。以下一些技巧可以让我们写出清晰具体的 prompt：

### 技巧一：使用分隔符

使用分隔符可以在复杂指令和要处理的文本之间建立清晰、无歧义的边界，能在一定程度防止 Prompt 注入（Prompt Injection），并大幅提升AI理解的准确性。

所谓的 Prompt 注入是指用户输入的内容意外地“欺骗”或“劫持”了你的原始指令，导致AI执行了非预期的操作。这类似于 SQL 注入或代码注入。如果你的指令和用户输入是直接拼接在一起的，AI 可能无法区分哪些是你给的指令，哪些是待处理的内容。









第一个技巧是使用分隔符来明确表示输入内容的不同部分。常见的分隔符可以使用：

- Triple quotes: `"""`
- Triple backticks: ` ``` `
- Triple dashed: `---`
- Angle brackets: `< >`
- XML tags: `<tag> </tag>`

下面给出一个使用分隔符的例子：

## 原则二：给模型留出思考的时间

给模型留出思考的时间，可以帮助它更好地理解问题并生成更准确的回答。以下是一些有助于实现这一原则的技巧：

### 技巧一：使用延迟

在发送请求之前，可以使用延迟来给模型留出思考的时间。例如，可以在请求之间添加短暂的等待时间，以便模型有时间处理上下文信息。

### 技巧二：分步提问

将复杂的问题分解为多个简单的问题，逐步引导模型思考。这不仅可以减轻模型的认知负担，还可以提高回答的准确性。
