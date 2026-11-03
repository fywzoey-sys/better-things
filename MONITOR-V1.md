# 好运地图｜半自动更新系统 V1.0（第一期）

流程：**采集候选 → 与正式数据比较 → 生成待审核报告 → 人工确认 → 手动更新正式数据 → 现有部署流程发布。**
第一期只读正式数据，只产出报告；不会修改、提交或发布任何地点信息。

## 现状检查结论（基于仓库实际内容）
| 项目 | 结论 |
|---|---|
| 技术形态 | 纯静态 HTML/CSS/JS，无构建、无 `package.json`、无后端 |
| 正式数据 | `js/data.js`（`BT.CITIES`、`BT.PLACES`，每个地点含 `bookingInfo`）；已审核公告 `data/reviewed-content.json` |
| 城市/地点 | 3 城 19 地点：上海 6、北京 7、杭州 6；ID 如 `sh-longhua`、`bj-yonghegong`、`hz-lingyin`（全部唯一） |
| GitHub | 已连接：`fywzoey-sys/better-things`，分支 `main`（仅 1 个提交） |
| 部署 | 仓库内**没有** `vercel.json`、EdgeOne 配置或任何 CI 文件；`README-V0.6.md` 仅写"可能触发 Vercel"，`BOOKING-V1.md` 写"上传全部文件至静态站点"。**无法从仓库确认实际部署平台**，需你在 Vercel/EdgeOne 后台确认 Git 集成是否开启 |
| 缺失文件 | `README-V0.6.md` 提到的 `.github/workflows/daily-lunar.yml` 在仓库中**不存在**（每日农历自动更新当前并未运行） |
| 有来源链接的地点 | 19/19 个地点都有 `sourceUrl`；其中官方域名 5+ 个（玉佛寺、国子监、五塔寺、灵隐寺、雍和宫官网）；龙华寺为微信公众号文章，白云观为头条文章，其余多为政府/佛协页面。**但没有任何地点的官方预约入口或平台链接已核验**（`official`/`platforms` 全为 pending） |

## 新增文件（未修改任何已有文件）
- `data/monitor/verification.json`：字段级核验状态（未补充/未核验/已核验/需要复核/不适用）、来源、核验时间、最近采集时间、迁移记录。由 `scripts/monitor/migrate-verification.mjs` 从现有数据推导：只有原核验文本以「已核实」开头才为 verified；含 ⚠️ 为 needs_review；预约/开放状态 pending/unknown → unverified。**缺失数据不被解释为不可预约。** 迁移未访问任何外部来源，状态来自你的核验表，未重新核验。
- `data/monitor/sources.json`：来源配置（5 个已有地点的官方页面）。
- `scripts/monitor/run.mjs`（CLI）与 `lib/`：`fetcher`（合法访问）、`extract`（候选提取）、`compare`（新旧比较）、`links`（预约链接检查）、`pipeline`、`report`、`registry`（城市/地点/来源校验）、`sample`（本地模拟来源）、`pr-interface`（第二期预留，纯函数、无网络）。
- `.github/workflows/place-monitor.yml`、`tests/monitor/monitor.test.mjs`、`.gitignore`（忽略 `reports/`）、本文件。

## 运行
```bash
node scripts/monitor/run.mjs --validate          # 仅校验数据/注册表
node scripts/monitor/run.mjs --sample            # 本地模拟来源，不访问外网
node scripts/monitor/run.mjs --live              # 访问 sources.json 中的真实来源
node scripts/monitor/run.mjs --live --places sh-yufo,hz-lingyin   # 只查部分地点
node --test tests/monitor/*.test.mjs             # 测试
```
需要 Node ≥ 20（本地用 22 测试），无 npm 依赖。报告输出到 `reports/<runId>/report.{json,md,html}`。

采集规则：遵守 robots.txt；礼貌 UA；默认每请求间隔 1.5 秒；超时 15 秒、2MB 上限；遇 401/403/412/429 或验证码页面**直接标记 blocked，不绕过、不重试**；不登录；跨站重定向不跟随；拒绝内网地址。每条记录保存来源 URL、获取时间、HTTP 状态、内容 SHA-256、证据原文行。
比较范围（保守）：开放时间（时间段）、门票（免费/金额）、地址、预约政策（需/无需）、官方预约链接。**正式数据里有、来源页面没出现的值不视为失效。**

