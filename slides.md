---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
css: unocss
title: Learn Monorepo 
---

# Learn Monorepo

---
transition: slide-up

layout: center
---

<Toc />

<style>
  .slidev-layout {
    :deep(.my-auto) {
      transform: scale(0.4);
    }
  }

</style>

---
transition: slide-up 
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# 是什么🙋‍♀️？

<br/>

- 定义：在版本控制系统中，monorepo（“mono”的意思是“单一”，“repo”是“存储库”的缩写）是一种软件开发策略，其中多个项目的代码存储在同一个存储库中。这种做法至少可以追溯到 2000 年代初，当时它通常被称为共享代码库。 Google、Meta、Microsoft 都采用非常大的 monorepos，具有不同的策略来扩展具有大量代码和日常更改的构建系统和版本控制软件。

- 对比：和 Monorepo 对立的是传统的 Polyrepo 模式，每个项目对应一个单独的仓库来分散管理。

---
transition: fade-out
---

# 为什么🤔？

<br>

要说明为什么要用 Monorepo 那就要对比一下 Polyrepo 啦。

<div grid="~ cols-2 gap-8" mt-10>
<div>

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba8dbd7b42ff4f57b41e51c1716df5fd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" />

</div>
<div>

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45503aa18d984cbfab42ebf7430c646e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?">

</div>
</div>

---
transition: fade-out

level: 2
---

# Monorepo 的组织方式

<br>

Monorepo的代码组织方式如下：

```markdown
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
```

`packages`目录下(也可以叫其他名字)存放多个子项目，每个子项目都有自己的`package.json`文件，用来管理子包。


---
transition: fade-out

level: 2
---

# Polyrepo 的弊端

- 代码重复: 容易导致代码重复，主要是因为不同的项目都有自己的独立代码仓库。工具类组件，lint类，ts类，公共配置类都有大量的冗余。
- 版本管理：当不同的仓库有依赖关系时，会有依赖管理的问题，必须非常小心的处理依赖的版本和代码是否一致。
- 工具混乱：每个项目都有自己的启动，构建，测试，发布命令，有记忆负担。CI、CD 流程很难将多个仓库组合到一起去，测试也比较难处理。
- 代码管理：每个项目的代码管理工具不一致，npm, yarn, pnpm各种类型，维护困难。且每个项目代码提交在各自项目内，Code Review比较困难。
- 代码共享：试想如果需要多个项目需要共享一套配置应该如何实现。

---
transition: slide-up

level: 2
---

# Monorepo 的优势

- 易于代码复用: 类似的功能或通信协议可以抽象到共享库中，并直接包含在项目中，而无需依赖包管理器。
- 简单依赖管理: 在多个项目依赖于第三方依赖项的多存储库环境中，可能会多次下载或构建该依赖项。在 monorepo 中，可以轻松优化构建，因为引用的依赖项都存在于同一个代码库中
- 方便统一构建: Monorepo 的一个重要特点是可以共用一套构建系统和工具链进行构建和部署，提升了构建的效率。
- 方便集中管理: Monorepo 架构中，不同的应用程序都在同一个代码库中，方便管理和监控。这一点非常重要，特别是在需要同时对多个版本进行修改和维护的情况下。
- 问题快速定位: 由于所有的代码都在同一个代码库中进行开发，debugger 可以很快找出问题所在的代码文件和行数，便于开发人员调试问题。

---
transition: fade-out
---

# 怎么用🤩？

在回答怎么用之前，我们先来看一下目前比较主流的实现monorepo的方式。

- 🍏 Lerna - 应用比较广泛的monorepo方式，有很多开源项目使用lerna作为monorepo，但目前已被Nx接管维护。
- 🍎 pnpm - pnpm是目前比较流行的包管理器，它解决了依赖重复下载和幽灵依赖的问题，同时它也提出了自己的monorepo方案。
- 🍐 Nx - 作者是前Google工程师，团队成员有许多大厂成员，按官方叙述，Nx 吸收了许多 Google、Meta 内部 Monorepo 方案的优点。
- 🍊 Turborepo - 2021 年的新起之秀，原是个人项目，后被 Vercel 收购。我个人认为这是 Vercel 在前端工程中的进一步开疆拓土，现在你的框架、仓库管理、部署都可以只靠 Vercel 完成了。
- 🍋 Rush - 微软开源的 Monorepo 方案，我个人没有做过比较深入的了解，这里不做评论。一些企业级的解决方案，如 Google 的 Bazel、Gradle 这种，这些和前端的关系不是太大，上手成本也较高，这里同样不做评论。

---
src: ./pages/lerna.md
hide: false
---


---
src: ./pages/pnpm.md
hide: false
---

---
transition: fade-out
---
# 参考文档

<br/>

- [为什么越来越多的项目选择 Monorepo？](https://juejin.cn/post/7207743145999368229)
- [从构建到发布：Monorepo 的最佳实践](https://juejin.cn/post/7210310775276716092)
- [pnpm](https://www.pnpm.cn/)
- [lerna中文](https://www.lernajs.cn/)
- [lerna](https://lerna.js.org/)

