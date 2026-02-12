# 第二章：SQL 基础查询

本章将介绍 SQL 查询的核心语法，帮助你掌握从数据库中检索数据的基本技能。我们将以"在线书店"为场景，学习如何使用 SELECT 语句获取所需数据，如何过滤、排序和统计数据。通过本章学习，你将能够独立完成大部分日常数据查询需求。

## 1. 准备示例数据

在学习查询之前，我们需要先创建一些示例数据。想象你正在为一个在线书店设计数据库，下面是书籍表（books）的结构和数据。

### 1.1 创建 books 表

```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY,      -- 书籍ID
    title TEXT NOT NULL,         -- 书名
    author TEXT NOT NULL,        -- 作者
    price REAL,                  -- 价格（元）
    year INTEGER,                -- 出版年份
    category TEXT,               -- 分类
    rating REAL,                 -- 评分（1-5）
    in_stock INTEGER             -- 库存数量
);
```

### 1.2 插入示例数据

```sql
INSERT INTO books (id, title, author, price, year, category, rating, in_stock) VALUES
(1, 'SQL编程入门', '张明', 59.00, 2023, '技术', 4.5, 120),
(2, 'Python数据分析', '李华', 89.00, 2022, '技术', 4.8, 85),
(3, '数据库设计艺术', '王伟', 79.00, 2021, '技术', 4.2, 45),
(4, '高效能程序员的修炼', '刘洋', 49.00, 2020, '技术', 4.0, 30),
(5, '平凡的世界', '路遥', 68.00, 2018, '文学', 4.9, 200),
(6, '活着', '余华', 35.00, 2017, '文学', 4.8, 150),
(7, '百年孤独', '马尔克斯', 55.00, 2019, '文学', 4.7, 80),
(8, '三体', '刘慈欣', 98.00, 2020, '科幻', 4.9, 100),
(9, '流浪地球', '刘慈欣', 45.00, 2019, '科幻', 4.6, 60),
(10, '人类简史', '赫拉利', 68.00, 2021, '历史', 4.5, 90),
(11, '明朝那些事儿', '当年明月', 128.00, 2020, '历史', 4.7, 70),
(12, '深度学习', 'Goodfellow', 168.00, 2022, '技术', 4.4, 25),
(13, '机器学习实战', '陈强', 99.00, 2023, '技术', NULL, 40),
(14, '红楼梦', '曹雪芹', 58.00, 2016, '文学', 4.9, 180),
(15, '经济学原理', '曼昆', 88.00, 2021, '经济', 4.3, 55),
(16, '投资学', '博迪', 128.00, 2020, '经济', 4.1, 35),
(17, '星际穿越', '基普·索恩', 52.00, 2015, '科幻', 4.5, 40),
(18, '时间简史', '霍金', 42.00, 2018, '科普', 4.6, 95);
```

> **📌 数据说明**
>
> 这 18 本书涵盖了多个分类、不同年份和价格区间，还有一些特殊数据（如第 13 本书的评分为 NULL），这将帮助我们在后续学习中体验各种查询场景。

## 2. 基础查询 SELECT

SELECT 是 SQL 中最常用的语句，用于从表中检索数据。它的基本结构是：**选择什么数据，从哪里选择**。

### 2.1 查询所有列

使用 `SELECT *` 可以获取表中的所有列：

```sql
SELECT *
FROM books;
```

这条语句会返回 books 表的所有行和所有列（id、title、author、price 等）。

### 2.2 查询指定列

如果只需要特定几列的数据，可以在 SELECT 后明确指定列名：

```sql
SELECT title, author, price
FROM books;
```

| title          | author | price |
| -------------- | ------ | ----- |
| SQL编程入门    | 张明   | 59.00 |
| Python数据分析 | 李华   | 89.00 |
| ...            | ...    | ...   |

> **📌 重点区分：SELECT \* vs SELECT 指定列**
>
> | 对比项     | SELECT \*              | SELECT 指定列        |
> | ---------- | ---------------------- | -------------------- |
> | **灵活性** | 自动包含所有列         | 只返回需要的列       |
> | **性能**   | 传输数据量大           | 传输数据量小，更高效 |
> | **可读性** | 不确定返回哪些列       | 代码意图清晰         |
> | **维护性** | 表结构变化可能影响程序 | 不受新增列影响       |
>
> **建议**：在实际开发中，尽量明确指定需要的列，而不是使用 `*`。这不仅能提高查询效率，还能让代码更易维护。

## 3. 限制结果 LIMIT

