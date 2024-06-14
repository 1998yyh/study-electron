import { app, BrowserWindow } from "electron";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
let mainWindow;
app.whenReady().then(() => {
  let config = {
    webPreferences: {
      // nodeIntegration配置项的作用是把 Node.js 环境集成到渲染进程中，contextIsolation配置项的作用是在同一个 JavaScript 上下文中使用 Electron API。
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true
    }
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: "undocked" });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile("dist/index.html");
  }
});
