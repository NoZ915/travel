# Travel Records

個人旅遊紀錄網站 — 記錄每一段旅程的風景與回憶。

## 技術選型

### Astro

選擇 [Astro](https://astro.build/) 作為框架，原因如下：

- **SEO 友善**：Astro 預設產出純靜態 HTML，搜尋引擎可以完整索引每一頁內容，不需要 JavaScript 才能渲染（不像 SPA 框架）
- **Content Collections**：內建 Markdown 內容管理系統，新增旅程只需要新增一個 `.md` 檔案，不需要改任何程式碼
- **零 JavaScript 輸出**：產出的頁面不含多餘的 JS bundle，載入速度極快
- **GitHub Pages 完美支援**：產出靜態檔案，直接部署到 GitHub Pages，不需要後端
- **內建 Sitemap**：透過 `@astrojs/sitemap` 自動產生 sitemap.xml，進一步提升 SEO

### 為什麼不選其他框架？

| 框架 | 不選的原因 |
|------|-----------|
| Next.js | 主要優勢在 SSR/ISR，純靜態匯出 SEO 雖然也好，但對內容網站來說 Astro 更輕量 |
| Nuxt | 同上，且生態系偏向 Vue 應用開發 |
| Hugo/Jekyll | SEO 也好，但模板語法彈性較低，擴充性不如 Astro |
| Gatsby | 已停止積極維護，生態系萎縮 |

## 專案結構

```
src/
├── content/
│   └── trips/           # Markdown 旅程內容（新增旅程放這裡）
│       └── 2024-japan.md
├── components/
│   └── TripCard.astro   # 旅程卡片元件
├── layouts/
│   └── BaseLayout.astro # 共用版面（含 SEO meta tags）
├── pages/
│   ├── index.astro      # 首頁
│   └── trips/
│       ├── index.astro      # 旅程列表頁
│       └── [...slug].astro  # 旅程詳細頁（動態路由）
└── content.config.ts    # Content Collection 定義
```

## 如何新增旅程

在 `src/content/trips/` 新增一個 `.md` 檔案，例如 `2026-japan.md`：

```markdown
---
title: 2026 日本關西之旅
description: 大阪、京都、奈良五日遊
destination: 大阪
country: 日本
startDate: "2026-07-01"
endDate: "2026-07-05"
tags:
  - 大阪
  - 京都
---

## Day 1 — 7/1 抵達大阪

- 內容寫在這裡...
```

儲存後網站會自動產生對應頁面，不需要修改任何程式碼。

## 啟動專案

### 前置需求

- [Node.js](https://nodejs.org/) >= 22.12.0

### 安裝與開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（預設 http://localhost:4321）
npm run dev

# 建置正式版本
npm run build

# 預覽建置結果
npm run preview
```

## 部署到 GitHub Pages

1. 將程式碼推送到 GitHub repository
2. 到 repo 的 **Settings → Pages → Source** 選擇 **GitHub Actions**
3. 推送到 `main` branch 後會自動觸發部署（已包含 `.github/workflows/deploy.yml`）
4. 記得修改 `astro.config.mjs` 中的 `site` 和 `base` 為你的實際值：

```js
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/your-repo-name',
});
```

## 指令列表

| 指令 | 說明 |
|------|------|
| `npm install` | 安裝依賴 |
| `npm run dev` | 啟動開發伺服器 `localhost:4321` |
| `npm run build` | 建置正式版至 `./dist/` |
| `npm run preview` | 本地預覽建置結果 |
