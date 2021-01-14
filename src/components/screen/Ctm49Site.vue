<template>
  <div id="Ctm49Site" class="screenContainer">
    <div id="Loading" v-if="showLoading">
      <div class="ball-beat">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <iframe src="https://m.ctm49.com" frameborder="0" ref="iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: "Ctm49Site",
  data() {
    return {
      showLoading: true
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
  beforeRouteEnter(to, from, next) {
    // 这里还无法访问到组件实例，this === undefined
    //要在next里访问vue实例
    next(function(vm) {
      vm.showLoading = true;
      var listener = window.setInterval(function() {
        if (!vm.$refs.iframe.contentDocument) {
          vm.showLoading = false;
          clearInterval(listener);
        }
      }, 300);
    });
  }
};
</script>

<style lang="less" scoped>
.screenContainer {
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9999;
}

.screenContainer iframe {
  width: 100%;
  height: 100%;
}
</style>
