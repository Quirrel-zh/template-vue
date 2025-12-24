# Vue 3 + TypeScript + Tailwind CSS + Ant Design 项目模板

这是一个开箱即用的 Vue 3 项目模板，集成了现代化的开发工具链和最佳实践配置。

## 📋 环境要求

- **Node.js**: `^20.19.0` 或 `>=22.12.0`
- **包管理器**: npm / pnpm / yarn

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

> ⚠️ **重要**: 首次安装后会自动执行 `husky install`，初始化 Git 钩子。

### 开发环境

```bash
npm run dev
```

启动后访问 `http://localhost:5173`（默认端口）

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

### 类型检查

```bash
npm run type-check
```

### 代码检查与格式化

```bash
# 检查代码规范
npm run lint

# 自动修复代码问题
npm run lint:fix

# 格式化所有文件
npm run format
```

## 🐶 Husky Git 钩子说明

本项目使用 Husky 来管理 Git 钩子，确保代码质量。

### 已配置的钩子

#### 1. `pre-commit` - 提交前检查

- **触发时机**: 执行 `git commit` 时
- **执行内容**:
  - 运行 `lint-staged`，对暂存的文件进行检查和格式化
  - 自动修复 ESLint 错误
  - 使用 Prettier 格式化代码
- **影响文件**: `*.{js,ts,vue,css,scss,md,json}`

#### 2. `commit-msg` - 提交信息校验

- **触发时机**: 执行 `git commit` 时
- **执行内容**:
  - 使用 Commitlint 校验提交信息格式
  - 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

### Commit 提交规范

提交信息必须符合以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 类型说明

| 类型       | 说明                            |
| ---------- | ------------------------------- |
| `feat`     | 新功能                          |
| `fix`      | 修复 Bug                        |
| `docs`     | 文档更新                        |
| `style`    | 代码格式调整（不影响代码逻辑）  |
| `refactor` | 代码重构                        |
| `perf`     | 性能优化                        |
| `test`     | 测试相关                        |
| `build`    | 构建系统或外部依赖变更          |
| `ci`       | CI 配置文件和脚本变更           |
| `chore`    | 其他不修改 src 或测试文件的变更 |
| `revert`   | 回滚之前的提交                  |

#### 示例

```bash
# 好的提交示例
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复导航栏在移动端的显示问题"
git commit -m "docs: 更新 README 安装说明"
git commit -m "style: 统一代码缩进格式"
git commit -m "refactor(auth): 重构认证模块"

# 错误的提交示例（会被拒绝）
git commit -m "update"
git commit -m "修复bug"
git commit -m "WIP"
```

### ⚠️ Husky 常见问题

#### 问题 1: 克隆项目后钩子未生效

**原因**: 克隆的项目需要重新安装依赖来初始化 Husky。

**解决方案**:

```bash
npm install
```

#### 问题 2: 钩子执行失败导致无法提交

**临时跳过钩子**（不推荐， 除非你知道你在做什么）:

```bash
# 跳过 pre-commit 和 commit-msg 钩子
git commit --no-verify -m "your message"

# 或使用简写
git commit -n -m "your message"
```

**推荐做法**: 修复代码问题后再提交。

#### 问题 3: Windows 系统钩子权限问题

**解决方案**:

```bash
# 确保钩子文件有执行权限
chmod +x .husky/*
```

#### 问题 4: 卸载 Husky

如果需要移除 Husky：

```bash
# 1. 卸载依赖
npm uninstall husky lint-staged @commitlint/cli @commitlint/config-conventional

# 2. 删除配置文件
rm -rf .husky
rm commitlint.config.cjs

# 3. 从 package.json 中移除相关配置
# 删除 "prepare" script 和 "lint-staged" 配置
```

## 🔧 CI/CD 配置（可选）

### GitHub Actions 配置

创建 `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x, 22.x]

    steps:
      - uses: actions/checkout@v4

      - name: 使用 Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: npm

      - name: 安装依赖
        run: npm ci

      - name: 代码检查
        run: npm run lint

      - name: 类型检查
        run: npm run type-check

      - name: 构建
        run: npm run build

  build:
    runs-on: ubuntu-latest
    needs: lint-and-test

    steps:
      - uses: actions/checkout@v4

      - name: 使用 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22.x
          cache: npm

      - name: 安装依赖
        run: npm ci

      - name: 构建
        run: npm run build

      - name: 上传构建产物
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

### GitLab CI 配置

创建 `.gitlab-ci.yml`:

```yaml
image: node:22-alpine

stages:
  - install
  - lint
  - build
  - deploy

cache:
  paths:
    - node_modules/

install:
  stage: install
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

lint:
  stage: lint
  script:
    - npm run lint
    - npm run type-check
  needs:
    - install

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  needs:
    - lint

deploy:
  stage: deploy
  script:
    - echo "部署到生产环境"
    # 添加你的部署脚本
  only:
    - main
  needs:
    - build
