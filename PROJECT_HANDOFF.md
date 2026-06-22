# 项目交接文档

## 1. 项目基本信息

- 项目名称：AI 使用人格测试
- 项目目标：做一个轻盈、有趣、非严肃心理量表风格的前端测评应用，用户完成测试后获得一张 `AI Use ID Card / AI 使用人格名片`。
- 最终要解决的问题：帮助用户理解自己与 AI 协作时的偏好类型，例如更偏向启动灵感、明确指挥、共创讨论、审计验证、任务外包或情绪整理。
- 当前开发阶段：本地前端 MVP 已完成，已重构结果页为可保存名片体验；仍需要做真实浏览器交互验收，尤其是保存 PNG、移动端布局和完整答题路径。
- 技术栈：React 19、Vite 7、Tailwind CSS 3、ESLint 9、html-to-image。
- 运行环境：Windows + PowerShell。
- 项目所在目录：`D:\szu\人机传播\AI使用人格测试`
- 当前分支或版本状态：`.git/HEAD` 显示当前分支为 `main`。当前环境没有可用 `git` 命令，因此未能确认工作区状态。
- 是否有线上部署：未发现线上部署配置；当前无线上部署。
- 是否涉及数据库：不涉及。
- 是否涉及第三方 API：不涉及。
- 是否涉及敏感配置或密钥：未发现 `.env`、API Key、Token、密码、私钥或 Cookie。

## 2. 当前项目进度

### 模块 A：首页与整体视觉

- 状态：已完成代码，构建已验证；真实浏览器视觉验收仍建议补做。
- 相关文件：
  - `src/App.jsx`
  - `src/index.css`
  - `src/components/Mascot.jsx`
  - `src/data/personalityProfiles.js`
- 核心逻辑：
  - 首页标题：`AI 使用人格测试`
  - 副标题：`你和 AI 的相处方式，可能比你想象中更有性格。`
  - 主按钮：`开始探索我的 AI 使用人格`
  - 首页展示六个 mascot 浮动头像，形成 `AI Creature Index` 图鉴感。
- 当前问题：
  - 最新视觉没有完成截图级 QA。
  - 本地开发服务可能没有常驻运行，需要手动启动。
- 下一步：
  - 启动 dev server 后检查桌面和手机宽度首页是否美观、文字是否溢出。

### 模块 B：固定题库

- 状态：已完成，后续多轮开发均未修改题库。
- 相关文件：
  - `src/data/questions.js`
  - `src/data/scenarios.js`
- 核心逻辑：
  - `questions.js`：48 道量表题，6 个维度，每维 8 道，其中 2 道反向题。
  - `scenarios.js`：12 道情境题，每题 A-F 六个选项。
- 当前问题：
  - 不要改题库文本。
  - 不要在页面或组件中硬编码另一套题目。
- 下一步：
  - 如题库结构异常，只报错，不自动补题。

### 模块 C：抽题与答题流程

- 状态：已完成，lint/build 已验证。
- 相关文件：
  - `src/App.jsx`
- 核心逻辑：
  - 每次开始测试时调用 `createSession()`。
  - 量表题从 48 道中抽 24 道，每个维度 4 道。
  - 每个维度反向题数量保持 1-2 道。
  - 量表题通过 `createBalancedQuestionOrder()` 做 4 轮交错展示，每轮 6 个维度各 1 道，避免同类题集中。
  - 情境题从 12 道中随机抽 3 道。
  - 答题页为单题展示，选择后自动进入下一题。
- 当前问题：
  - 抽题随机性逻辑已构建验证，但没有自动化测试覆盖分布规则。
- 下一步：
  - 建议补一个轻量测试脚本或开发期校验，重复抽样检查每维 4 道、反向题 1-2 道。

### 模块 D：计分与判定

- 状态：已完成，构建已验证。
- 相关文件：
  - `src/App.jsx`
- 核心逻辑：
  - `calculateResult(scaleAnswers, scenarioAnswers, session)` 负责计分和判定。
  - 正向题按 1-5 分。
  - 反向题按 `6 - 原始分`。
  - 每个维度原始分范围 4-20。
  - 百分制转换：`(原始分 - 4) / 16 * 100`。
  - 情境题不参与主分，只用于结果页补充说明。
  - 判定规则包括单一主型、主副型、双核心、三重复合、均衡使用型、未显著型。
