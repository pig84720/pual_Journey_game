# 快速啟動指南

## 一鍵啟動

```bash
# 1. 安裝依賴
npm install

# 2. 啟動開發伺服器
npm run dev
```

開啟瀏覽器訪問：http://localhost:5173

## 常用指令

```bash
# 開發模式（熱重載）
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview

# 執行測試
npm test

# 執行測試 UI
npm test:ui

# 程式碼檢查
npm run lint
```

## 快速測試流程

1. **選擇旅程**
   - 點擊頂部「第一次傳道」或「第二次傳道」

2. **拖放卡片**
   - 從右側卡片池拖曳「城市卡」到左側對應槽位
   - 拖曳「事件卡」到城市下方的事件軌道

3. **檢核答案**
   - 點擊底部「對答案」按鈕
   - 正確顯示綠框，錯誤顯示紅框
   - 全對會觸發拉炮慶祝動畫

4. **其他功能**
   - 「顯示答案」：自動排好正確順序
   - 「重置」：清除所有已放置的卡片
   - 「立即檢核模式」：放下卡片即顯示對/錯

## 鍵盤快捷鍵

- `Tab` - 移動焦點到下一個元素
- `Shift + Tab` - 移動焦點到上一個元素
- `Space` - 拖起當前聚焦的卡片
- `方向鍵` - 移動拖起的卡片
- `Enter` - 放下卡片到當前位置
- `Esc` - 取消拖放

## 故障排除

### 無法安裝依賴
```bash
# 清除 node_modules 與 lock 檔案
rm -rf node_modules package-lock.json
npm install
```

### 開發伺服器無法啟動
```bash
# 確認 Node.js 版本 >= 18
node --version

# 切換到正確版本（如果使用 nvm）
nvm use 18
```

### 建置錯誤
```bash
# 檢查 TypeScript 錯誤
npx tsc --noEmit

# 清除建置快取
rm -rf dist .vite
npm run build
```

## 資料夾結構說明

```
pual_Journey_game/
├── src/
│   ├── components/     # React 元件
│   ├── data/          # 題庫資料
│   ├── store/         # Zustand 狀態管理
│   ├── utils/         # 工具函式
│   ├── styles/        # 全域樣式
│   └── tests/         # 測試檔案
├── public/            # 靜態資源
├── dist/              # 建置輸出（建置後產生）
└── README.md          # 完整說明文件
```

## 下一步

- 閱讀 [README.md](./README.md) 了解完整功能
- 查看 [ARCHITECTURE.md](./ARCHITECTURE.md) 了解技術架構
- 探索 `src/data/journeys.ts` 查看題庫資料

## 獲取幫助

遇到問題？
1. 檢查 [README.md](./README.md) 的常見問題
2. 查看 [ARCHITECTURE.md](./ARCHITECTURE.md) 了解實作細節
3. 提交 Issue 到 GitHub

---

祝你學習愉快！🎉
