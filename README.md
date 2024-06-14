# study-electron

## 项目创建

创建vue项目

``` bash
npm create vite@latest electron-jue-jin -- --template vue-ts
```
安装electron 依赖

``` bash
npm install electron -D
```


### 主进程

``` ts
//src\main\mainEntry.ts
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(process.argv[2]);
});

```