- 当前问题：
  - 用户曾提到 `scoring.js`，但当前项目没有 `scoring.js` 文件；计分逻辑仍在 `src/App.jsx`。
  - 如果后续要拆 `scoring.js`，必须只移动代码，不改变规则。
- 下一步：
  - 若要提升可维护性，可在用户允许后把计分/判定逻辑从 `App.jsx` 抽到 `src/utils/scoring.js` 或 `src/scoring.js`，但必须保持行为完全一致。

### 模块 E：结果页 / AI Use ID Card

- 状态：已完成代码，lint/build 已验证；保存 PNG 真实点击未验证。
- 相关文件：
  - `src/components/ResultPage.jsx`
  - `src/components/ResultShareCard.jsx`
  - `src/components/PersonalityIndex.jsx`
  - `src/components/Mascot.jsx`
  - `src/data/personalityProfiles.js`
- 核心逻辑：
  - 桌面端左侧展示 `AI Creature Index / AI 使用人格图鉴`。
  - 桌面端右侧展示可保存 AI 使用人格名片。
  - 手机端图鉴横向滑动，名片在下方。
  - 名片包含：
    - `AI USE ID CARD`
    - mascot 大图
    - 英文类型名
    - 中文解释名
    - 一句话画像
    - 主维度得分
    - 副维度得分
    - 结果清晰度
    - 典型使用方式标签
    - 推荐 Prompt
    - 测试日期
    - AI-ID，例如 `CC-086-72`
  - 雷达图保留在辅助信息区。
  - `html-to-image` 的 `toPng()` 用于导出名片 PNG。
- 当前问题：
  - `保存我的 AI 人格名片` 功能只经过构建验证，未在真实浏览器中点击下载验证。
  - 导出尺寸当前通过 `pixelRatio: 2` 实现高清导出，不是强制固定 1080x1350。
- 下一步：
  - 浏览器中完整答题一次，点击保存，确认 PNG 内容完整、无裁切、中文字体正常。

### 模块 F：Mascot 形象

- 状态：已完成代码，构建已验证；视觉细节未截图 QA。
- 相关文件：
  - `src/components/Mascot.jsx`
  - `src/data/personalityProfiles.js`
- 核心逻辑：
  - 6 个 mascot 全部用本地 SVG/CSS 实现，不依赖外链图片。
  - 类型包括：
    - Spark Starter：头顶小火花的圆润小生物
    - Prompt Commander：狐狸舰长
    - Co-Creator：泡泡小龙
    - Critical Auditor：猫头鹰审计员
    - Task Delegator：搬运任务的小熊
    - Emotion Reflector：发光水母
- 当前问题：
  - 形象是否足够“可爱但不幼稚”需要用户视觉确认。
- 下一步：
  - 根据用户反馈微调 SVG 比例、颜色和表情。

## 3. 文件结构说明

- `package.json`
  - 作用：定义项目依赖和脚本。
  - 当前状态：已配置。
  - 重要脚本：
    - `dev`: `node scripts/dev-server.mjs`
    - `build`: `vite build`
    - `lint`: `eslint .`
    - `preview`: `vite preview`
  - 修改注意：不要把 `dev` 改回直接 `vite`，之前为了规避启动参数和端口问题改成了本地脚本。

- `src/main.jsx`
  - 作用：React 入口文件。
  - 当前状态：正常。
  - 最重要逻辑：`createRoot(...).render(...)`。
  - 修改注意：不要把业务逻辑塞进这里。

- `src/App.jsx`
  - 作用：应用主流程、抽题、计分、判定、首页、答题页、情境题页、关于页。
  - 当前状态：核心业务逻辑集中在这里，lint/build 通过。
  - 重要函数：
    - `validateQuestionBank()`
    - `createBalancedQuestionOrder()`
    - `createSession()`
    - `calculateResult()`
    - `Home()`
    - `ScalePage()`
    - `ScenarioPage()`
    - `App()`
  - 修改注意：
    - 不要改变 `calculateResult()` 的计分和判定规则，除非用户明确要求。
    - 不要修改题库导入来源。
    - 如果抽离 scoring 文件，必须保持规则等价。

