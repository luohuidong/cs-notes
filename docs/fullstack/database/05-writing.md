# 第五章：数据操作

本章将介绍如何对数据库中的数据进行增删改操作。你将学习 `INSERT`、`UPDATE`、`DELETE` 语句的用法，了解级联删除的工作原理，掌握触发器的创建方法，以及软删除的实现技巧。通过本章学习，你将能够完整地管理数据库中的数据生命周期。

## 1. 插入数据（INSERT）

### 1.1 基础插入

使用 `INSERT INTO` 向表中添加新记录。

**插入完整行：**

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);

-- 示例：向 books 表插入一本书
INSERT INTO books (id, title, author, price, year, category)
VALUES (1, 'SQL编程入门', '张明', 59.00, 2023, '技术');
```

**省略列名（不推荐）：**

```sql
-- 必须按表定义的顺序提供所有值
INSERT INTO books
VALUES (2, 'Python数据分析', '李华', 89.00, 2022, '技术', 4.8, 85);

-- 缺点：表结构变化时容易出错，可读性差
```

> **📌 建议**：始终显式指定列名，这样代码更清晰、更易维护，且不受表结构变化影响。

### 1.2 插入多行

一条 `INSERT` 语句可以插入多行数据：

```sql
INSERT INTO books (id, title, author, price, year, category)
VALUES
    (3, '数据库设计艺术', '王伟', 79.00, 2021, '技术'),
    (4, '高效能程序员的修炼', '刘洋', 49.00, 2020, '技术'),
    (5, '平凡的世界', '路遥', 68.00, 2018, '文学'),
    (6, '活着', '余华', 35.00, 2017, '文学');
```

这比多次执行单条插入更高效，因为只需要一次网络往返和事务提交。

### 1.3 插入默认值

对于设置了 `DEFAULT` 的列，有几种方式使用默认值：

```sql
-- 方式1：省略该列
INSERT INTO orders (id, user_id)
VALUES (1, 100);  -- status 和 created_at 使用默认值

-- 方式2：显式指定 DEFAULT 关键字
INSERT INTO orders (id, user_id, status, created_at)
VALUES (2, 101, DEFAULT, DEFAULT);

-- 方式3：插入 NULL（如果列允许 NULL 且有默认值）
-- 注意：SQLite 中 NULL 不会触发默认值，其他数据库行为可能不同
```

### 1.4 从其他表插入

使用 `INSERT ... SELECT` 从其他表复制数据：

```sql
-- 将技术类书籍复制到 tech_books 表
INSERT INTO tech_books (id, title, author, price)
SELECT id, title, author, price
FROM books
WHERE category = '技术';

-- 创建备份表并复制所有数据
CREATE TABLE books_backup AS
SELECT * FROM books;
```

### 1.5 从 CSV 文件导入

SQLite 支持从 CSV 文件直接导入数据。

**步骤：**

```sql
-- 1. 开启 CSV 模式
.mode csv

-- 2. 导入数据（假设有 books.csv 文件）
.import books.csv books

-- 3. 或者先创建表，再导入
CREATE TABLE new_books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    price REAL
);
.import books.csv new_books
```

**CSV 文件格式要求：**

- 第一行可以是列名（SQLite 会用第一行作为列名，如果表不存在）
- 使用逗号分隔字段
- 包含逗号的字段用双引号包裹

示例 `books.csv`：

```csv
id,title,author,price
1,SQL编程入门,张明,59.00
2,Python数据分析,李华,89.00
3,数据库设计艺术,王伟,79.00
```

## 2. 更新数据（UPDATE）

### 2.1 基础更新

使用 `UPDATE` 修改表中已有的数据。

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;

-- 示例：将《SQL编程入门》的价格调整为 69 元
UPDATE books
SET price = 69.00
WHERE title = 'SQL编程入门';
```

> **⚠️ 警告**：**始终**使用 `WHERE` 子句！忘记写 WHERE 会导致更新所有行。

