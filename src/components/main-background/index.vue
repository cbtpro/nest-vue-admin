<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'main-background',
})
import defaultBackgroundImage from '@/assets/images/background-images/window.jpg'

export interface Props {
  /** 背景图片地址 */
  src: string
}

const src = defineModel({ type: String, default: defaultBackgroundImage })

const styles = computed(() => {
  return {
    backgroundImage: `url(${src.value})`,
  }
})
</script>

<template>
  <div :style="styles" class="main-background"></div>
</template>

<style lang="scss" scoped>
.main-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
