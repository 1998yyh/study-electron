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


主进程的代码写好之后，只有编译过之后才能被 Electron 加载，我们是通过 Vite 插件的形式来完成这个编译工作和加载工作的，如下代码所示：

``` ts
//plugins\devPlugin.ts
import { ViteDevServer } from "vite";
export let devPlugin = () => {
  return {
    name: "dev-plugin",
    configureServer(server: ViteDevServer) {
      require("esbuild").buildSync({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        external: ["electron"],
      });
      server.httpServer.once("listening", () => {
        let { spawn } = require("child_process");
        let addressInfo = server.httpServer.address();
        let httpAddress = `http://${addressInfo.address}:${addressInfo.port}`;
        let electronProcess = spawn(require("electron").toString(), ["./dist/mainEntry.js", httpAddress], {
          cwd: process.cwd(),
          stdio: "inherit",
        });
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};

```