### 2.2 更新多列

```sql
-- 同时更新价格和库存
UPDATE books
SET price = 75.00, in_stock = 100
WHERE id = 3;

-- 使用表达式更新
UPDATE books
SET price = price * 1.1  -- 所有书籍涨价 10%
WHERE category = '技术';
```

### 2.3 基于其他表更新

使用子查询根据其他表的数据进行更新：

```sql
-- 将所有中国作者的书籍价格上调 5%
UPDATE books
SET price = price * 1.05
WHERE author_id IN (
    SELECT id FROM authors WHERE country = 'China'
);
```

### 2.4 更新并返回结果（SQLite 3.35.0+）

SQLite 支持 `RETURNING` 子句，可以在更新后返回修改后的数据：

```sql
UPDATE books
SET price = price * 0.9
WHERE category = '技术'
RETURNING id, title, price AS new_price;
```

## 3. 删除数据（DELETE）

### 3.1 基础删除

使用 `DELETE FROM` 删除表中的记录。

```sql
DELETE FROM table_name
WHERE condition;

-- 示例：删除 id 为 10 的书籍
DELETE FROM books WHERE id = 10;
```

> **⚠️ 警告**：和 UPDATE 一样，**始终**使用 `WHERE` 子句！
>
> `DELETE FROM books;` 会删除表中**所有**数据，但保留表结构。

### 3.2 删除所有数据

```sql
-- 删除表中所有数据（逐行删除，可以回滚）
DELETE FROM books;

-- 更快的方式：截断表（SQLite 中使用 DELETE 或 VACUUM）
-- 注意：SQLite 没有 TRUNCATE TABLE 语句
DELETE FROM books;
VACUUM;  -- 回收空间
```

### 3.3 删除并返回结果（SQLite 3.35.0+）

```sql
DELETE FROM books
WHERE category = '技术' AND year < 2020
RETURNING id, title;
```

## 4. 级联操作

### 4.1 级联删除（ON DELETE CASCADE）

当父表记录被删除时，自动删除子表中关联的记录。

```sql
-- 创建作者表
CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- 创建书籍表，设置级联删除
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER,
    FOREIGN KEY (author_id)
        REFERENCES authors(id)
        ON DELETE CASCADE  -- 作者被删除，其作品也自动删除
);

-- 插入数据
INSERT INTO authors (id, name) VALUES (1, '测试作者');
INSERT INTO books (id, title, author_id) VALUES
    (1, '测试书籍1', 1),
    (2, '测试书籍2', 1);

-- 删除作者
DELETE FROM authors WHERE id = 1;
-- 结果：作者被删除，两本书籍也自动被删除
```

### 4.2 其他级联行为

| 选项                  | 行为                               |
| --------------------- | ---------------------------------- |
| `ON DELETE CASCADE`   | 删除父表记录，同时删除子表关联记录 |
| `ON DELETE SET NULL`  | 删除父表记录，将子表外键设为 NULL  |
| `ON DELETE RESTRICT`  | 有子表引用时，禁止删除父表记录     |
| `ON DELETE NO ACTION` | 默认行为，检查约束，违反时报错     |
| `ON UPDATE CASCADE`   | 父表主键更新，子表外键同步更新     |

```sql
-- 使用 SET NULL（适合可选关联）
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL  -- 用户注销后，订单仍保留但 user_id 变为 NULL
);

-- 使用 RESTRICT（保护重要数据）
CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id)
        REFERENCES departments(id)
        ON DELETE RESTRICT  -- 有员工在此部门时，禁止删除部门
);
```

## 5. 触发器（Triggers）

**触发器**是在特定事件发生时自动执行的 SQL 语句。

### 5.1 触发器基础

