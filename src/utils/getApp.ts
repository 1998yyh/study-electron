import path from 'path'
import fs from 'fs'
import { exec } from 'child_process'

import plist from 'plist'

console.log('plist', plist)

const getIconFile = (appFileInput) => {
  return new Promise((resolve, reject) => {
    // 根据 app 路径，获取 Info.plist 路径
    const plistPath = path.join(appFileInput, 'Contents', 'Info.plist')
    // 解析 plist 文件
    plist.readFile(plistPath, (err, data) => {
      // 如果不存在 CFBundleIconFile 则返回 macOS 系统默认图标
      if (err || !data.CFBundleIconFile) {
        return resolve(
          '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericApplicationIcon.icns'
        )
      }
      // 获取 icns 图标路径
      const iconFile = path.join(appFileInput, 'Contents', 'Resources', data.CFBundleIconFile)

      // 依次通过 文件名、.icns、.tiff 来寻找 app icon
      const iconFiles = [iconFile, iconFile + '.icns', iconFile + '.tiff']
      const existedIcon = iconFiles.find((iconFile) => {
        return fs.existsSync(iconFile)
      })
      // 找不到也返回 macOS 系统默认图标
      resolve(
        existedIcon ||
          '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericApplicationIcon.icns'
      )
    })
  })
}

const tiffToPng = (iconFile, pngFileOutput) => {
  return new Promise((resolve, reject) => {
    // tiff、icns 图标转 png
    exec(
      `sips -s format png '${iconFile}' --out '${pngFileOutput}' --resampleHeightWidth 64 64`,
      (error) => {
        error ? reject(error) : resolve(null)
      }
    )
  })
}

// 传入 app 路径，返回对应 app 图片路径
const app2png = (appFileInput, pngFileOutput) => {
  return getIconFile(appFileInput).then((iconFile) => {
    return tiffToPng(iconFile, pngFileOutput)
  })
}

export default app2png
