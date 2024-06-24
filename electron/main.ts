// src\main\mainEntry.ts
import { app, BrowserWindow } from "electron";


// ELECTRON_DISABLE_SECURITY_WARNINGS 用于设置渲染进程开发者调试工具的警告，这里设置为 true 就不会再显示任何警告了。
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
let mainWindow: BrowserWindow;

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
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: "undocked" });
  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    mainWindow.loadFile('dist/index.html');
  }


  mainWindow.on('closed',()=>{console.log('closed')})
  mainWindow.on('focus',()=>{console.log('focus')})
  mainWindow.on('show',()=>{console.log('show')})
  mainWindow.on('hide',()=>{console.log('hide')})
  mainWindow.on('minimize',()=>{console.log('minimize')})
});



app.on('will-finish-launching',()=>{
  console.log('will-finish-launching');
})