```sql
CREATE TRIGGER trigger_name
[BEFORE | AFTER | INSTEAD OF] [INSERT | UPDATE | DELETE]
ON table_name
[FOR EACH ROW]
[WHEN condition]
BEGIN
    -- 触发时执行的 SQL 语句
END;
```

**常用场景：**

- 自动更新相关表
- 数据验证和审计日志
- 维护派生数据（如统计计数）
- 实现业务规则

### 5.2 AFTER 触发器示例

**场景：订单创建后，自动减少库存**

```sql
-- 商品表
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
);

-- 订单项表
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 创建触发器：插入订单项后，减少库存
CREATE TRIGGER after_order_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END;

-- 测试
INSERT INTO products (id, name, stock) VALUES (1, 'iPhone', 100);
INSERT INTO order_items (id, product_id, quantity) VALUES (1, 1, 5);
-- 结果：products 表中 iPhone 的 stock 变为 95
```

> **特殊关键字**：
>
> - `NEW`：在 INSERT/UPDATE 触发器中，表示新插入/更新后的行
> - `OLD`：在 UPDATE/DELETE 触发器中，表示更新前/被删除的行

### 5.3 BEFORE 触发器示例

**场景：插入订单前，检查库存是否充足**

```sql
CREATE TRIGGER before_order_insert
BEFORE INSERT ON order_items
FOR EACH ROW
WHEN (SELECT stock FROM products WHERE id = NEW.product_id) < NEW.quantity
BEGIN
    SELECT RAISE(ABORT, '库存不足，无法创建订单');
END;

-- 测试
INSERT INTO order_items (id, product_id, quantity) VALUES (2, 1, 200);
-- 报错：库存不足，无法创建订单
```

### 5.4 审计日志触发器

**场景：记录所有对书籍的修改操作**

```sql
-- 审计日志表
CREATE TABLE books_audit (
    id INTEGER PRIMARY KEY,
    book_id INTEGER,
    operation TEXT,  -- INSERT/UPDATE/DELETE
    old_title TEXT,
    new_title TEXT,
    old_price REAL,
    new_price REAL,
    changed_at TEXT DEFAULT CURRENT_TIMESTAMP,
    changed_by TEXT
);

-- 记录更新操作
CREATE TRIGGER audit_books_update
AFTER UPDATE ON books
FOR EACH ROW
BEGIN
    INSERT INTO books_audit (
        book_id, operation,
        old_title, new_title,
        old_price, new_price,
        changed_by
    )
    VALUES (
        NEW.id, 'UPDATE',
        OLD.title, NEW.title,
        OLD.price, NEW.price,
        'system'
    );
END;

-- 记录删除操作
CREATE TRIGGER audit_books_delete
AFTER DELETE ON books
FOR EACH ROW
BEGIN
    INSERT INTO books_audit (
        book_id, operation,
        old_title, old_price
    )
    VALUES (
        OLD.id, 'DELETE',
        OLD.title, OLD.price
    );
END;
```

### 5.5 删除触发器

```sql
-- 查看所有触发器
SELECT name FROM sqlite_master WHERE type = 'trigger';

-- 删除触发器
DROP TRIGGER IF EXISTS trigger_name;
```

## 6. 软删除（Soft Deletion）

### 6.1 什么是软删除

**软删除**不是真正从数据库中删除数据，而是通过标记字段将数据标记为"已删除"，使其在常规查询中不可见。

**优点：**

- 数据可恢复（误删后可以恢复）
- 保留历史数据（满足审计要求）
- 维护数据完整性（外键关联不会断裂）

**缺点：**

- 占用更多存储空间
- 查询需要额外过滤条件
- 需要定期清理（硬删除）

### 6.2 软删除实现

**步骤1：添加删除标记列**

```sql
-- 在现有表添加软删除标记
ALTER TABLE books ADD COLUMN is_deleted INTEGER DEFAULT 0;
ALTER TABLE books ADD COLUMN deleted_at TEXT;
ALTER TABLE books ADD COLUMN deleted_by TEXT;
```