- `src/data/questions.js`
  - 作用：固定 48 道量表题。
  - 当前状态：关键题库文件，不应修改。
  - 重要导出：`dimensions`、`questions`。
  - 修改注意：不要新增、删除、改写题目；不要优化题目表达；不要改变 `reverse` 字段。

- `src/data/scenarios.js`
  - 作用：固定 12 道情境题。
  - 当前状态：关键题库文件，不应修改。
  - 重要导出：`scenarioTypes`、`scenarios`。
  - 修改注意：不要修改题目和选项文本。A-F 对应关系用于情境题补充说明，不参与主分。

- `src/data/personalityProfiles.js`
  - 作用：集中存放前端展示用的人格资料、英文名、中文解释名、颜色、标签、推荐 Prompt、混合型英文名。
  - 当前状态：新视觉系统核心配置文件。
  - 重要导出：
    - `PERSONA_ORDER`
    - `PERSONA_PROFILES`
    - `SPECIAL_PROFILES`
    - `HYBRID_NAMES`
    - `getProfile()`
    - `formatPersonaName()`
    - `getResultDisplay()`
  - 修改注意：可以改展示文案和颜色；不要把这里当题库；内部 key 使用题库中的原始人格中文名做映射，不能随便改 key。

- `src/components/Mascot.jsx`
  - 作用：用本地 SVG/CSS 绘制六种 mascot。
  - 当前状态：已实现六种基础角色。
  - 重要函数：
    - `SparkMascot()`
    - `CommanderMascot()`
    - `CreatorMascot()`
    - `AuditorMascot()`
    - `DelegatorMascot()`
    - `ReflectorMascot()`
    - `Mascot()`
  - 修改注意：不依赖外链图片；可以优化 SVG，但不要引入远程资源。

- `src/components/PersonalityIndex.jsx`
  - 作用：结果页左侧/手机顶部的 AI Creature Index。
  - 当前状态：已完成。
  - 重要组件：`PersonalityIndex({ activePersonas })`
  - 修改注意：桌面端应作为左侧图鉴；手机端横向滑动；当前结果高亮，其他半透明；均衡型时全部高亮。

- `src/components/ResultShareCard.jsx`
  - 作用：可导出的 AI USE ID CARD 名片区域。
  - 当前状态：已完成。
  - 重要组件/函数：`ResultShareCard(...)`、`ScorePill(...)`
  - 修改注意：`cardRef` 是导出 PNG 的目标；如果改 DOM 层级，要确认 `html-to-image` 仍能完整导出。

- `src/components/ResultPage.jsx`
  - 作用：结果页总装组件，负责布局、雷达图、图鉴、名片、复制摘要、保存 PNG。
  - 当前状态：已完成，构建通过；保存 PNG 未人工点击验证。
  - 重要函数：
    - `createAiId()`
    - `todayLabel()`
    - `RadarChart()`
    - `ScoreList()`
    - `ResultPage()`
    - `copySummary()`
    - `saveCard()`
  - 修改注意：`saveCard()` 使用 `html-to-image` 的 `toPng()`；导出 PNG 需要真实浏览器验证；雷达图不能抢名片视觉中心。

- `scripts/dev-server.mjs`
  - 作用：自定义 Vite dev server 启动脚本。
  - 当前状态：已配置固定 host/port。
  - 重要逻辑：
    - `host: "127.0.0.1"`
    - `port: 3000`
    - `strictPort: false`
  - 修改注意：这是为规避启动参数和本地环境问题而加的，不要随便删除。

- `src/index.css`
  - 作用：Tailwind 基础引入和全局视觉样式。
  - 当前状态：正常。
  - 重要内容：`.mesh-bg`、`.glass`、`.answer-ring`。
  - 修改注意：整体视觉基调在这里，避免改成儿童游戏风格或严肃量表风格。

- `vite.config.js`
  - 作用：Vite 配置。
  - 当前状态：只配置 React 插件。

- `tailwind.config.js`
  - 作用：Tailwind 扫描路径和主题扩展。
  - 当前状态：正常。

- `postcss.config.js`
  - 作用：PostCSS/Tailwind/autoprefixer 配置。
  - 当前状态：正常。

- `eslint.config.js`
  - 作用：ESLint flat config。
  - 当前状态：只做基础检查。

## 4. 核心逻辑说明

