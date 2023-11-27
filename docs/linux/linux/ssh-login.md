# SSH 免密登录

环境：

- 客户端：Ubuntu 18.04
- 服务器端：CentOS 7

## 客户端生成 ssh key

在 `~/.ssh` 路径下，运行下面的其中一条命令，可生成一对公钥和私钥

```bash
ssh-keygen
ssh-keygen -t rsa
ssh-keygen -t dsa
```

rsa 和 dsa 分别代表不同的加密方式。

## 开启 SSH 代理

当生成了公私钥之后，需要通过下面的命令打开 SSH 代理，否则可能会出现 [Could not open a connection to your authentication agent](https://stackoverflow.com/questions/17846529/could-not-open-a-connection-to-your-authentication-agent) 的情况。

```bash
eval `ssh-agent -s`
```

随后，执行 `ssh-add ~/.ssh/xxx`，将**客户端**私钥加载到 ssh 服务中，xxx 替换为具体的私钥文件名

## 服务器端 authorized_keys 文件

如果想要实现 SSH 免密登陆，需要进行如下几个步骤

1. 将客户端生成的公钥，粘贴到**服务器端** `~/.ssh/authorized_keys` 文件中。
2. 通过 `chmod 600` 修改 authorized_keys 文件的权限。
3. 执行 `sudo service ssh restart` 命令重启 ssh。

## 使用 SSH config

ssh config 能让我们批量管理多个 ssh，通过别名登陆远程服务器。config 文件存放在 `~/.ssh/config`。

### config 语法关键字

- Host：主机别名
- HostName：主机名
- Port：端口号（默认端口为 22）
- User：用户名
- IdentityFile：密钥文件的路径

### 新建 config 文件

```
host testhost
  HostName 192.168.30.250
  Port 22
  User root
```

当配置文件编辑完毕之后，如果已经设置好 SSH 免密登陆，那么此时运行 `ssh testhost` 即可登陆远程的服务器。
