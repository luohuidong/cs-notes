# Docker

Docker 提供了一种在隔离环境中打包和运行应用的能力。利用 Docker，可以将应用及其依赖都打包成 image，然后通过运行 container 的方式让应用在其它地方都以相同的方式运行。Docker 这种能力，极大地提升了应用的交付效率。相较于虚拟机运行应用的方式，container 轻量、启动快的特性提升了硬件资源的使用效率以及应用扩容缩容的便捷程度。

## 入门 Docker

Docker 官方文档 [Get started](https://docs.docker.com/get-started/) 中提供的一系列文档用于了解 Docker 的基本概念以及基本用法，是非常好的 Docker 入门材料，因此入门 Docker 的内容范围就是对应着官方文档 Get Started 一系列文章的内容范围。

### 对 Docker 有一个初步认识

[Docker](https://docs.docker.com/get-started/docker-overview/) 提供了一种在隔离环境中打包和运行应用的能力。利用 Docker，可以将应用及其依赖都打包成 image，然后通过运行 container 的方式让应用在其它地方都以相同的方式运行。Docker 这种能力，极大地提升了应用的交付效率。相较于虚拟机运行应用的方式，container 轻量、启动快的特性提升了硬件资源的使用效率以及应用扩容缩容的便捷程度。

Docker 的两大核心分别是 [image](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/) 跟 [container](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)，因此在 Docker 入门的前期需要对 image 和 container 有一个基本的印象。

简单的来说，image 是一个只读的模板，包含了运行应用所需的代码、依赖、环境变量、配置文件等等，类似面向对象中的类。container 则是 image 的运行实例，有自己的文件系统、进程、网络等隔离空间，类似面向对象中类创建出来的对象。**后续在了解 Docker 的过程中，虽然会遇到一大堆的命令跟概念，但它们都可以清晰地划分到“构建镜像”和“运行容器”这两大块中。**

### 构建镜像入门

[Building images](https://docs.docker.com/get-started/docker-concepts/building-images/) 提供了一系列用于入门 Docker 构建镜像的文章：

- [Understanding the image layers](https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/)：理解 image 分层的优势；理解为什么在 container 中更改的内容不会影响到 image。
- [Writing a Dockerfile](https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/)：Dockerfile 保存的是构建 image 的指令。
- [Build, tag, and publish an image](https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/)：了解如何通过 Dockerfile 构建镜像，打 tag 以及发布镜像
  - 发布镜像的内容，还可以看一下 [What is a registry](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/) 这篇文章，了解什么是 registry。在使用 Docker 的大多数情况下都是和 Docker 官方的 registry（即 Docker Hub）打交道。
- [Using the build cache](https://docs.docker.com/get-started/docker-concepts/building-images/using-the-build-cache/)：了解如何通过缓存提升构建镜像的速度。
- [Multi-stage builds](https://docs.docker.com/get-started/docker-concepts/building-images/multi-stage-builds/)：通过多阶段构建，减少镜像的大小以及提升容器运行的安全性

### 容器运行入门

- [Publishing and exposing ports](https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/)：了解怎样设置转发规则，将 host 的端口的请求转发到容器的指定端口。
- [Overriding container defaults](https://docs.docker.com/get-started/docker-concepts/running-containers/overriding-container-defaults/)：了解如何定制化地运行容器。在配置网络那部分的内容，介绍了为什么在生产环境使用自定义网络比默认的网络更好。
- [Persisting container data](https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/)：了解如何通过 Docker volume 保存 container 产生的数据
- [Sharing local files with containers](https://docs.docker.com/get-started/docker-concepts/running-containers/sharing-local-files/)
- [Multi-container applications](https://docs.docker.com/get-started/docker-concepts/running-containers/multi-container-applications/)
  - [Docker Compose Quickstart](https://docs.docker.com/compose/gettingstarted/)

## Docker Compose

- [Defining and running multi-container applications with Docker Compose](https://docs.docker.com/guides/docker-compose/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Compose file reference](https://docs.docker.com/reference/compose-file/)： `compose.yaml` 文件参考手册

## 进阶

- [Docker guides](https://docs.docker.com/guides/)：有很多很具体的 Docker 使用案例