用户从 `index.html` 进入，React 在 `src/main.jsx` 挂载 `App.jsx`。

运行流程：

1. 用户看到首页 `Home()`。
2. 点击 `开始探索我的 AI 使用人格`。
3. `startTest()` 调用 `createSession()`。
4. `createSession()` 先调用 `validateQuestionBank()` 校验题库数量和结构。
5. 量表题按 6 个维度分别抽题，每个维度 4 道，并保证每个维度反向题数量 1-2 道。
6. `createBalancedQuestionOrder()` 把 24 道题分成 4 轮，每轮 6 个维度各 1 道，降低题目集中疲劳。
7. 用户在 `ScalePage()` 单题作答。
8. 每次选择后通过 `window.setTimeout(..., 180)` 自动进入下一题。
9. 量表题答完后进入 `ScenarioPage()`。
10. 情境题也单题展示，选完 3 道后进入结果页。
11. `calculateResult()` 负责计算分数和判定结果。
12. `ResultPage()` 把计算结果转换成 AI Use ID Card 视觉展示。

容易出 bug 的地方：

- `questions.js` 和 `scenarios.js` 的中文题库不要动。
- `calculateResult()` 同时承担计分和判定，未来重构时必须非常谨慎。
- `getResultDisplay()` 依赖 `primaryPersonas`，如果判定逻辑改动，需要确认它仍能拿到正确主类型。
- `ResultShareCard` 的导出依赖 DOM 和 CSS，复杂样式可能导致 PNG 导出不完整。
- `createBalancedQuestionOrder()` 默认每维正好 4 道，如果抽题规则变动，要同步修改轮次数。
- `strictPort: false` 可能导致端口被占用时实际启动到非 3000 端口。

技术债：

- 没有单独的 `scoring.js`，计分逻辑仍在 `App.jsx`。
- 没有自动化测试。
- PNG 导出功能未做真实点击验收。
- 没有截图级视觉回归。
- ESLint 配置较轻量，不是完整 React lint 规则集。

## 5. 环境变量与配置

当前未发现 `.env` 或 `.env.example`。

- 当前无必需环境变量。
- 数据库连接配置：无。
- API 配置：无。
- 代理配置：无项目内配置；浏览器/系统代理状态不确定。
- 部署配置：无。
- 敏感配置或密钥：未发现。

配置文件：

- `scripts/dev-server.mjs`
  - 用途：启动 Vite dev server。
  - host：`127.0.0.1`
  - port：`3000`
  - `strictPort: false`

## 6. 启动、运行、测试方式

### 安装依赖

```powershell
npm.cmd install
```

状态：已验证可执行。

注意：

- 最近安装 `html-to-image` 后，npm audit 提示 `1 low severity vulnerability`。
- 未执行 `npm audit fix`。

### 本地启动前端

```powershell
npm.cmd run dev
```

启动成功后应该看到类似：

```text
Local: http://127.0.0.1:3000/
```

访问：

```text
http://127.0.0.1:3000/
```

或：

```text
http://localhost:3000/
```

### 代码检查

```powershell
npm.cmd run lint
```

状态：已验证通过。

### 构建

```powershell
npm.cmd run build
```

状态：已验证通过。

### 后端、数据库、部署

- 后端启动：无。
- 数据库启动：无。
- 部署命令：无。

### 常见启动失败原因

- 3000 端口没有服务监听，浏览器会显示 `ERR_CONNECTION_REFUSED`。
- 当前 Codex 沙箱中默认 Node 路径 `D:\justi\Documents\Node.js\node.exe` 曾触发权限错误：
  - `EPERM: operation not permitted, lstat 'D:\justi\Documents'`
- PowerShell 环境变量 `Path`/`PATH` 重复键曾导致 `Start-Process` 失败。
- 后台启动命令可能被沙箱回收；建议在用户本机终端手动运行 `npm.cmd run dev`。

## 7. 已知问题与坑

### 问题：浏览器无法访问本地页面