**步骤2：创建视图（过滤已删除数据）**

```sql
-- 创建视图，自动过滤已删除的数据
CREATE VIEW active_books AS
SELECT * FROM books
WHERE is_deleted = 0 OR is_deleted IS NULL;

-- 应用查询使用视图而非直接查表
SELECT * FROM active_books WHERE category = '技术';
```

**步骤3：创建软删除触发器**

```sql
-- 将 DELETE 转换为 UPDATE
CREATE TRIGGER soft_delete_books
INSTEAD OF DELETE ON active_books
FOR EACH ROW
BEGIN
    UPDATE books
    SET
        is_deleted = 1,
        deleted_at = CURRENT_TIMESTAMP,
        deleted_by = 'current_user'
    WHERE id = OLD.id;
END;
```

> **注意**：SQLite 对普通表不支持 `INSTEAD OF DELETE` 触发器，只支持对视图使用。
> 实际应用中，通常通过应用层代码实现软删除，而非数据库触发器。

### 6.3 应用层实现软删除

更常见的做法是在应用层统一处理：

```sql
-- 不使用 DELETE，而是 UPDATE
UPDATE books
SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP
WHERE id = 5;

-- 查询时过滤
SELECT * FROM books
WHERE is_deleted = 0 AND category = '技术';

-- 恢复数据
UPDATE books
SET is_deleted = 0, deleted_at = NULL
WHERE id = 5;

-- 定期硬删除（真正删除）已标记的数据
DELETE FROM books
WHERE is_deleted = 1
  AND deleted_at < DATE('now', '-1 year');  -- 删除一年前的软删除数据
```

### 6.4 软删除的完整示例

```sql
-- 创建支持软删除的用户表
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    -- 软删除字段
    is_deleted INTEGER DEFAULT 0 CHECK(is_deleted IN (0, 1)),
    deleted_at TEXT,
    deleted_by TEXT
);

-- 创建视图
CREATE VIEW active_users AS
SELECT id, username, email, created_at
FROM users
WHERE is_deleted = 0;

-- 软删除函数（通过应用层调用）
-- 软删除用户 1
UPDATE users
SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP, deleted_by = 'admin'
WHERE id = 1;

-- 查询活跃用户
SELECT * FROM active_users;

-- 查询所有用户（包括已删除）
SELECT
    id, username, email,
    CASE WHEN is_deleted = 1 THEN '已删除' ELSE '正常' END AS status,
    deleted_at
FROM users;

-- 查询已删除用户
SELECT * FROM users WHERE is_deleted = 1;

-- 恢复用户
UPDATE users
SET is_deleted = 0, deleted_at = NULL, deleted_by = NULL
WHERE id = 1;
```

## 7. 完整示例：订单管理系统

```sql
-- 1. 创建表结构
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL CHECK(price > 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
    is_deleted INTEGER DEFAULT 0
);

CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    is_deleted INTEGER DEFAULT 0
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    total_amount INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'shipped', 'cancelled')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    unit_price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 2. 创建触发器：自动扣减库存
CREATE TRIGGER trg_deduct_stock
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END;

-- 3. 创建触发器：恢复库存（订单取消时）
CREATE TRIGGER trg_restore_stock
AFTER UPDATE ON orders
FOR EACH ROW
WHEN NEW.status = 'cancelled' AND OLD.status != 'cancelled'
BEGIN
    UPDATE products
    SET stock = stock + (
        SELECT quantity FROM order_items WHERE order_id = NEW.id AND product_id = products.id
    )
    WHERE id IN (SELECT product_id FROM order_items WHERE order_id = NEW.id);
END;

-- 4. 插入示例数据
INSERT INTO products (id, name, price, stock) VALUES
(1, '笔记本电脑', 5999, 50),
(2, '无线鼠标', 99, 200),
(3, '机械键盘', 499, 100);

INSERT INTO customers (id, name, email) VALUES
(1, '张三', 'zhang@example.com'),
(2, '李四', 'li@example.com');

-- 5. 创建订单（触发器自动扣减库存）
INSERT INTO orders (id, customer_id) VALUES (1, 1);
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1, 5999),  -- 1台笔记本
(2, 1, 2, 2, 99);    -- 2个鼠标

-- 检查库存：笔记本 49，鼠标 198
SELECT * FROM products;

-- 6. 取消订单（触发器自动恢复库存）
UPDATE orders SET status = 'cancelled' WHERE id = 1;

-- 检查库存：恢复为笔记本 50，鼠标 200
SELECT * FROM products;

-- 7. 软删除客户（保留历史订单）
UPDATE customers
SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP
WHERE id = 2;

-- 8. 查询活跃客户
SELECT * FROM customers WHERE is_deleted = 0;
```

