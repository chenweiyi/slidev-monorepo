---
transition: fade-out
level: 2
---

# Lerna简介
🐉Lerna 是一个快速、现代的构建系统，用于管理和发布来自同一存储库的多个 JavaScript/TypeScript 包。 -- 摘自[Github Lerna](https://github.com/lerna/lerna)

下面，我将带着大家从一个[真实的项目](https://github.com/chenweiyi/ai-assistant)改造成lerna项目。

```markdown
frontend -- 前端项目文件夹
  dist
  mock
  src
  package.json
  tsconfig.json
  typings.d.ts
src -- 后端项目文件夹
  bin
  consts
  routes
  views
  utils
  app.mts
nodemon.json -- 后端用到的配置
tsconfig.json -- 后端用到的ts配置
package.json -- 后端用到的package.json

```

---
transition: slide-right
background: https://source.unsplash.com/collection/94734566/1920x1080
layout: center
level: 3
---

# 改造开始

---
transition: slide-right

level: 3
---

# Step 1:

<div class="p-5" v-click>
全局安装 lerna : **npm i -g lerna**
</div>

--- 
transition: slide-right
layout: two-cols
level: 3
---

# Step 2:


- 创建packages文件夹，一般叫这个名字，也可以改。
- 在packages文件里创建前后端项目，比如这个项目叫：frontend, backend。
- 迁移前后端代码到对应的目录下。这里需要把根目录下的 src, package.json, tsconfig.json 这些文件迁移到backend中去。
- 修改前后端项目的package.json, 增加**name**字段，比如前端项目叫 chartgpt-frontend, 后端项目叫 chartgpt-backend。
- 在根目录创建一个空的package.json, name 叫 chatgpt。
- 迁移过程中需要修改某些文件的引用路径，

::right::

<div v-click-hide>
<img src="/修改文件路径.png">
</div>

<div v-click>
<img src="/整理完后.png">
</div>


<style>
.grid-cols-2 {
  grid-gap: 20px;

  :deep(.col-right) {
    padding: 40px 0;

    img {
      height: 400px;
    }
  }

  .slidev-vclick-hidden {
    display: none;
  }
}

</style>

---
transition: slide-right

level: 3
---

# Step 3:

<div class="p-3">
在项目根目录下执行: **lerna init** , 生成 **lerna.json** 和在 **package.json** 中自动增加 **workspace** 字段。
</div>

<div v-click>
```json
// lerna.json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "useWorkspaces": true,
  "version": "0.0.0"
}
```

```json
// package.json
{
  ...,

  "devDependencies": {
    "lerna": "6.6.1",
  },

  "workspaces": [
    "packages/*"
  ]
}

```
</div>

---
transition: slide-right

level: 3
---

# Step 4:

<div class="p-3">
在根目录下执行 lerna clean 命令，清理子包下的 node_modules。
</div>

![clean](/clean.png)


---
transition: slide-right

level: 3
---

# Step 5:

<div class="p-3">
在根目录下执行 lerna bootstrap 命令，安装所有模版依赖。
</div>

![bootstrap](/bootstrap.png)

<style>
  img {
    height: 300px;
  }
</style>

---
transition: slide-up

level: 3
---

# Step 6:

<div class="p-3">
启动项目。再启动项目之前，你需要在根目录下创建命令，比如我们要创建一个启动开发的命令 **dev**。
</div>

![start](/start.png)


---
transition: slide-up

level: 4
---

# lerna 命令讲解

lerna run 命令可以在每个 package 中运行指定的 npm script。这个命令可以让你在项目的多个 package 中同时运行脚本，或者在某一个 package 中运行脚本。使用 lerna run 命令一般格式如下：

```js
lerna run <script> [-- <args>]
```

其中，&#60;script&#62; 表示要运行的 npm script 的名称，&#60;args&#62; 表示传递给 npm script 的参数。如果没有传递 &#60;args&#62;，可以省略 -- 符号。

<div class="content">

下面是一些示例：

- 运行所有 package 中的 build 命令：
```js
lerna run build
```
- 在指定的 package 中运行 test 命令：
```js
lerna run test --scope=<package-name>
```
- 在所有 package 中运行 start 命令，并传递参数 -p 3000：
```js
lerna run start --parallel -- -p 3000
```
- 在指定的 package 中运行自定义的脚本 my-script：
```js
lerna run my-script --scope=<package-name>
```
</div>

<style>
  .content {
    scale: 0.7;
    position: relative;
    left: -130px;
    top: -40px;
  }
</style>


---
transition: slide-up

level: 4
---

# lerna 命令讲解

然后，我们需要在子包中实现 dev 命令:
```js {1,5}
// packages/frontend/package.json

"scripts": {
  "build": "max build",
  "dev": "max dev",
  "format": "prettier --cache --write .",
  "postinstall": "max setup",
  "setup": "max setup",
  "start": "npm run dev",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

---
transition: slide-down

level: 4
---

# lerna 命令讲解

```js {1,4}
// packages/backend/package.json

"scripts": {
  "dev": "nodemon ./src/bin/www.mts",
  "debug": "cross-env DEBUG=* nodemon ./src/bin/www.mts",
  "prd": "pm2 start build/bin/www.mjs",
  "test": "echo \"Error: no test specified\" && exit 1",
  "clean": "rm -rf ./build",
  "build-ts": "tsc",
  "build": "npm run clean && npm run build-ts && npm run copy-static",
  "copy-static": "node src/copyStatic.mjs",
  "tsc": "tsc --noEmit"
},
```

---
transition: slide-down

level: 4
---

# lerna 命令讲解

好了，然后我们可以开始启动项目了。

```js
// 在根目录下，执行如下命令
npm run dev
```

![启动项目](/启动项目.png)

<style>
  img {
    height: 320px;
  }
</style>

---
transition: fade-out

level: 4
---

# lerna 命令讲解

然后我们可以继续完善我们的命令，把常用的build, test命令都加上。

<div grid="~ cols-11 gap-8" mt-10>
<div col="span-7">
```js
"scripts": {
  "dev": "lerna run dev",
  "build": "lerna run build",
  "test": "lerna run test",
  "debug": "npm run debug:be & npm run dev:fe",
  "dev:fe": "lerna run dev --scope=chartgpt-frontend", 
  "dev:be": "lerna run dev --scope=chartgpt-backend",
  "debug:be": "lerna run debug --scope=chartgpt-backend",
  "prepare": "husky install",
  "pre-commit": "lint-staged",
  "prettier:check": "prettier '**/*.{ts,tsx,mts,mjs,less,js}' --check",
  "prettier:write": "prettier '**/*.{ts,tsx,mts,mjs,less,js}' --write"
},
```
</div>
<div col="span-4">
命令解释一下：

- dev: 一键启动命令
- build: 一键打包命令
- test: 一键测试命令
- debug: 启动后台debug 和 前台服务
- dev:fe: 仅仅启动前台服务
- dev:be: 仅仅启动后台服务
- debug:be: 仅仅启动后台调试
</div>
</div>

---
transition: slide-down

level: 3
---

# lerna 支持 pnpm

默认 lerna 是使用 yarn 作为包管理工具的，可不可以用pnpm呢？ pnpm相比 npm 和 yarn 有很多优点，最主要的就是速度快、节省磁盘空间，甚至本身支持monorepo的方式，再有就是权限严格，创建的node_modules非扁平结构，解决了幽灵依赖的问题。本讲不涉及到pnpm, 因此想深入了解pnpm的同学可以下去自行了解，这里就不浪费时间了。

下面讲一下具体操作。


---
transition: slide-down

level: 4
---

# lerna 支持 pnpm

Step 1

首先删除掉node_modules包
```js
// 删除子包依赖
lerna clean

// 删除根目录下的依赖
rm -rf ./node_modules

// 或者自己去子包下删除node_modules
cd packages/frontent && rm -rf ./node_modules

cd packages/backend && rm -rf ./node_modules


```

---
transition: slide-down

level: 4
---

# lerna 支持 pnpm

Step 2

修改 lerna.json, 增加 npmClient 字段
```json {5}
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "useWorkspaces": true,
  "version": "0.0.0",
  "npmClient": "pnpm"
}

```

---
transition: slide-down

level: 4
---

# lerna 支持 pnpm

Step 3

去掉 package.json, workspace 字段


---
transition: slide-down

level: 4
---

# lerna 支持 pnpm

Step 4

根目录下新建 pnpm-workspace.yaml 文件

```yaml
packages:
  - "packages/*"
```

---
transition: fade-out

level: 4
---

# lerna 支持 pnpm

Step 5

根目录下执行 
```js
pnpm i
```