当表中有大量数据时，我们往往只需要查看部分数据。`LIMIT` 关键字可以限制返回的行数。

```sql
-- 只返回前 5 条记录
SELECT title, author, price
FROM books
LIMIT 5;
```

这在测试查询或查看数据样本时非常有用。比如在查看书籍列表时，先看一下前几条数据是否正确：

```sql
SELECT title, author, category
FROM books
LIMIT 3;
```

结果：

| title          | author | category |
| -------------- | ------ | -------- |
| SQL编程入门    | 张明   | 技术     |
| Python数据分析 | 李华   | 技术     |
| 数据库设计艺术 | 王伟   | 技术     |

## 4. 条件过滤 WHERE

WHERE 子句用于筛选满足特定条件的行。这是 SQL 查询中最强大的功能之一，让你能够精确获取需要的数据。

### 4.1 比较运算符

| 运算符 | 含义     | 示例                | 说明                   |
| ------ | -------- | ------------------- | ---------------------- |
| `=`    | 等于     | `category = '技术'` | 分类为技术的书籍       |
| `!=`   | 不等于   | `year != 2023`      | 出版年份不是 2023 的书 |
| `<>`   | 不等于   | `year <> 2023`      | 与 `!=` 效果相同       |
| `<`    | 小于     | `price < 50`        | 价格低于 50 元的书     |
| `>`    | 大于     | `rating > 4.5`      | 评分高于 4.5 的书      |
| `<=`   | 小于等于 | `in_stock <= 50`    | 库存不超过 50 的书     |
| `>=`   | 大于等于 | `year >= 2020`      | 2020 年及以后出版的书  |

**示例：查询技术类书籍**

```sql
SELECT title, author, price
FROM books
WHERE category = '技术';
```

**示例：查询价格低于 50 元的书籍**

```sql
SELECT title, author, price
FROM books
WHERE price < 50;
```

**示例：查询评分高于 4.5 的书籍**

```sql
SELECT title, rating
FROM books
WHERE rating > 4.5;
```

### 4.2 AND 和 OR 组合条件

当需要多个条件时，可以使用 `AND` 和 `OR` 进行组合。

**AND：所有条件都必须满足**

```sql
-- 查询技术类且价格低于 60 元的书籍
SELECT title, author, price, category
FROM books
WHERE category = '技术' AND price < 60;
```

结果：

| title              | author | price | category |
| ------------------ | ------ | ----- | -------- |
| SQL编程入门        | 张明   | 59.00 | 技术     |
| 高效能程序员的修炼 | 刘洋   | 49.00 | 技术     |

**OR：满足任一条件即可**

```sql
-- 查询文学类或科幻类的书籍
SELECT title, author, category
FROM books
WHERE category = '文学' OR category = '科幻';
```

**组合使用 AND 和 OR**

当同时使用 AND 和 OR 时，建议使用括号明确优先级：

```sql
-- 查询 2020 年后出版的、评分高于 4.5 的技术或科幻类书籍
SELECT title, author, year, category, rating
FROM books
WHERE year >= 2020
  AND (category = '技术' OR category = '科幻')
  AND rating > 4.5;
```

> **📌 声明式思维 vs 过程式思维**
>
> 在第一章中我们提到，SQL 是声明式语言。WHERE 子句很好地体现了这一点：
>
> - **声明式（SQL）**：你只需要描述"想要什么结果"（评分大于 4.5 的书籍）
> - **过程式（如 Python）**：你需要编写循环遍历每一行，用 if 语句判断是否满足条件
>
> DBMS 会帮你优化并执行查询，你不需要关心它是如何扫描数据的。

### 4.3 NULL 值处理

NULL 表示"没有值"或"未知值"。在 books 表中，第 13 本书（机器学习实战）的 rating 就是 NULL。

**注意**：不能用 `=` 或 `!=` 来判断 NULL，必须使用 `IS NULL` 或 `IS NOT NULL`。

```sql
-- 查询没有评分的书籍
SELECT title, author, rating
FROM books
WHERE rating IS NULL;
```

结果：

| title        | author | rating |
| ------------ | ------ | ------ |
| 机器学习实战 | 陈强   | NULL   |

```sql
-- 查询有评分的书籍
SELECT title, author, rating
FROM books
WHERE rating IS NOT NULL;
```

> **📌 常见错误**
>
> ```sql
> -- 错误！这样写不会返回任何结果
> WHERE rating = NULL
>
> -- 错误！这样也不会按预期工作
> WHERE rating != NULL
> ```
>
> NULL 表示"未知"，所以任何与 NULL 的比较结果都是 UNKNOWN，而不是 TRUE 或 FALSE。

