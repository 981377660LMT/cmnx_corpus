<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    document.body.removeChild(document.getElementById('Loading'))
  },
}
</script>

<style scoped>
/* 加的 */
/* #app {
  height: 100%;
  overflow: auto;
} */
</style>
