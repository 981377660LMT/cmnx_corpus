<template>
  <div id="StudySite" class="screenContainer">
    <iframe src="https://resx.cf/" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "StudySite",
  data() {
    return {};
  },
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.screenContainer {
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9999;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