```

### Jenkins Pipeline 配置

创建 `Jenkinsfile`:

```groovy
pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22'
    }

    stages {
        stage('安装依赖') {
            steps {
                sh 'npm ci'
            }
        }

        stage('代码检查') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('类型检查') {
            steps {
                sh 'npm run type-check'
            }
        }

        stage('构建') {
            steps {
                sh 'npm run build'
            }
        }

        stage('归档') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '构建成功！'
        }
        failure {
            echo '构建失败！'
        }
    }
}
```

## 📁 项目结构

```
.
├── .husky/                 # Git 钩子配置
│   ├── pre-commit         # 提交前检查
│   └── commit-msg         # 提交信息校验
├── docs/                   # 项目文档
│   └── STYLE_GUIDE.md     # 样式使用指南（Tailwind + Ant Design）
├── public/                # 静态资源
├── src/
│   ├── assets/           # 资源文件
│   │   └── styles/      # 样式文件
│   │       ├── antd-overrides.less  # Ant Design 全局样式覆盖
│   │       └── tailwind.css         # Tailwind CSS 入口
│   ├── components/       # 组件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia 状态管理
│   ├── views/            # 页面
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── .gitignore
├── commitlint.config.cjs  # Commitlint 配置
├── eslint.config.ts       # ESLint 配置
├── index.html
├── package.json
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── README.md
```

## 🎨 推荐的 IDE 配置

### VS Code

推荐安装以下扩展：

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 官方支持（禁用 Vetur）
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind 智能提示

### VS Code 配置文件

创建 `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"]
}
```

## 🌐 浏览器开发工具

### Chromium 系列（Chrome、Edge、Brave 等）

- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [启用自定义对象格式化](http://bit.ly/object-formatters)

### Firefox

- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [启用自定义对象格式化](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 🔗 TypeScript 支持

TypeScript 默认无法处理 `.vue` 文件的类型信息，因此我们使用 `vue-tsc` 进行类型检查。在编辑器中需要 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件来让 TypeScript 语言服务识别 `.vue` 类型。

## 🎨 样式使用指南

### Tailwind CSS 与 Ant Design 配合使用

本项目同时使用 **Tailwind CSS** 和 **Ant Design Vue**，遵循以下核心原则：

- **Tailwind CSS**：负责页面布局、间距和通用样式
- **Less**：负责 Ant Design 组件样式定制和深度样式覆盖

### 核心原则

#### 何时使用 Tailwind CSS

- ✅ 页面布局（flex、grid、spacing）
- ✅ 响应式设计（md:、lg: 等断点）
- ✅ 通用样式（颜色、字体、边框）
- ✅ 快速原型和间距控制
- ✅ 工具类样式（hover、focus 等状态）

#### 何时使用 Less

- ✅ Ant Design 组件样式覆盖
- ✅ 复杂的组件样式定制
- ✅ 主题变量修改
- ✅ 深度选择器（:deep()）样式
- ✅ 组件级别的样式封装

### ⚠️ 重要：样式优先级问题

当在 Ant Design 组件上直接使用 Tailwind 间距类时，由于 CSS 优先级问题，可能需要特殊处理：

**方案 1：使用 `!` 修饰符（推荐用于简单场景）**

```vue
<a-card class="mb-6!" title="标题">内容</a-card>
```

**方案 2：外层包裹 div（推荐用于复杂布局）**

```vue
<div class="mb-6">
  <a-card title="标题">内容</a-card>
</div>
```

### 📋 样式位置选择：四个判断问题

当需要自定义 Ant Design 组件样式时，使用以下四个问题来判断应该写在哪个位置：

1. **是不是只影响当前页面？**
2. **是否依赖页面结构或上下文？**
3. **将来复用价值是否很低？**
4. **用 Tailwind / token 是否做不到？**

**全部是"是"** → 写在 **Vue 文件的 scoped less**（使用 `:deep()`）  
**否则** → 写在 **全局 `antd-overrides.less`** 或使用 **ConfigProvider**

### 📚 详细文档

**完整样式指南：** 请查看 [`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md) 获取：

- 样式优先级问题的详细分析
- 三种解决方案的对比和选择指南
- 样式位置选择的判断标准（四个问题）
- 实际项目示例和最佳实践
- Scoped Less vs 全局 Less 的对比表格

## 📚 更多配置

- [Vite 配置参考](https://vite.dev/config/)
- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feat/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: 添加某个很棒的特性'`)
4. 推送到分支 (`git push origin feat/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

[MIT License](LICENSE)

## 🙋 常见问题

### Q: 如何禁用 ESLint 某条规则？

A: 在 `eslint.config.ts` 中的 `rules` 对象中添加或修改规则：

```typescript
rules: {
  'no-console': 0, // 0 = off, 1 = warn, 2 = error
}
```

---

**Happy Coding! 🎉**
