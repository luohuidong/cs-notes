# 命令行设置代理

Depending on your shell, and config, Open ~/.bashrc, ~/.bash_profile, or ~/.zshrc or wherever you set your shell variables, and set:

```shell
export HTTP_PROXY="http://localhost:8888"
export http_proxy="http://localhost:8888"
export ALL_PROXY="http://localhost:8888"
export all_proxy="http://localhost:8888"
export HTTPS_PROXY="http://localhost:8888"
export https_proxy="http://localhost:8888"
```

参考资料：

- [Command line application proxy configuration](https://docs.expo.io/versions/v32.0.0/introduction/troubleshooting-proxies/#command-line-application-proxy-configuration)