## 5. 模糊搜索 LIKE

当我们只知道部分内容时（比如只记得书名包含"数据"两个字），可以使用 `LIKE` 进行模糊搜索。

### 5.1 % 通配符

`%` 表示任意数量的字符（包括零个字符）。

```sql
-- 查询书名以"SQL"开头的书籍
SELECT title, author
FROM books
WHERE title LIKE 'SQL%';
```

```sql
-- 查询书名包含"学习"的书籍
SELECT title, author
FROM books
WHERE title LIKE '%学习%';
```

结果：

| title        | author |
| ------------ | ------ |
| SQL编程入门  | 张明   |
| 机器学习实战 | 陈强   |

```sql
-- 查询书名以"记"结尾的书籍
SELECT title, author
FROM books
WHERE title LIKE '%记';
```

### 5.2 \_ 通配符

`_` 表示单个字符。

```sql
-- 查询书名以"_体"结尾的书（如"三体"）
SELECT title, author
FROM books
WHERE title LIKE '_体';
```

> **📌 通配符位置与性能**
>
> 通配符的位置会影响查询性能：
>
> - `'ABC%'` - 可以使用索引，性能好
> - `'%ABC'` - 无法使用索引，需要全表扫描
> - `'%ABC%'` - 无法使用索引，性能最差
>
> 在大数据量时，尽量避免以 `%` 开头的模糊查询。

## 6. 范围查询

### 6.1 BETWEEN ... AND

`BETWEEN` 用于查询在某个范围内的值，包含边界值。

```sql
-- 查询价格在 50 到 100 元之间的书籍（包含 50 和 100）
SELECT title, author, price
FROM books
WHERE price BETWEEN 50 AND 100;

-- 等价于
SELECT title, author, price
FROM books
WHERE price >= 50 AND price <= 100;
```

```sql
-- 查询 2020 到 2022 年间出版的书籍
SELECT title, author, year
FROM books
WHERE year BETWEEN 2020 AND 2022;
```

### 6.2 比较运算符组合

`BETWEEN` 只适用于连续范围。对于离散值或多个条件，仍需要使用比较运算符。

```sql
-- 查询库存少于 30 或大于 100 的书籍
SELECT title, in_stock
FROM books
WHERE in_stock < 30 OR in_stock > 100;
```

## 7. 结果排序 ORDER BY

使用 `ORDER BY` 对查询结果进行排序，默认是升序（ASC），可以使用 `DESC` 指定降序。

### 7.1 单列排序

```sql
-- 按价格从低到高排序（升序，默认）
SELECT title, price
FROM books
ORDER BY price;

-- 或者明确指定 ASC
SELECT title, price
FROM books
ORDER BY price ASC;
```

```sql
-- 按评分从高到低排序（降序）
SELECT title, rating
FROM books
WHERE rating IS NOT NULL
ORDER BY rating DESC;
```

### 7.2 多列排序

可以指定多个排序条件，先按第一列排序，第一列相同时再按第二列排序。

```sql
-- 先按分类升序，同一分类内按价格降序
SELECT title, category, price
FROM books
ORDER BY category ASC, price DESC;
```

### 7.3 结合 WHERE 和 ORDER BY

```sql
-- 查询技术类书籍，按评分降序排列
SELECT title, author, rating
FROM books
WHERE category = '技术' AND rating IS NOT NULL
ORDER BY rating DESC;
```

> **📌 排序的成本**
>
> 排序操作需要消耗计算资源。如果经常需要按某列排序，可以考虑在该列上创建**索引**，这将大大提高排序速度。

## 8. 聚合分析

聚合函数用于对一组数据进行统计计算，返回单个值。常见的聚合函数包括：

| 函数      | 作用       | 示例                 |
| --------- | ---------- | -------------------- |
| `COUNT()` | 计算行数   | 统计书籍总数         |
| `SUM()`   | 求和       | 计算所有书籍的总价格 |
| `AVG()`   | 计算平均值 | 计算平均评分         |
| `MAX()`   | 获取最大值 | 找出最高评分         |
| `MIN()`   | 获取最小值 | 找出最低价格         |

### 8.1 使用 AS 设置别名

在查询结果中，列名默认使用表中的字段名。使用 `AS` 关键字可以为列或表设置**别名（Alias）**，让结果更易读。

**为列设置别名：**

```sql
-- 使用 AS 为列设置别名
SELECT title AS 书名, author AS 作者, price AS 价格
FROM books
LIMIT 3;
```

