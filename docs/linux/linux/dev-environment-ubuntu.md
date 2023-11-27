# Ubuntu 开发环境配置

环境：Ubuntu 18.04

## Node

Node 直接推荐使用 [NVM](https://github.com/creationix/nvm) 的方式进行安装。

## Python

Ubuntu 18.04 的版本默认是安装了 Python 3 的，因此我们安装 Python 的时候，只需安装 Python 2.7 即可：

```bash
sudo apt install python
```

## C/C++

```bash
sudo apt install -y build-essential
```

## Java

Java 开发环境需要安装 Jre 和 Jdk，可以在命令行中输入 `java --version`  和 `javac --version`  查看提示进行安装。

Jre 的安装：

```bash
~$ java --version

Command 'java' not found, but can be installed with:

sudo apt install default-jre
sudo apt install openjdk-11-jre-headless
sudo apt install openjdk-8-jre-headless
```

执行 `sudo apt install default-jre`  即可。

Jdk 的安装：

```bash
~$ javac --version

Command 'javac' not found, but can be installed with:

sudo apt install default-jdk
sudo apt install openjdk-11-jdk-headless
sudo apt install ecj
sudo apt install openjdk-8-jdk-headless
```

执行 `sudo apt install defualt-jdk`  即可。
