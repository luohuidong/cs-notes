# 关系

- [CS50’s Introduction to Databases with SQL - Relating Data](https://cs50.harvard.edu/sql/weeks/1/)

## ERD

- [Entity Relationship Diagram (ERD) Tutorial - Part 1](https://www.youtube.com/watch?v=xsg9BDiwiJE)
- [Entity Relationship Diagram (ERD) Tutorial - Part 2](https://www.youtube.com/watch?v=hktyW5Lp0Vo)

通过这两个视频，可以了解 Entity、Attribute、Relationship、Cardinality、Primary Key、Foreign Key、Bridge Table 这些概念，并且能够学会绘制 ERD 图。

## 子查询

在 SQL 中，子查询（Subquery）是指嵌套在另一个 SQL 语句内部的查询。外层查询通常称为主查询（Outer Query）。子查询的执行结果会被主查询使用，用来参与条件判断、数据计算或结果集构造。

```sql
SELECT title
FROM books
WHERE publisher_id = (SELECT id
                      FROM publishers
                      WHERE publisher = 'Fitzcarraldo Editions');
```

上面是一个典型的一对多关系的子查询例子。子查询先从 `publishers` 表中查找出出版社名称为 'Fitzcarraldo Editions' 的 `id`，然后主查询使用这个 `id` 去 `books` 表中查找所有对应的书籍标题。

### IN 关键字

IN 关键字用于判断某个值是否存在于一个给定的集合中。这个集合可以是常量列表，也可以是子查询返回的结果集。从语义上看，IN 是多个 = 条件的简化表达。

```sql
SELECT *
FROM users
WHERE id IN (1, 3, 5);
```

等价于：

```sql
SELECT *
FROM users
WHERE id = 1 OR id = 3 OR id = 5;
```

IN 常常与子查询结合使用：

```sql
SELECT *
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
);
```

上面的查询将返回所有在 `orders` 表中有订单记录的用户。

出了 IN 之外，还有 NOT IN，用于判断某个值不在给定的集合中：

```sql
SELECT *
FROM users
WHERE id NOT IN (
    SELECT user_id
    FROM orders
);
```

上面的查询将返回所有在 `orders` 表中没有订单记录的用户，即没下过单的用户。

### JOIN 关键字

JOIN 是 SQL 中用于组合两个或多个表中数据的关键字。它根据表之间的相关列来匹配行,是关系数据库查询中最重要的操作之一。

JOIN 的类型分为 INNER JOIN 跟 OUTER JOIN 两大类。OUTER JOIN 又分为 LEFT JOIN、RIGHT JOIN 和 FULL JOIN。

#### INNER JOIN

INNER JOIN 返回两个表中匹配的行。只有当两个表中的列满足连接条件时，才会包含在结果集中。

```sql
SELECT *
FROM table_a
INNER JOIN table_b ON table_a.id = table_b.id;
-- 或简写为 JOIN
```

#### LEFT JOIN

LEFT JOIN 返回左表中的所有行，即使右表中没有匹配的行。如果右表中没有匹配的行，则结果集中对应右表的列将包含 NULL 值。

```sql
SELECT *
FROM table_a
LEFT OUTER JOIN table_b ON table_a.id = table_b.id;
-- 或简写为 LEFT JOIN
```

#### RIGHT JOIN

RIGHT JOIN 返回右表中的所有行，即使左表中没有匹配的行。如果左表中没有匹配的行，则结果集中对应左表的列将包含 NULL 值。

```sql
SELECT *
FROM table_a
RIGHT OUTER JOIN table_b ON table_a.id = table_b.id;
-- 或简写为 RIGHT JOIN
```

#### FULL JOIN

FULL JOIN 返回两个表中的所有行。当某一表中没有匹配的行时，结果集中对应该表的列将包含 NULL 值。

```sql
SELECT *
FROM table_a
FULL OUTER JOIN table_b ON table_a.id = table_b.id;
-- 或简写为 FULL JOIN
```

## 集合

在关系数据库中，集合（Set）是指一组无序且不重复的元素。SQL 语言中的许多操作都是基于集合理论的，例如联合（UNION）、交集（INTERSECT）和差集（EXCEPT）。

- 列数一致: 参与合并的每个 SELECT 必须返回相同数量的列。
- 类型兼容: 对应列的数据类型必须可隐式或显式转换（DBMS 有具体强制规则）。
- 列名来源: 最终结果列名由第一个 SELECT 决定。
- NULL 处理: 用于去重时，NULL 在集合比较中通常被视为相等（即两个 NULL 会被当作重复项去重），但实现细节以各 DBMS 为准。
- 排序与限制: ORDER BY 和 LIMIT（或 FETCH）通常只能应用于整个集合操作的最终结果，要对中间结果排序或限制请把子查询包装为派生表。

### UNION

UNION 操作用于将两个或多个 SELECT 语句的结果集合并为一个结果集。它会自动去除重复的行。

```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```

### UNION ALL

UNION ALL 操作用于将两个或多个 SELECT 语句的结果集合并为一个结果集。它不会去除重复的行，速度通常比 UNION 更快。

```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

### INTERSECT

INTERSECT 操作用于返回两个 SELECT 语句的结果集中都存在的行。

```sql
SELECT column_name(s) FROM table1
INTERSECT
SELECT column_name(s) FROM table2;
```

### EXCEPT

EXCEPT 操作用于返回第一个 SELECT 语句的结果集中存在但第二个 SELECT 语句的结果集中不存在的行。

```sql
SELECT column_name(s) FROM table1
EXCEPT
SELECT column_name(s) FROM table2;
```

## 分组

### GROUP BY

`GROUP BY` 把行按一个或多个列/表达式分组，然后对每个组计算聚合值。

- **语法**: `SELECT <cols|expr>, <aggregate> FROM <table> GROUP BY <cols|expr>;`
- **常见聚合**: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `COUNT(DISTINCT ...)`, 数据库特有的 `STRING_AGG`/`GROUP_CONCAT`。
- **示例**:

```sql
SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal
FROM employees
GROUP BY department;
```

上面的 SQL 查询会按 `department` 列分组，计算每个部门的员工数量和平均工资。

聚合函数细节：

- **`COUNT(*)` 与 `COUNT(column)`**: `COUNT(*)` 计数所有行；`COUNT(column)` 忽略 `NULL` 值。
- **NULL 行为**: 聚合函数通常忽略 `NULL`（除非函数定义不同）。
- **表达式分组**: 可以对表达式分组，如 `GROUP BY DATE(created_at)` 或 `GROUP BY (year, month)`。

## HAVING

- **用途**: 在分组并计算聚合后过滤组；不能用 `WHERE` 做聚合结果过滤。
- **示例**:

```sql
SELECT department, COUNT(*) AS cnt
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;
```