- 表现：`http://127.0.0.1:3000` 或 `localhost:3000` 显示连接失败。
- 可能原因：dev server 没有启动或已退出。
- 已尝试方案：直接 HTTP 检查端口、多种后台启动方式、自定义 `scripts/dev-server.mjs`。
- 有效方案：用户在本机终端运行 `npm.cmd run dev`。
- 无效方案：在 Codex 沙箱里反复用 `Start-Process` 后台常驻服务；使用默认 `D:\justi\Documents\Node.js\node.exe` 后台启动。
- 相关文件：`scripts/dev-server.mjs`、`package.json`
- 新 AI 下一步：先运行 `npm.cmd run dev`，如果失败看终端错误；如果成功但浏览器打不开，再检查端口和代理。

### 问题：PNG 保存功能未真实点击验证

- 表现：代码已实现，构建通过，但未确认浏览器下载结果。
- 可能原因：需要真实 DOM、浏览器下载权限、字体渲染和 html-to-image 兼容。
- 已尝试方案：`npm.cmd run build` 已通过。
- 有效方案：未验证。
- 相关文件：`src/components/ResultPage.jsx`、`src/components/ResultShareCard.jsx`
- 新 AI 下一步：启动 dev server，完整答题到结果页，点击保存，检查 PNG 是否下载、是否清晰、是否裁切。

### 问题：无自动化测试

- 表现：抽题规则和计分规则没有测试文件。
- 可能原因：项目快速迭代，尚未补测试。
- 已尝试方案：手工 lint/build。
- 有效方案：建议新增轻量脚本验证抽题和计分。
- 相关文件：`src/App.jsx`

### 问题：`scoring.js` 不存在

- 表现：用户限制中提到不要修改 `scoring.js`，但当前项目没有这个文件。
- 可能原因：计分逻辑目前写在 `src/App.jsx`。
- 有效方案：如果未来需要，可在用户确认后抽离，但不得改变规则。
- 相关文件：`src/App.jsx`

### 问题：视觉没有截图级 QA

- 表现：构建通过，但移动端、桌面端视觉细节未充分确认。
- 可能原因：当前环境没有完成稳定浏览器截图验证。
- 有效方案：需要浏览器手动或 Playwright 截图。
- 相关文件：
  - `src/components/ResultPage.jsx`
  - `src/components/ResultShareCard.jsx`
  - `src/components/PersonalityIndex.jsx`
  - `src/components/Mascot.jsx`
  - `src/App.jsx`

### 问题：npm audit 仍有低危提示

- 表现：安装 `html-to-image` 后 npm audit 提示 `1 low severity vulnerability`。
- 已尝试方案：未执行修复。
- 无效方案：不要盲目运行 `npm audit fix --force`。
- 相关文件：`package.json`、`package-lock.json`

## 8. 最近修改记录

### 修改 1：创建题库目录和数据文件

- 修改原因：用户要求先只创建固定题库文件。
- 修改文件：`src/data/questions.js`、`src/data/scenarios.js`
- 改了什么：创建数据文件，后续录入固定题库。
- 是否验证：已检查题量和结构。

### 修改 2：开发第一版 React + Tailwind 应用

- 修改原因：用户要求基于固定题库开发完整网页应用。
- 修改文件：`package.json`、`index.html`、配置文件、`src/main.jsx`、`src/index.css`、`src/App.jsx`
- 改了什么：首页、量表页、情境题页、结果页、关于页；抽题、计分、判定、雷达图、结果卡片。
- 是否验证：lint/build 通过。

### 修改 3：修复本地访问问题

- 修改原因：用户浏览器显示无法访问 localhost。
- 修改文件：`scripts/dev-server.mjs`、`package.json`
- 改了什么：`dev` 改为 `node scripts/dev-server.mjs`，固定 Vite host 为 `127.0.0.1`，port 为 `3000`。
- 是否验证：曾验证 HTTP 200；当前服务不保证常驻。

### 修改 4：单题答题流程

- 修改原因：用户不希望向下滚动做题。
- 修改文件：`src/App.jsx`
- 改了什么：量表题和情境题改为一次展示一道，选择后自动进入下一题。
- 是否验证：lint/build 通过。

### 修改 5：增强题序随机性并隐藏测量标签

- 修改原因：用户反馈同类型题目集中，且不希望题目显示测量内容。
- 修改文件：`src/App.jsx`、`README.md`
- 改了什么：新增 `createBalancedQuestionOrder()`；移除题目上的维度/人格类型提示。
- 是否验证：lint/build 通过。

### 修改 6：前端命名系统改为英文类型名 + 中文解释名

