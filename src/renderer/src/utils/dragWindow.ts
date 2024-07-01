// renderer/dragWindow.js
// import { ipcRenderer } from 'electron'

const useDrag = () => {
  let animationId
  let mouseX
  let mouseY
  let clientWidth = 0
  let clientHeight = 0
  let draggable = true

  const onMouseDown = (e) => {
    // 右击不移动，只有左击的时候触发
    if (e.button === 2) return
    draggable = true
    // 记录位置
    mouseX = e.clientX
    mouseY = e.clientY
    // 记录窗口大小
    if (Math.abs(document.body.clientWidth - clientWidth) > 5) {
      clientWidth = document.body.clientWidth
    }
    if (Math.abs(document.body.clientHeight - clientHeight) > 5) {
      clientHeight = document.body.clientHeight
    }
    // 注册 mouseup 事件
    document.addEventListener('mouseup', onMouseUp)
    // 启动通信
    animationId = requestAnimationFrame(moveWindow)
  }

  const onMouseUp = () => {
    // 释放锁
    draggable = false
    // 移除 mouseup 事件
    document.removeEventListener('mouseup', onMouseUp)
    // 清除定时器
    cancelAnimationFrame(animationId)
  }

  const moveWindow = () => {
    // 传给主进程位置信息
    window.electron.ipcRenderer.send('window-move', {
      mouseX,
      mouseY,
      width: clientWidth,
      height: clientHeight
    })
    if (draggable) animationId = requestAnimationFrame(moveWindow)
  }

  return {
    onMouseDown
  }
}

export default useDrag
