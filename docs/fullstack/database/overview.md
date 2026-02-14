# 概览

## 前言

本教程旨在为初学者提供一条清晰、系统的数据库与 SQL 学习路径。在开始之前，有以下几点需要说明：

### 关于示例数据库

教程中**绝大部分章节的示例和演示均使用 SQLite**。选择 SQLite 的原因如下：

- **零配置**：无需安装复杂的服务器软件，开箱即用
- **单文件存储**：整个数据库存储在一个文件中，便于学习和分享
- **广泛支持**：被内置于 Python、PHP 等主流编程语言中
- **标准兼容**：支持标准 SQL 的大部分语法，所学知识可迁移至其他数据库

当然，我们也会适时介绍 MySQL 和 PostgreSQL 等服务器型数据库的特点，帮助你了解在不同场景下如何选择合适的数据库。

### 关于内容组织

本教程的内容以 **CS50's Introduction to Databases with SQL**（哈佛 CS50 数据库课程）的内容为大纲进行展开。我们借鉴了该课程循序渐进的教学结构，但进行了以下调整：

- 增加了更多的中文示例和解释
- 补充了实际开发中的最佳实践
- 扩展了性能优化和安全防护的实战内容

如果你对原版课程感兴趣，可以在资料部分找到相关链接。

## 内容大纲

### 1. 数据库基础 (Lecture 0: Querying)

- **什么是数据库**：用于交互、存储和管理信息的工具。
  - **优点**：相比电子表格，数据库在规模（Scale）、更新能力（Update Capacity）和查询速度（Speed）上更具优势。
  - **DBMS**：数据库管理系统（如 SQLite, MySQL, PostgreSQL）是与数据库交互的界面或语言。
- **SQL (Structured Query Language)**：用于执行 CRUD（创建、读取、更新、删除）操作的结构化查询语言。
- **基础查询语句**：
  - `SELECT`：从表中选择列。
  - `LIMIT`：限制输出行数。
  - `WHERE`：基于条件过滤行。
  - `ORDER BY`：排序结果（`ASC` 升序, `DESC` 降序）。
  - **模糊匹配 (`LIKE`)**：`%` 匹配任意字符，`_` 匹配单个字符。
  - **聚合函数**：`COUNT`, `AVG`, `MIN`, `MAX`, `SUM`。

### 2. 关系设计 (Lecture 1: Relating)

- **关系型数据库**：通过表与表之间的关系组织数据。
- **实体关系 (ER) 模型**：
  - **实体**：即数据库中的表。
  - **关系类型**：一对一、一对多、多对多。
  - **乌鸦脚符号 (Crow’s Foot Notation)**：用于表示数量关系（0, 1, 或多）。
- **键 (Keys)**：
  - **主键 (Primary Key)**：每行的唯一标识符。
  - **外键 (Foreign Key)**：引用另一个表主键的列，用于建立联系。
- **高级查询**：
  - **连接 (`JOIN`)**：组合多个表。包括 `INNER JOIN`（默认）、`LEFT JOIN`、`RIGHT JOIN` 和 `FULL JOIN`。
  - **子查询 (Subqueries)**：嵌套在另一个查询中的查询。
  - **集合操作**：`INTERSECT`（交集）、`UNION`（并集）、`EXCEPT`（差集）。
  - **分组 (`GROUP BY`)**：结合聚合函数对数据进行分类统计，`HAVING` 用于过滤分组后的结果。

### 3. 设计与规范化 (Lecture 2: Designing)

- **规范化 (Normalizing)**：通过拆分实体到各自的表中来消除冗余的过程。
- **存储类别 (SQLite)**：`NULL`, `INTEGER`, `REAL`, `TEXT`, `BLOB`。
- **类型亲和性 (Type Affinities)**：SQLite 列会尝试将输入转换为其倾向的类型。
- **约束 (Constraints)**：
  - **表级约束**：`PRIMARY KEY`, `FOREIGN KEY`。
  - **列级约束**：`CHECK`, `DEFAULT`, `NOT NULL`, `UNIQUE`。
- **修改表**：使用 `ALTER TABLE` 重命名表、增删列。

### 4. 数据操作 (Lecture 3: Writing)

- **插入数据**：`INSERT INTO ... VALUES`。支持从 CSV 文件直接导入。
- **删除数据**：`DELETE FROM`。
  - **级联删除 (`ON DELETE CASCADE`)**：删除主表记录时自动删除关联的外键记录。
- **更新数据**：`UPDATE ... SET ... WHERE`。
- **触发器 (Triggers)**：在执行 `INSERT`, `UPDATE` 或 `DELETE` 时自动运行的 SQL 语句。
- **软删除 (Soft Deletion)**：通过增加 `deleted` 列标记数据而非真正物理删除。

### 5. 视图与安全 (Lecture 4: Viewing)

- **视图 (Views)**：由查询定义的虚拟表。
  - **作用**：简化查询、聚合数据、数据分区、增强安全（隐藏敏感列）。
- **公用表表达式 (CTE)**：仅存在于单个查询持续时间内的临时视图。

### 6. 性能优化 (Lecture 5: Optimizing)

- **索引 (Index)**：使用 B-Tree（平衡树）结构加速检索。
  - **权衡**：提高查询速度，但会增加存储空间并减慢插入速度。
  - **覆盖索引 (Covering Index)**：索引包含查询所需的所有信息，无需回表。
- **事务 (Transactions)**：遵循 **ACID** 属性（原子性、一致性、隔离性、持久性）。
- **锁机制 (Locks)**：`UNLOCKED`, `SHARED`（读取时）, `EXCLUSIVE`（写入时）。

### 7. 扩展与安全 (Lecture 6: Scaling)

- **数据库服务器**：MySQL 和 PostgreSQL。相比嵌入式的 SQLite，它们支持更高规模和并发。
- **扩展方式**：
  - **垂直扩展**：提升单台服务器硬件性能。
  - **水平扩展**：通过**复制 (Replication)**或**分片 (Sharding)**分布负载。
- **安全防御**：
  - **访问控制**：使用 `GRANT` 分配特定权限。
  - **SQL 注入攻击**：通过**预处理语句 (Prepared Statements)**进行转义，防止恶意代码注入。

## 资料

- [CS50’s Introduction to Databases with SQL](https://cs50.harvard.edu/sql/)：哈佛 CS50 课程，非常好的数据库与SQL入门的课程。习网站还整理好课程的 slide，还有根据课程内容整理的 note，非常适合复习。
- 《SQL 必知必会》：通俗易懂的 SQL 入门书籍，适合初学者。
- 《数据库系统概念》：经典的数据库教材，内容全面，适合深入学习数据库系统原理。
- [CS 4320 (and 5320): Introduction to Database Systems](https://www.cs.cornell.edu/courses/cs4320/2020fa/)
