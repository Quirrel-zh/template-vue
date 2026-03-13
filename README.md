# Vue 3 + TypeScript + Tailwind CSS + Naive UI 项目模板

这是一个开箱即用的 Vue 3 项目模板，集成了现代化的开发工具链和最佳实践配置。

## 环境要求

- **Node.js**: `^24`
- **包管理器**: pnpm (强制)

## 快速开始

### 安装依赖

```bash
pnpm install
```

> **重要**: 首次安装后会自动执行 `husky install`，初始化 Git 钩子。

### 开发环境

```bash
pnpm dev
```

启动后访问 `http://localhost:5173`（默认端口）

### 生产构建

```bash
pnpm build
```

构建产物输出到 `dist` 目录。

### 测试环境构建

```bash
pnpm build --mode test
```

### 类型检查

```bash
pnpm type-check
```

### 代码检查与格式化

```bash
# 检查代码规范
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 格式化所有文件
pnpm format
```

## Husky Git 钩子说明

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

### Husky 常见问题

#### 问题 1: 克隆项目后钩子未生效

**原因**: 克隆的项目需要重新安装依赖来初始化 Husky。

**解决方案**:

```bash
pnpm install
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
pnpm remove husky lint-staged @commitlint/cli @commitlint/config-conventional

# 2. 删除配置文件
rm -rf .husky
rm commitlint.config.cjs

# 3. 从 package.json 中移除相关配置
# 删除 "prepare" script 和 "lint-staged" 配置
```

## 项目结构

```
.
├── .husky/                    # Git 钩子配置
│   ├── pre-commit             # 提交前检查
│   └── commit-msg             # 提交信息校验
├── docs/                      # 项目文档
│   └── STYLE_GUIDE.md         # 样式使用指南（Tailwind + Naive UI）
├── public/                    # 静态资源
│   └── favicon.ico
├── src/
│   ├── api/                   # 接口请求
│   │   ├── core/              # request封装
│   │   └── service/           # 业务接口
│   ├── assets/                # 资源文件
│   │   ├── fonts/             # 字体图标文件
│   │   ├── styles/            # 样式文件
│   │   │   └── tailwind.css   # Tailwind CSS 入口
│   │   └── types/             # 类型声明
│   ├── components/            # 公共组件
│   │   ├── common/            # 通用业务组件
│   │   └── ui/                # 基础 UI 组件
│   ├── composables/           # 组合式函数
│   │   ├── useLocaleEffect.ts # 语言切换副作用
│   │   └── useRem.ts          # rem 自适应缩放
│   ├── config/                # 环境与全局配置
│   ├── constants/             # 常量定义
│   │   └── app.ts
│   ├── locales/               # 国际化资源
│   │   ├── zh-CN.ts
│   │   └── en-US.ts
│   ├── router/                # 路由配置
│   │   └── index.ts
│   ├── stores/                # Pinia 状态管理
│   │   ├── common.ts
│   │   ├── locale.ts
│   │   └── counter.ts
│   ├── utils/                 # 工具函数
│   ├── views/                 # 页面
│   ├── i18n.ts                # i18n 初始化
│   ├── App.vue                # 根组件
│   └── main.ts                # 入口文件
├── .editorconfig              # 编辑器统一配置
├── .gitignore
├── .npmrc                     # npm 配置
├── .nvmrc                     # Node.js 版本锁定
├── .pnpmrc                    # pnpm 配置
├── .prettierrc                # Prettier 配置
├── commitlint.config.cjs      # Commitlint 配置
├── env.d.ts                   # 环境变量类型声明
├── eslint.config.ts           # ESLint 配置
├── index.html
├── package.json
├── tsconfig.json              # TypeScript 配置（根）
├── tsconfig.app.json          # TypeScript 配置（应用）
├── tsconfig.node.json         # TypeScript 配置（Node）
├── vite.config.ts             # Vite 配置
└── README.md
```

## 推荐的 IDE 配置

### VS Code

推荐安装以下扩展：

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 官方支持（禁用 Vetur）
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind 智能提示
- [File Nesting Updater](https://open-vsx.org/extension/antfu/file-nesting) - 自动配置文件嵌套折叠

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

## 浏览器开发工具

### Chromium 系列（Chrome、Edge、Brave 等）

- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [启用自定义对象格式化](http://bit.ly/object-formatters)

## TypeScript 支持

TypeScript 默认无法处理 `.vue` 文件的类型信息，因此我们使用 `vue-tsc` 进行类型检查。在编辑器中需要 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件来让 TypeScript 语言服务识别 `.vue` 类型。

## 样式使用指南

### Tailwind CSS 与 Naive UI 配合使用

本项目采用以下统一策略：

- **Naive UI**：提供组件能力（交互、可访问性、状态）
- **Tailwind CSS**：负责页面视觉与布局（间距、排版、响应式、边框与背景）
- **NConfigProvider**：统一全局主题（字体、字号、颜色 token）

默认情况下，**不再使用 Less 覆盖 Naive UI 内部样式**。

### 实践建议

- 先使用 Naive UI 组件 props（`type`、`size`、`tertiary`、`striped` 等）
- 再在组件外层容器使用 Tailwind 类控制布局与视觉
- 只有在 props + Tailwind + 主题 token 都无法满足时，才新增少量 scoped CSS

### 详细文档

完整说明请查看 [`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md)。

## 更多配置

### 核心框架

- [Vite 配置参考](https://vite.dev/config/)
- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

### 主要依赖库

- [Tailwind CSS 文档](https://tailwindcss.com/docs) — 实用优先的 CSS 框架
- [Naive UI 文档](https://www.naiveui.com/zh-CN/os-theme) — Vue 3 组件库
- [Material Symbols 图标库](https://fonts.google.com/icons) — Google Material 图标（Google Fonts）

## 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feat/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: 添加某个很棒的特性'`)
4. 推送到分支 (`git push origin feat/amazing-feature`)
5. 开启 Pull Request

## 许可证

[MIT License](LICENSE)

## 常见问题

### Q: 如何禁用 ESLint 某条规则？

A: 在 `eslint.config.ts` 中的 `rules` 对象中添加或修改规则：

```typescript
rules: {
  'no-console': 0, // 0 = off, 1 = warn, 2 = error
}
```

---

**Happy Coding!**
