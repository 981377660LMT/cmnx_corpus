<template>
  <div id="likeScreen">
    {{ test }}
  </div>
</template>

<script>
export default {
  name: "likeScreen",
  data() {
    return {
      test: window.$homeVue.isnavShow
    };
  },
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../assets/css/likeScreen.css";
</style>
