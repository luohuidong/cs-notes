# 查询

- [CS50’s Introduction to Databases with SQL - Querying](https://cs50.harvard.edu/sql/weeks/0/)

## SELECT 关键字

获取 longlist 表的所有数据：

```sql
SELECT *
FROM longlist;
```

使用 `SELECT *` ，获取的数据将返回所有字段，如果想返回指定字段可以在 `SELECT` 关键字后指定列：

```sql
SELECT title, author
FROM longlist;
```

## LIMIT 关键字

如果表中数据量很大，那么返回所有行意义不大，可以使用 `LIMIT` 关键字限制返回的行数：

```sql
SELECT title, author
FROM longlist
LIMIT 10;
```

上面的查询将只返回前 10 行数据。

## WHERE 关键字

使用 `WHERE` 关键字可以选择满足特定条件的行：

```sql
SELECT title, author
FROM longlist
WHERE year = 2023
LIMIT 10;
```

```sql
SELECT title, format
FROM longlist
WHERE format != 'hardcover'
LIMIT 10;
```

`<>` 同样表示“不等于”，因此上面的 sql 等价于：

```sql
SELECT title, format
FROM longlist
WHERE format <> 'hardcover'
LIMIT 10;
```

### AND 和 OR 关键字

可以使用 `AND` 和 `OR` 关键字组合多个条件：

```sql
SELECT title, author, year
FROM longlist
WHERE year >= 2020 AND format = 'paperback'
LIMIT 10;
```

```sql
SELECT title, author, year
FROM longlist
WHERE format = 'paperback' OR format = 'hardcover'
LIMIT 10;
```

```sql
SELECT title, format
FROM longlist
WHERE (format = 'paperback' OR format = 'hardcover') AND year >= 2020
LIMIT 10;
```

## NULL 关键字

在 Table 中，某个字段可能没有值，这种情况下该字段的值为 `NULL` 。可以使用 `IS NULL` 和 `IS NOT NULL` 来判断某个字段是否为 `NULL`：

```sql
SELECT title, author, translator
FROM longlist
WHERE translator IS NULL
LIMIT 10;
```

```sql
SELECT title, author, translator
FROM longlist
WHERE translator IS NOT NULL
LIMIT 10;
```

## LIKE 关键字

使用 LIKE 关键字可进行模糊查询，通常与通配符 `%` 和 `_` 一起使用：

- `%` 表示任意数量的字符（包括零个字符）
- `_` 表示单个字符

查找所有以 "The" 开头的书名：

```sql
SELECT title
FROM longlist
WHERE title LIKE 'The%'
LIMIT 10;
```

查找所有包含 "Guide" 的书名：

```sql
SELECT title
FROM longlist
WHERE title LIKE '%Guide%'
LIMIT 10;
```

查找所有以 "Story" 结尾的书名：

```sql
SELECT title
FROM longlist
WHERE title LIKE '%Story'
LIMIT 10;
```

查找所有以 "A" 开头，后面跟着任意单个字符，然后是 "e" 结尾的书名：

```sql
SELECT title
FROM longlist
WHERE title LIKE 'A_e'
LIMIT 10;
```

## 范围查询

使用 `<`、`<=`、`>`、`>=` 可以进行范围查询：

```sql
SELECT title, year
FROM longlist
WHERE year >= 2020 AND year <= 2023
LIMIT 10;
```

也可以使用 `BETWEEN` 关键字实现同样的功能：

```sql
SELECT title, year
FROM longlist
WHERE year BETWEEN 2020 AND 2023
LIMIT 10;
```

## 排序

使用 `ORDER BY` 关键字可以对查询结果进行排序，默认是升序（ASC）排序，可以使用 `DESC` 指定降序排序：

```sql
SELECT title, rating
FROM longlist
ORDER BY rating DESC
LIMIT 10;
```

可以指定多个排序条件：

```sql
SELECT title, rating, votes
FROM longlist
ORDER BY rating DESC, votes DESC
LIMIT 10;
```

上面的 SQL 指定了数据以 rating 降序排序。在 rating 相同，则进一步按 votes 降序排序。

## 聚合函数

聚合函数用于对一组值执行计算，并返回单个值。常用的聚合函数包括：

- COUNT()：返回行数
- SUM()：返回数值列的总和
- AVG()：返回数值列的平均值
- MIN()：返回指定列的最小值
- MAX()：返回指定列的最大值

计算 longlist 表中的书籍总数：

```sql
SELECT COUNT(*) AS total_books
FROM longlist;
```

计算 longlist 表中评分高于 4.5 的书籍数量：

```sql
SELECT COUNT(*) AS high_rating_books
FROM longlist
WHERE rating > 4.5;
```

计算 longlist 表中所有书籍的评分总和：

```sql
SELECT SUM(rating) AS total_rating
FROM longlist;
```

计算 longlist 表中所有书籍的平均评分：

```sql
SELECT ROUND(AVG(rating), 2) AS average_rating
FROM longlist;
```

计算 longlist 表中评分最高的书籍：

```sql
SELECT MAX(rating) AS highest_rating
FROM longlist;
```

计算 longlist 表中评分最低的书籍：

```sql
SELECT MIN(rating) AS lowest_rating
FROM longlist;
```
