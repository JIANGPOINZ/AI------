# AI 使用人格测试

这是一个 React + Vite + Tailwind CSS 前端项目，用于生成娱乐化的 AI 使用人格测试结果页和可保存的 AI USE ID CARD。

项目完全在浏览器端运行，没有后端、数据库或第三方 API。题库、抽题、计分和人格判定逻辑应保持稳定；部署准备只调整前端展示、静态资源和部署配置。

## 技术栈

- React 19
- Vite
- Tailwind CSS
- html-to-image（仅用于用户点击“保存名片”时导出 PNG）

## 项目结构

```text
.
├─ index.html                 # Vite HTML 入口
├─ package.json               # npm scripts 和依赖
├─ vite.config.js             # Vite 配置
├─ vercel.json                # Vercel 部署配置
├─ public/
│  └─ mascots/                # 角色图片静态资源
├─ scripts/
│  └─ dev-server.mjs          # 固定端口本地开发启动脚本
└─ src/
   ├─ main.jsx                # React 挂载入口
   ├─ App.jsx                 # 页面流程、抽题和结果计算入口
   ├─ components/             # 页面组件和结果卡组件
   └─ data/                   # 题库、场景题和人格展示数据
```

## 重要约束

请不要随意修改以下内容：

- `src/data/questions.js`
- `src/data/scenarios.js`
- 抽题逻辑
- 计分逻辑
- 四字母人格码生成规则
- 16 种人格结果的中文命名和英文命名

角色图片路径必须使用站点根路径，例如：

```js
"/mascots/prompt-commander.png"
"/mascots/optimized/prompt-commander-hero.png"
```

不要使用 Windows 本地绝对路径、`file://` 路径或外链图片。

## 本地运行

安装依赖：

```powershell
npm install
```

启动开发服务器：

```powershell
npm run dev
```

默认访问：

```text
http://127.0.0.1:3000/
```

代码检查：

```powershell
npm run lint
```

生产构建：

```powershell
npm run build
```

本地预览生产构建：

```powershell
npm run preview
```

## 静态资源说明

Vite 会把 `public/` 下的文件复制到生产构建根目录。项目中角色图位于：

```text
public/mascots/
public/mascots/optimized/
```

因此页面中应使用：

```text
/mascots/xxx.png
/mascots/optimized/xxx-hero.png
```

Vercel 上部署后，这些路径也会保持一致。

## 保存名片说明

结果页的 PNG 导出由 `html-to-image` 实现。它只应在用户点击“保存我的 AI 人格名片”按钮时运行，不应在页面加载时自动执行。

## 部署到 Vercel

1. 将代码推送到 GitHub、GitLab 或 Bitbucket。
2. 打开 Vercel Dashboard，点击 `Add New...` -> `Project`。
3. 选择这个仓库并导入。
4. Framework Preset 选择 `Vite`。
5. 确认构建配置：
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. 点击 Deploy。

仓库已提供 `vercel.json`，用于声明 Vite 构建配置和单页应用回退规则。

## 部署前检查清单

- `npm install` 成功
- `npm run build` 成功
- `public/mascots/` 下存在 6 张基础角色图
- `public/mascots/optimized/` 下存在结果页使用的优化图
- 代码中没有本地绝对图片路径
- `html-to-image` 没有放在页面加载或自动执行逻辑中