## 8. 本章小结

### 核心概念回顾

| 概念/语法              | 一句话理解                         |
| ---------------------- | ---------------------------------- |
| **INSERT INTO**        | 向表中插入新数据                   |
| **INSERT ... SELECT**  | 从其他表复制数据                   |
| **UPDATE ... SET**     | 修改已有数据                       |
| **DELETE FROM**        | 删除数据（物理删除）               |
| **ON DELETE CASCADE**  | 父表记录删除时自动删除子表关联记录 |
| **ON DELETE SET NULL** | 父表记录删除时将外键设为 NULL      |
| **ON DELETE RESTRICT** | 有引用时禁止删除                   |
| **触发器 (Trigger)**   | 特定事件发生时自动执行的 SQL       |
| **NEW**                | INSERT/UPDATE 触发器中的新行       |
| **OLD**                | UPDATE/DELETE 触发器中的旧行       |
| **软删除**             | 标记数据为已删除而非真正删除       |
| **is_deleted 列**      | 软删除的标记字段                   |

### 操作对比

| 操作   | 命令                | 是否可回滚   | 风险                 |
| ------ | ------------------- | ------------ | -------------------- |
| 插入   | `INSERT`            | 是（事务中） | 低                   |
| 更新   | `UPDATE`            | 是（事务中） | **高（易忘 WHERE）** |
| 删除   | `DELETE`            | 是（事务中） | **高（易忘 WHERE）** |
| 截断   | `DELETE + VACUUM`   | 否           | 高                   |
| 软删除 | `UPDATE is_deleted` | 是           | 低                   |

### 最佳实践

1. **始终使用 WHERE**：UPDATE 和 DELETE 必须带 WHERE 条件
2. **先查询后修改**：不确定时用 SELECT 验证条件
3. **使用事务**：批量操作放在事务中，便于回滚
4. **软删除优先**：重要数据使用软删除，保留恢复能力
5. **慎用级联删除**：确保业务逻辑允许级联删除
6. **触发器适度使用**：过多触发器会影响性能且难以调试

### 安全 checklist

执行修改操作前检查：

- [ ] UPDATE/DELETE 是否包含 WHERE 子句？
- [ ] WHERE 条件是否正确？（先用 SELECT 验证）
- [ ] 是否在事务中执行？（重要操作）
- [ ] 是否备份了数据？（批量更新/删除）
- [ ] 触发器会产生什么副作用？

## 附录：SQLite 特有功能

### 1. UPSERT（插入或更新）

```sql
-- 如果主键冲突则更新，否则插入
INSERT INTO books (id, title, price)
VALUES (1, '新书名', 100)
ON CONFLICT(id) DO UPDATE SET
    title = excluded.title,
    price = excluded.price;
```

### 2. REPLACE INTO

```sql
-- 如果主键冲突则先删除旧记录再插入新记录
REPLACE INTO books (id, title, price)
VALUES (1, '替换书名', 120);
```

> **注意**：REPLACE 会先 DELETE 再 INSERT，会触发所有相关触发器。
