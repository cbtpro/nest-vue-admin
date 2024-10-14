<template>
  <div
    class="mac-window"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
  >
    <div class="title-bar" @mousedown="startDrag">
      <div class="window-buttons">
        <span class="close" @click="closeWindow"></span>
        <span class="minimize"></span>
        <span class="maximize"></span>
      </div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onBeforeUnmount } from 'vue'

interface Props {
  title: string
}
defineOptions({
  name: 'mac-window',
})
defineProps<Props>()

// 窗口位置
const position = ref({ x: 100, y: 100 })
const isDragging = ref(false)
const offset = ref({ x: 0, y: 0 })

// 拖动开始
const startDrag = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).classList.contains('title-bar')) return
  isDragging.value = true
  offset.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y,
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDrag)
}

// 拖动事件
const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) return
  position.value = {
    x: event.clientX - offset.value.x,
    y: event.clientY - offset.value.y,
  }
}

// 停止拖动
const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
}

// 关闭窗口功能（目前只是控制台输出，可以扩展为隐藏或关闭功能）
const closeWindow = () => {
  console.log('Window closed')
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.mac-window {
  position: absolute;
  z-index: 1;
  width: 400px;
  height: 300px;
  min-width: 400px;
  min-height: 300px;
  background-color: #f1f1f1;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  user-select: none;
  resize: both;
}

.title-bar {
  height: 30px;
  background-color: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  cursor: move;
}

.window-buttons {
  display: flex;
  gap: 8px;
}

.window-buttons span {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ff5f57; /* close */
  cursor: pointer;
  &:hover {
    background: #cc2c26;
  }
}

.window-buttons span.minimize {
  background-color: #ffbd2e; /* minimize */
  &:hover {
    background: #c28719;
  }
}

.window-buttons span.maximize {
  background-color: #28c940; /* maximize */
  &:hover {
    background: #1f942e;
  }
}

.title {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #333;
  user-select: none;
  pointer-events: none;
}

.window-content {
  padding: 10px;
  height: calc(100% - 30px);
  background-color: white;
  overflow: auto;
}
</style>