## GitHub 需要你手动配置/操作
1. 把本分支内容合入 `main`（我这边**没有推送权限**，见下）。
2. 仓库 Settings → Actions → General：允许 Actions 运行（本工作流只需 `contents: read`，无需写权限、无需任何 Secret）。
3. Actions → place-monitor → Run workflow：先 `mode=sample`，再 `mode=live`。
4. 两次均成功且报告可下载后，取消 `place-monitor.yml` 中 `schedule` 三行注释（每周一 09:23 北京时间 = `23 1 * * 1` UTC）。
5. 确认实际部署平台（Vercel/EdgeOne）的 Git 集成；若已正常运行则无需新建部署流程。

## 查看审核报告
Actions → 该次运行 → 页面底部 Artifacts → `place-review-report-<run id>` 下载解压：`report.html`（浏览器直接看）、`report.md`、`report.json`（结构化）。Markdown 版本同时显示在该次运行的 Summary 页。报告字段：地点/城市、变化字段、旧值、候选新值、来源链接与证据、采集时间、候选核验状态（恒为"未核验"）、建议处理、无法确认原因。

## 失败后处理
- 单个来源失败（fetch_failed/blocked/parse_failed）不会使运行失败，会在报告里列出原因；正式数据不受影响。
- 运行本身失败（退出码 1=配置/校验错误，3=正式数据被改动）：看 Actions 日志；校验错误会逐条列出。报告仍会上传（`if: always()`）。
- `blocked`：说明来源拒绝自动访问，请人工访问，不要加绕过手段；必要时在 `sources.json` 设 `"enabled": false`。
- 站点改版导致 `parse_failed`：调整该来源的 `extract` 字段，或改为人工核验。

## 如何确认并更新正式数据（第一期，人工）
1. 打开报告，点开来源链接，人工核对证据。
2. 确认无误：编辑 `js/data.js` 对应地点（开放时间/票务写在 `bookingInfo.openScheduleNote/ticketNote`；预约入口按 `BOOKING-V1.md` 的校验规则）。
3. 同步更新 `data/monitor/verification.json` 中该字段的 `status`、`verifiedAt`、`source`。
4. `node --test tests/monitor/*.test.mjs && node tests/booking.cjs` 通过后提交、走现有部署。
5. 来源冲突/blocked 的条目不要采纳，先人工判断权威来源。已核验字段的候选变化尤其不得直接覆盖。

## 回退
所有改动只是新增文件：删除 `scripts/monitor`、`data/monitor`、`tests/monitor`、`.github/workflows/place-monitor.yml`、`MONITOR-V1.md` 即完全回退，前端不受影响。已发布的数据更新用 `git revert <提交>` 回退。

## 新增城市
1. `js/data.js` 的 `BT.CITIES` 加一项（`id` 小写字母/数字/连字符）；新增地点 `city` 指向它。
2. 在 `data/monitor/verification.json` 为每个新地点加核验记录（可参考现有条目，状态用 `not_supplied`/`unverified`）。
3. 如需自动检查，在 `data/monitor/sources.json` 加来源条目。
4. `node scripts/monitor/run.mjs --validate` 校验。无需复制任何采集器或组件代码（测试 10 验证了这一点）。
（注：`js/live-data.js` 的天气坐标表目前按城市硬编码，属前端现有逻辑，新增城市要展示天气需另行补坐标；本期未改动。）

## 第二期（自动创建 PR）准备条件
- 在 `data/monitor/` 增加人工维护的 `approvals.json`（`approved: ["placeId:field:sourceId", ...]`）；`lib/pr-interface.mjs` 的 `buildPullRequestPlan()` 已能据此生成补丁计划，冲突条目会被自动排除。
- 新建独立工作流，授予 `contents: write`、`pull-requests: write`，只推送到 `data-update/*` 分支并开 PR，不直接改 `main`；`main` 开启分支保护 + 必需审核。
- 写一个"把批准项应用到 `js/data.js` 与 `verification.json`"的受控改写器（建议先改成 JSON 数据文件再改写，避免用正则改 JS）。
- 确认部署集成对 PR 生成 Preview，合并 PR 才等于正式发布。

## 已知限制
- **真实来源未实测**：本次开发环境网络策略禁止访问这 5 个站点（DNS/代理拒绝），所以 `--live` 只验证了"访问失败"路径。真实页面的提取效果（尤其 GBK 页面、需 JS 渲染的页面、灵隐寺列表页而非详情页）需在 GitHub Actions 首次 live 运行后看报告再调规则。部分国内站点可能屏蔽境外 GitHub 机房 IP，若如此会得到 `blocked`/`fetch_failed`，应如实保留，不绕过。
- 提取基于规则，只识别时间段、金额、免费、"地址：…"、预约措辞与含"预约"的链接；复杂表格/图片内的信息不会被识别。
- 微信公众号文章（龙华寺、潭柘寺）和头条文章（白云观）不在首批来源内。
