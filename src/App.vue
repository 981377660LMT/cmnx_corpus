<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {}
  },

  created() {},
  // created时去除loading层
  mounted() {
    document.body.removeChild(document.getElementById("Loading"))
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>

