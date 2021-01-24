<template>
  <div id="SmallGame" class="screenContainer">
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
    <iframe src="https://www.hhtjim.com/wp-content/uploads/2017/02/T-RexGame.html" frameborder="0" ref="iframe">
    </iframe>
    <transition name="maskDisappear">
      <div id="mask" v-if="showLoading"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SmallGame",
  data() {
    return {
      showLoading: true
    }
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
      vm.showLoading = true
      var listener = window.setInterval(function() {
        if (!vm.$refs.iframe.contentDocument) {
          vm.showLoading = false
          clearInterval(listener)
        }
      }, 300)
    })
  }
}
</script>

<style lang="less" scoped>
.screenContainer {
  width: 100%;
  height: 100%;
  background-color: #cacaca;
}

iframe {
  width: 100%;
  height: 100%;
}

#mask {
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  position: absolute;
  background-color: black;
  z-index: 50;
}

.maskDisappear-leave {
  opacity: 0.2;
}

.maskDisappear-leave-active {
  transition: all cubic-bezier(0.215, 0.61, 0.355, 1) 1.2s;
}

.maskDisappear-leave-to {
  opacity: 0;
}
</style>
