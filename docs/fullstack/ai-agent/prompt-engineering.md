# Prompt Engineering

Prompt Engineering 是通过有技巧地设计和优化对 AI 的指令（即“提示词”或“prompt”），让 AI 更好地理解需求，以获得更符合预期、更高质量的输出结果。

## 为什么需要 Prompt Engineering？

目前 AI 已经具备了一定的语境的理解能力，但是在目前阶段，它并不能像人类那样充分地理解整个上下文，因此与 AI 对话的时候就需要更加明确地表达我们的问题，避免使用模糊或者有歧义的词语。

1. **AI模型的能力有限**

   大模型虽强大，但它们并不能“读心”。表达不清楚、描述不明确，AI理解和输出就会偏离你的需求。

1. **提升输出质量**

   精心设计的提示词能让AI输出更准确、更有创意、更符合你的意图。

1. **节省时间和成本**

   好的提示词减少反复沟通和修改，提升效率，尤其在实际工作中非常重要。

1. **应对复杂任务**

   有些任务需要多步推理、特定风格或格式，提示词工程可以拆解任务或约束AI的行为。

## 提示词工程的内容是什么？

提示词工程包括但不限于以下几个方面：

1. **明确需求**

   想清楚你要什么，让AI也“明白”你的需求，比如说明题材、风格、格式、语气、范围等。

2. **结构化提示词**

   学会用分点、分步骤、模板等方式组织提示词，让AI更好地“理解”你的指令。

3. **多轮对话与反馈**

   通过不断调整和补充提示词（比如“请再详细一点”、“请用表格展示”）和AI互动，优化输出结果。

4. **约束与限制**

   明确告诉AI哪些内容不能出现、输出要符合哪些规则等。

5. **利用上下文和示例**

   给AI提供背景信息、输入示例、输出示例等，让AI“模仿”你的需求。

6. **分解复杂任务**

   把大任务拆分成小任务，一步步引导AI完成。

## 提高 Prompt 质量

想要编写好的 Prompt，可以从以下几个方面考虑：

1. **Clear Instructions**

   要写出更清晰的 prompt，我们可以在 prompt 中写出更多的细节。为了获取最佳的结果，不要假设 AI 知道你在说什么。

   例如“写一首诗。”就是非常糟糕的 prompt，这种 prompt 没有提供足够的细节，就需要与 AI 进行更多的互动来澄清问题才能获取自己想要的答案，这是十分浪费时间的。如果 prompt 写成“帮我写一首关于夏天、树荫和蝉鸣的七言绝句，用李白的风格。”，由于 prompt 的内容更加具体，AI 输出的内容就会更加接近我们的期望。

2. **Adopt a persona**

   有时候让 AI 以特定角色或身份来回答问题，可以获得更符合预期的结果。例如给出下面的提示词，AI 能给出更具个性化的响应：

   Write a poem as Helena. Helena is 25 years old and an amazing writer. Her writing style is similar to famous 21st century poet Rupi Kaur. Writing as Helena, write a poem for her 18 years old sister to celebrate her sisters high school graduation. This will be read out to friends and family at the gathering.

3. **Specify the format**
4. **Avoid leading the answer**

   不要尝试引导 AI 给出特定的答案。相反，应该鼓励 AI 自由地探索和生成内容。

5. **Limit the scope**

   如果询问的内容是一个广泛的范围，应该考虑将其分解或者限制范围，这对获得更有针对性的答案很有帮助。

## zero-shot prompting and few-shot prompting

- **zero-shot prompting**：在这种情况下，AI 在没有任何示例的情况下生成响应。为了获得更好的结果，提示词需要非常清晰和具体。

- **few-shot prompting**：在这种情况下，AI 会根据提供的少量示例来生成响应。这些示例可以帮助 AI 理解期望的格式和内容，从而提高输出质量。

## Prompt 设计误区

- 缺乏具体性：指令模糊、不确定。
- 忽视细节：缺乏必要的细节，导致回答不完整或不准确。
- 缺乏上下文：缺乏背景信息或上下文。
- 期望过高：对 AI 的能力和理解力期望过高，导致不满。
- 忽略用户反馈：未能根据用户的反馈进行调整和优化。

## hallucination（幻觉）

## Vectors/Text Embeddings