- 修改原因：用户不希望过于花哨或儿童化的中文名字。
- 修改文件：`src/App.jsx`、`README.md`
- 改了什么：六种基础类型改为 Spark Starter 等英文名，中文解释名保留。
- 是否验证：lint/build 通过。

### 修改 7：重构为 AI Use ID Card 结果体验

- 修改原因：用户要求结果页像人格档案 + 可保存名片。
- 修改文件：
  - `src/App.jsx`
  - `src/components/Mascot.jsx`
  - `src/components/PersonalityIndex.jsx`
  - `src/components/ResultPage.jsx`
  - `src/components/ResultShareCard.jsx`
  - `src/data/personalityProfiles.js`
  - `package.json`
  - `package-lock.json`
  - `README.md`
- 改了什么：新增 mascot SVG、图鉴、可导出名片、结果页组件、html-to-image。
- 是否验证：lint/build 通过；PNG 下载未点击验证。

## 9. 下一步开发计划

### 下一步最优先做什么？

- 目标：完整浏览器验收 AI Use ID Card 流程。
- 原因：当前代码构建通过，但最新结果页、PNG 保存、移动端布局还没有真实浏览器验收。
- 涉及文件：
  - `src/components/ResultPage.jsx`
  - `src/components/ResultShareCard.jsx`
  - `src/components/Mascot.jsx`
  - `src/App.jsx`
- 具体步骤：
  1. 运行 `npm.cmd run dev`。
  2. 打开 `http://127.0.0.1:3000/`。
  3. 完整答完 24 道量表题和 3 道情境题。
  4. 检查结果页桌面布局：左图鉴、右名片。
  5. 切换手机宽度检查图鉴横滑和名片布局。
  6. 点击 `保存我的 AI 人格名片`。
  7. 打开导出的 PNG，确认不裁切、不乱码、不缺 mascot。
  8. 点击 `复制结果摘要`，确认剪贴板内容。
- 验收标准：
  - 页面无报错。
  - 单题答题流顺畅。
  - 结果页视觉中心是名片。
  - PNG 成功下载且清晰。
  - 手机端无文字溢出。
  - 题库文本无变化。

### 第二优先级：补抽题与计分稳定性测试

- 目标：用自动化脚本验证抽题频率和计分规则。
- 原因：抽题和计分是产品可信度核心，现在只有构建验证。
- 具体步骤：
  1. 考虑把 `createSession()`、`calculateResult()` 抽到独立文件。
  2. 或先写临时验证脚本，导入题库并复刻抽样规则。
  3. 重复抽样 100 次检查：
     - 总量 24。
     - 每维 4。
     - 每维反向题 1-2。
     - 情境题 3。
  4. 构造固定答案检查反向计分和百分制。
- 验收标准：
  - 自动验证全部通过。
  - 不改变现有判定输出。

### 第三优先级：视觉细节微调

- 目标：根据用户反馈调整 mascot 和名片设计。
- 原因：当前 mascot 是第一版 SVG/CSS，可能还需要更软、更认真、更有 AI 小生物感。
- 具体步骤：
  1. 先收集用户对六个 mascot 的具体反馈。
  2. 只改 `Mascot.jsx` 和 `personalityProfiles.js` 的颜色/文案。
  3. 不动题库和计分。
  4. 每改一轮做桌面/手机截图。
- 验收标准：
  - 用户确认“不幼稚但有趣”。
  - 结果名片导出仍正常。

### 现在不要做的任务

- 不要改题库。
- 不要改计分和判定规则。
- 不要新增后端。
- 不要接数据库。
- 不要接第三方 AI API。
- 不要做登录、用户系统、历史记录。
- 不要引入外链图片或远程素材。
- 不要直接执行 `npm audit fix --force`。

### 容易过度开发的功能

- mascot 复杂动画。
- 社交平台分享适配。
- 完整设计系统。
- 多语言系统。
- 后端保存结果。

### 先验证再写代码的地方

- 保存 PNG 是否真实可用。
- 手机端名片是否裁切或文字溢出。
- `html-to-image` 对 Tailwind 渐变、SVG、中文字体的导出效果。
- dev server 是否稳定运行在用户本机。
- 如果要抽离 scoring 文件，先写对照测试，确认输出完全一致。
