# acme.sh

在介绍 [acme.sh](https://github.com/acmesh-official/acme.sh) 之前，先了解一下 [Let's Encrypt](https://letsencrypt.org/getting-started/)。Let's Encrypt 是一个非盈利的证书颁发机构（Certificate Authority，简称 CA），目前已经为 4.5 亿的网站提供 TLS 证书。网站要开启 HTTPS，则需要这个 TLS 证书。

Let's Encrypt 负责颁发证书，但是需要自动化管理 TLS 证书的获取、更新、部署，则需要借助实现了 ACME 协议的客户端，如 certbot、acme.sh。虽然 certbot 是 Let's Encrypt 官方推荐的 acme 客户端，但是 certbot 并没有支持国内云厂商的插件，而 acme.sh 则对国内的云厂商有较好的支持，因此国内推荐使用 acme.sh。

acme.sh 的 README 介绍了很多丰富的功能，其实核心就几个步骤：

1. 安装 acme.sh
2. 生成证书
3. 将证书安装到 Nginx

## 安装 acme.sh

acme.sh 的安装十分简单，直接执行下面的命令即可：

```bash
curl https://get.acme.sh | sh -s email=my@example.com
```

安装以及 acme.sh 的后续操作，使用 root 账号或者 `sudo su` 切换 root 账号，因为在 acme.sh 自动化执行命令的时候，是没法输入密码的。

## 生成证书

为了获取域名的 TLS 证书，需要向 CA 证明域名的控制权。[HTTP Challenge](https://datatracker.ietf.org/doc/html/rfc8555#section-8.3) 跟 [DNS Challenge](https://datatracker.ietf.org/doc/html/rfc8555#section-8.4)都是常见的证明方式。

国内阿里云跟腾讯云都支持使用 api 访问 dns 服务，并且 acme.sh 官方也支持这两家厂商，配置对应厂商的环境变量即可自动化完成 DNS Challenge，无需手动添加解析记录。

- 阿里云参考 https://github.com/acmesh-official/acme.sh/wiki/dnsapi#dns_ali
- 腾讯云参考 https://github.com/acmesh-official/acme.sh/wiki/dnsapi#dns_dp

腾讯云的环境变量需要在 https://console.dnspod.cn/account/token/token 中进行申请，详情参考 https://github.com/acmesh-official/acme.sh/issues/2806

## 安装证书到 nginx

acme.sh 提供专门的命令将生成的证书安装到 Nginx 中，参考 [Install the cert to Apache/Nginx etc.](https://github.com/acmesh-official/acme.sh)。acme.sh 只会将证书拷贝的指定的目录，并不会更改 nginx 的配置，因此需要手动去更改，配置更改玩之后，reload nginx 即可。
