---
transition: fade-out
level: 2
---

# pnpm 简介

pnpm是一个包管理工具，他和 npm 以及 yarn 相比具有很多优势。具体来说就是速度快，高效，节省磁盘空间。当使用 npm 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 100 份该相同依赖包的副本。然而，如果是使用 pnpm，依赖包将被 存放在一个统一的位置。

<div grid="~ cols-2 gap-8" mt-10>
<img class="img" src="/pnpm-guangfang.svg"> 
<img class="img" src="/pnpm-download.png"> 
</div>


---
transition: fade-out
level: 3
---

# Pnpm Monorepo

pnpm 也包含 workspace 的功能, 因此可以用来做单一仓库管理。下面还是基于之前的项目做一个pnpm升级改造。

![pnpm](/pnpm.png)


---
transition: fade-out
level: 3
---
# Pnpm Monorepo

还是回顾一下之前的项目结构吧

```markdown
frontend -- 前端项目文件夹
  dist
  mock
  src
  package.json
  package-lock.json
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
package-lock.json
```


---
transition: fade-out
level: 3
---
# Pnpm Monorepo

开干吧。

1. 根目录下创建packages目录
2. 在packages目录中新建前后端目录 frontend, backend, 后文以“子包”相称。
3. 移动相应的前后端代码到前后端目录中。
4. 根目录下新建pnpm-workspace.yaml文件，并在文件里写如下内容：
```js
packages:
  - 'packages/*'
```
5. 修改相应的代码。
```markdown
1. 删除最外层node_modules
2. 删除yarn-lock.json, package-lock.json
3. 删除子包内的node_modules, yarn-lock.json, package-lock.json，pnpm-lock.yaml
4. 子包的package.json里面增加name字段（非常重要），因为pnpm命令都是根据name字段做筛选的。
5. 子包中不需要的依赖可以删除。
6. 迁移后，部分文件引用路径发生了变化，请修改。
```

---
transition: fade-out
level: 3
---
# Pnpm Monorepo
继续上一条

7. 根目录下执行 `pnpm i` , pnpm会分析子包和最外层父包的依赖去安装，公用的依赖会提到父级安装，子包下node_modules只安装自己的依赖。
8. 然后编写父级script, 然后就可以在父级用命令启动子包的项目了（子包命令也需要先写好）。
```js {2,3,4,5,6,7,8}
"scripts": {
  "dev": "pnpm --filter \"./packages/*\" run dev",
  "build": "pnpm --filter \"./packages/*\" run build",
  "test": "pnpm --filter \"./packages/*\" run test",
  "debug": "npm run debug:be & npm run dev:fe",
  "dev:fe": "pnpm --filter=ai-assistant-frontend run dev",
  "dev:be": "pnpm --filter=ai-assistant-backend run dev",
  "debug:be": "pnpm --filter=ai-assistant-backend run debug",
  "prepare": "husky install",
  "preinstall": "npx only-allow pnpm",
  "pre-commit": "lint-staged",
  "prettier:check": "prettier '**/*.{ts,tsx,mts,mjs,less,js}' --check",
  "prettier:write": "prettier '**/*.{ts,tsx,mts,mjs,less,js}' --write"
},
```

---
transition: fade-out
level: 3
---
# Pnpm Monorepo
继续上一条

```
pnpm --filter "./packages/*" run dev 表示packages下的子包运行 dev 命令。
pnpm --filter=ai-assistant-frontend  run dev 表示仅启动名为ai-assistant-frontend的子包的 dev 命令。
```

因此理解了这层意思，你就应该知道上面几个命令的含义了：

- dev: 执行所有子包的 dev 命令。
- build: 执行所有子包的 build 命令。
- test: 执行所有子包的 test 命令。
- dev:fe: 执行ai-assistant-frontend 子包的 dev 命令。
- dev:be: 执行ai-assistant-backend 子包的 dev 命令。
- debug:be: 执行ai-assistant-backend 子包的 debug 命令。
- debug: 执行ai-assistant-backend 子包的 debug 命令 同时 执行ai-assistant-frontend 子包的 dev 命令。


---
transition: fade-out
level: 3
---
# Pnpm Monorepo
继续上一条

**--filter** 还可以在安装命令时使用，比如我想在 `ai-assistant-frontend` 子包中安装 stylelint 依赖用来做css的语法校验，可以这么写：
```js
pnpm add stylelint -D --filter ai-assistant-frontend 
```


-D表示安装在devDependencies下

--filter ai-assistant-frontend表示仅仅在`ai-assistant-frontend` 中安装


^^更多关于pnpm --filter的用法请查阅[官方文档](https://www.pnpm.cn/filtering)^^

---
transition: fade-out
level: 3
---

# Pnpm Monorepo
继续上一条

启动项目试试吧。

![pnpm start](/pnpm-start.png)

<style>
  img {
    width: 450px;
  }
</style>