结果：

| 书名           | 作者 | 价格 |
| -------------- | ---- | ---- |
| SQL编程入门    | 张明 | 59.0 |
| Python数据分析 | 李华 | 89.0 |
| 数据库设计艺术 | 王伟 | 79.0 |

**AS 可以省略：**

```sql
-- 省略 AS，效果相同
SELECT title 书名, author 作者
FROM books
LIMIT 3;
```

> **📌 使用建议**
>
> - 聚合函数的列名通常用 `AS` 赋予描述性名称（如 `total_books`、`average_price`）
> - 多表查询时，用 `AS` 为表设置短别名可以简化语句（如 `FROM books AS b`）
> - 别名中包含空格或特殊字符时，需要用引号包裹

### 8.2 COUNT() 计数

```sql
-- 统计书籍总数
SELECT COUNT(*) AS total_books
FROM books;
```

结果：

| total_books |
| ----------- |
| 18          |

```sql
-- 统计有评分的书籍数量
SELECT COUNT(rating) AS rated_books
FROM books;
```

> **注意**：`COUNT(*)` 统计所有行，`COUNT(列名)` 只统计该列非 NULL 的行。

```sql
-- 统计技术类书籍数量
SELECT COUNT(*) AS tech_books
FROM books
WHERE category = '技术';
```

### 8.3 SUM() 求和

```sql
-- 计算所有书籍的总库存
SELECT SUM(in_stock) AS total_stock
FROM books;
```

```sql
-- 计算技术类书籍的总价格
SELECT SUM(price) AS total_price
FROM books
WHERE category = '技术';
```

### 8.4 AVG() 平均值

```sql
-- 计算所有书籍的平均价格
SELECT AVG(price) AS average_price
FROM books;
```

```sql
-- 计算技术类书籍的平均评分
SELECT ROUND(AVG(rating), 2) AS avg_tech_rating
FROM books
WHERE category = '技术' AND rating IS NOT NULL;
```

> **注意**：`AVG()` 会自动忽略 NULL 值。

### 8.5 MAX() 和 MIN() 最值

```sql
-- 找出最高评分
SELECT MAX(rating) AS highest_rating
FROM books;
```

```sql
-- 找出最低价格和最高价格
SELECT MIN(price) AS lowest_price, MAX(price) AS highest_price
FROM books;
```

```sql
-- 找出最新出版的书籍年份
SELECT MAX(year) AS latest_year
FROM books;
```

> **📌 聚合函数与行级查询的区别**
>
> 普通的 SELECT 查询返回的是**行级数据**（每本书的信息），而聚合函数返回的是**汇总数据**（统计数据）：
>
> ```sql
> -- 行级查询：返回多行，每行一本书
> SELECT title, price FROM books;
>
> -- 聚合查询：返回一行，统计结果
> SELECT COUNT(*), AVG(price) FROM books;
> ```

## 9. 本章小结

### 核心概念回顾

| 概念/语法       | 一句话理解                          |
| --------------- | ----------------------------------- |
| **SELECT**      | 选择要查询的列                      |
| **FROM**        | 指定从哪个表查询                    |
| **WHERE**       | 过滤满足条件的行                    |
| **LIMIT**       | 限制返回的行数                      |
| **ORDER BY**    | 对结果进行排序（ASC/DESC）          |
| **LIKE**        | 模糊匹配（% 任意字符，\_ 单个字符） |
| **BETWEEN**     | 范围查询（包含边界）                |
| **NULL**        | 使用 IS NULL / IS NOT NULL 判断     |
| **AS**          | 设置别名，让结果更易读              |
| **COUNT()**     | 统计行数                            |
| **SUM()**       | 求和                                |
| **AVG()**       | 计算平均值                          |
| **MAX()/MIN()** | 获取最大/最小值                     |

### 查询语句的基本结构

```sql
SELECT 列名                    -- 选择什么
FROM 表名                      -- 从哪里来
WHERE 条件                     -- 过滤条件（可选）
ORDER BY 列名 [ASC|DESC]       -- 排序（可选）
LIMIT 数量;                    -- 限制数量（可选）
```

### 关键技能总结

1. **精确查询**：使用 WHERE + 比较运算符筛选特定数据
2. **模糊搜索**：使用 LIKE + 通配符进行不完全匹配
3. **范围查询**：使用 BETWEEN 或比较运算符组合
4. **结果排序**：使用 ORDER BY 整理数据展示顺序
5. **数据统计**：使用聚合函数进行汇总分析

### 学习路径预告
