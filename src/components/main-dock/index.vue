<script setup lang="ts">
import Dock from 'primevue/dock'
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
  name: 'main-dock',
})

const items = [
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
]
const position = defineModel('position', {
  default: 'bottom',
})
</script>

<template>
  <div class="main-dock">
    <Dock :model="items" :position="position">
      <template #itemicon="{ item }">
        <img
          v-tooltip.top="item.label"
          :alt="item.label"
          :src="item.icon"
          style="width: 100%"
        />
      </template>
    </Dock>
  </div>
</template>

<style lang="scss" scoped>
.main-dock {
  z-index: 0;
}
</style>
