# 关系

## 关系模型

在数据库关系模型中：

- 表（Table）：对应现实世界中的一个“实体集合”
- 行（Row）：一条实体记录
- 列（Column）：实体的属性
- 主键（Primary Key）：唯一标识一条记录的属性
- 外键（Foreign Key）：用于建立表与表之间关系的属性

数据库中最常见的实体关系模型：

- 一对一 (One-to-One)
  - 表 A 的一条记录对应表 B 的一条记录，反之亦然。
  - 典型场景：用户 -> 用户详情；员工 -> 员工档案；账户 -> 账户设置
- 一对多(One-to-Many)
  - 关系型数据库中使用频率最高的关系。
  - 表 A 的一条记录对应表 B 的多条记录，但表 B 的每条记录只对应表 A 的一条记录。
  - 典型场景：文章 -> 评论；部门 -> 员工；
- 多对多 (Many-to-Many)
  - 表 A 的多条记录对应表 B 的多条记录，反之亦然。
  - 关系型数据库不支持直接的多对多关系，需要通过中间表来实现。
    - 中间表的特点是至少包含表 A 和表 B 的外键。
    - 中间表通常使用联合主键，并且可以携带其他属性。
- 自关联（Self-Referencing）
  - 表中的记录与同一表中的其他记录建立关系。
  - 典型场景：树状结构，如员工与经理的关系；分类与子分类的关系；

## ERD

- [Entity Relationship Diagram (ERD) Tutorial - Part 1](https://www.youtube.com/watch?v=xsg9BDiwiJE)
- [Entity Relationship Diagram (ERD) Tutorial - Part 2](https://www.youtube.com/watch?v=hktyW5Lp0Vo)

Entity Relationship Diagram (ER 图) 是一种用于表示实体及其关系的图形化工具。

一对一：

```mermaid
erDiagram
    %% 一对一关系：一个用户对应一个用户资料
    USER ||--|| USER_PROFILE : has

    USER {
        int id PK
        string username
        string email
    }

    USER_PROFILE {
        int id PK
        int user_id FK "对应用户ID"
        string avatar
        string bio
    }
```

一对多：

```mermaid
erDiagram
    %% 一对多关系：一个部门有多个员工
    DEPARTMENT ||--o{ EMPLOYEE : contains

    DEPARTMENT {
        int id PK
        string name
        string location
    }

    EMPLOYEE {
        int id PK
        int department_id FK
        string name
        string position
    }
```

多对多：

```mermaid
erDiagram
    %% 多对多关系：学生和课程之间的多对多关系
    STUDENT }o--o{ COURSE : enrolls

    STUDENT {
        int id PK
        string name
        string major
    }

    COURSE {
        int id PK
        string name
        int credits
    }

    %% 多对多关系需要中间表
    ENROLLMENT {
        int student_id PK, FK
        int course_id PK, FK
        date enrollment_date
        string grade
    }

    STUDENT ||--o{ ENROLLMENT : has
    COURSE ||--o{ ENROLLMENT : includes
```
