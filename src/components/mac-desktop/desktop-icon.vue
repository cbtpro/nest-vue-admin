<script setup lang="ts">
defineOptions({
  name: 'desktop-icon',
})

const title = defineModel('title', {
  type: String,
  default: '',
})
const icon = defineModel('icon', {
  type: String,
  required: true,
})
</script>

<template>
  <div class="desktop-icon">
    <div class="icon">
      <img :src="icon" :alt="title" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.desktop-icon {
  --icon-width: 60px;
  display: flex;
  flex-direction: column;
  .icon {
    width: var(--icon-width);
    height: var(--icon-width);
    img {
      width: inherit;
      height: inherit;
    }
  }
  .title {
    margin-top: 4px;
    font-size: 10px;
    color: #fff;
    font-weight: 500;
    text-wrap: nowrap;
    word-break: break-word;
    text-align: center;
  }
}
</style>
