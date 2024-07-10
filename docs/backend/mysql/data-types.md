# 数据类型

MySQL 支持多种 SQL 数据类型，分别为：

- 数字类型
- 日期和时间类型
- 字符串类型
- 空间类型
- JSON 数据类型

## 数字类型数据

查阅 [Numeric Data Type Syntax](https://dev.mysql.com/doc/refman/8.4/en/numeric-type-syntax.html) 可以对所有的数字类型有大致的了解，并且能够了解数字类型的基本语法。

- [位类型](https://dev.mysql.com/doc/refman/8.4/en/bit-type.html)
  - `BIT`

### 整数类型

[整数类型](https://dev.mysql.com/doc/refman/8.4/en/integer-types.html)有：`TINYINT`、`SMALLINT`、`MEDIUMINT`、`INT`、 `BIGINT`

我们时常看到 `TINYINT(M)` 这种形式，对于整数来说，`M` 表示最小展示宽度。整形最大的展示宽度为 255。根据 [Numeric Type Attributes](https://dev.mysql.com/doc/refman/8.4/en/numeric-type-attributes.html) 所描述的，`M` 的大小并不影响值存储的范围。最小展示宽度主要影响应用程序针对宽度小于 `M` 的整数展示，应用程序可以通过在左侧填充空格来使得展示的数字达到指定的宽度。

比较有意思的是 `BOOL` 类型也是数字类型，它等价于 `TINYINT(1)`。值为 0 表示 `false`，值为 1 表示 `true`。`BOOL` 类型在 MySQL 8.0.1 版本之前是一个别名，之后被废弃，不建议使用。

### 定点类型

[定点数类型](https://dev.mysql.com/doc/refman/8.4/en/fixed-point-types.html)用于存储精确的小数数据，通常用于财务和其他需要高精度计算的应用中。

定点类型的特点：

1. 定点类型数据是作为字符串存储的，并且不会出现舍入误差。
2. 适用于存储需要精确的小数的数据，如货币、利率等。

定点类型可以通过 `DECIMAL` 类型表示，与该类型等价于 `DEC`、`NUMERIC`、`FIXED` 这几种类型。

关于 `DECIMAL` 的语法：

- `DECIMAL(M, D)`，M 表示数值的最大位数（包括小数点前后的数字），D 表示小数点后的位数。例如，`DECIMAL(5, 2)` 可以存储的数值范围是 -999.99 到 999.99。
- 在标准的 SQL 中`DECIMAL(M)` 和 `DECIMAL(M, 0)` 是等价的，在 MySQL 中 `M` 的值默认为 10。
- `DECIMAL` 的最大位数是 65，但实际范围受 `D` 的影响。

### 浮点类型

[浮点数类型](https://dev.mysql.com/doc/refman/8.4/en/floating-point-types.html)用于存储近似的小数数据，适用于科学计算和其他不要求绝对精确的小数运算。浮点数以二进制格式存储，遵循 IEEE 754 标准。这种格式可以表示非常大的数值范围，但会导致精度上的舍入误差。

MySQL 中提供两种主要的浮点数类型，分别为 `FLOAT` 和 `DOUBLE`，声明的时候直接使用即可：

```sql
CREATE TABLE measurements (
    temperature FLOAT,
    distance DOUBLE
);

INSERT INTO measurements (temperature, distance) VALUES (36.6, 100000.123456), (25.4, 98765.4321);
```

关于 `FLOAT(p)` 语法：

- `FLOAT(p)` 中，精度 `p` 决定存储的大小。
- 精度为 0~23，数据类型为 `FLOAT`。
- 当精度 `p` 为 24~53 之间时，数据类型为 `DOUBLE`。

## 日期时间类型

- `DATE`
  - 字节：3 字节
  - 存储范围：1000-01-01 ~ 9999-12-31
- `TIME`
  - 字节：3 字节
  - 存储范围：-838:59:59 ~ 838:59:59
- `YEAR`
  - 字节：1 字节
  - 存储范围：1901 ~ 2155
- `DATETIME`
  - 字节：8 字节
  - 存储范围：1000-01-01 00:00:00 ~ 9999-12-31 23:59:59
- `TIMESTAMP`
  - 字节：4 字节
  - 存储范围：1970-01-01 00:00:01 UTC ~ 2038-01-19 03:14:07 UTC

## 字符串类型

### CHAR 和 VARCHAR

- `CHAR`
  - 字节：0 ~ 255 字节
  - 存储范围：定长字符串
- `VARCHAR`
  - 字节：0 ~ 65535 字节
  - 存储范围：变长字符串

### TEXT

- `TINYTEXT`
  - 字节：0 ~ 255 字节
  - 存储范围：短文本
- `TEXT`
  - 字节：0 ~ 65535 字节
  - 存储范围：文本
- `MEDIUMTEXT`
  - 字节：0 ~ 16777215 字节
  - 存储范围：中等文本
- `LONGTEXT`
  - 字节：0 ~ 4294967295 字节
  - 存储范围：长文本

### BINARY 和 VARBINARY

- `BINARY`
  - 字节：0 ~ 255 字节
  - 存储范围：定长二进制
- `VARBINARY`
  - 字节：0 ~ 65535 字节
  - 存储范围：变长二进制

### BLOB

- `TINYBLOB`
  - 字节：0 ~ 255 字节
  - 存储范围：短二进制
- `BLOB`
  - 字节：0 ~ 65535 字节
  - 存储范围：二进制
- `MEDIUMBLOB`
  - 字节：0 ~ 16777215 字节
  - 存储范围：中等二进制
- `LONGBLOB`
  - 字节：0 ~ 4294967295 字节
  - 存储范围：长二进制

## 枚举类型

- `ENUM`
  - 字节：1 或 2 字节
  - 存储范围：枚举值

## 参考资料

- [MySQL 8.4 Reference Manual - Chapter 13 Data Types](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)
