# APT 代理设置

Aptitude will not use the HTTP Proxy environment variables. Instead, it has its own configuration file where you can set your proxy.

If you filled in your proxy information during installation, the Apt configuration file would have been automatically updated.

## Creating  an Apt Proxy Conf File

Apt loads all configuration files under /etc/apt/apt.conf.d. We can create a configuration specifically for our proxy there, keeping it separate from all other configurations.

1. Create a new configuration file named proxy.conf.

```bash
sudo touch /etc/apt/apt.conf.d/proxy.conf
```

2. Open the proxy.conf file in a text editor.

```bash
sudo vi /etc/apt/apt.conf.d/proxy.conf
```

3. Add the following line to set your HTTP proxy.

```bash
Acquire::http::Proxy "http://user:password@proxy.server:port/";
```

4. Add the following line to set your HTTPS proxy.

```bash
Acquire::https::Proxy "http://user:password@proxy.server:port/";
```

5. Save your changes and exit the text editor.

Your proxy settings will be applied the next time your run Apt.

## 参考资料

- [How to Set the Proxy for APT on Ubuntu 18.04](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-set-the-proxy-for-apt-for-ubuntu-18-04/)
