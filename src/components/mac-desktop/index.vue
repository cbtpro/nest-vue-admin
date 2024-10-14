<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
// import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import IconFinder from '@/assets/images/dock/finder.svg'
import IconLaunchPad from '@/assets/images/dock/launchpad.png'
import IconSafari from '@/assets/images/dock/safari.svg'
import IconSetting from '@/assets/images/dock/settings.png'
import IconTerminal from '@/assets/images/dock/terminal.svg'
import IconGithub from '@/assets/images/dock/github.svg'
import IconAppstore from '@/assets/images/dock/appstore.svg'
import IconPhotos from '@/assets/images/dock/photos.svg'
import IconTrash from '@/assets/images/dock/trash.png'

defineOptions({
  name: 'mac-desktop',
})
const datas = []

// 使用双重循环填充 0 到 11
let count = 0
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 3; j++) {
    datas.push({
      x: j,
      y: i,
      w: 1,
      h: 1,
      i: `${count}`,
    })
    count++
  }
}
const layout = ref(datas)
const myArray = ref(
  [
    {
      label: 'Finder',
      icon: IconFinder,
    },
    {
      label: 'Launch',
      icon: IconLaunchPad,
    },
    {
      label: 'App Store',
      icon: IconAppstore,
    },
    {
      label: 'Safari',
      icon: IconSafari,
    },
    {
      label: 'Settings',
      icon: IconSetting,
    },
    {
      label: 'Terminal',
      icon: IconTerminal,
    },
    {
      label: 'Github',
      icon: IconGithub,
    },
    {
      label: 'Photos',
      icon: IconPhotos,
    },
    {
      label: 'Trash',
      icon: IconTrash,
    },
  ].map((item, i) => ({
    ...item,
    id: i,
  })),
)
</script>

<template>
  <div class="mac-desktop">
    <!-- <grid-layout
      v-model:layout="layout"
      :auto-size="false"
      :col-num="12"
      :max-rows="12"
      :row-height="40"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        {{ item.i }}
      </grid-item>
    </grid-layout> -->
    <draggable
      v-model="myArray"
      group="application"
      item-key="id"
      class="dragable"
    >
      <template #item="{ element }">
        <div class="application">
          <DesktopIcon :title="element.label" :icon="element.icon" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="scss" scoped>
.mac-desktop {
  position: relative;
  max-width: 100vw;
  max-height: 90vw;
  touch-action: none;
  z-index: 1;
  .application {
    cursor: default;
  }
  .dragable {
    position: absolute;
    right: 0px;
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 80vh;
    padding: 10px;
    gap: 10px;
  }
}
</style>
