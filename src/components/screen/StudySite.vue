<template>
  <div id="StudySite" class="screenContainer">
    <div id="loadingTips" v-if="showLoading">
      {{ this.$store.getters.getLoadingTips[this.randomIndex]["content"] }}
    </div>
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
    <iframe src="https://resx.cf/" frameborder="0" ref="iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: 'StudySite',
  data() {
    return {
      showLoading: true,
      randomIndex: 0
    }
  },
  created() {
    console.log(this.$store)
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
  beforeRouteEnter(to, from, next) {
    // 这里还无法访问到组件实例，this === undefined
    //要在next里访问vue实例
    next(function(vm) {
      vm.showLoading = true
      vm.randomIndex = Math.floor(Math.random() * 50)
      var listener = window.setInterval(function() {
        if (!vm.$refs.iframe.contentDocument) {
          vm.showLoading = false
          clearInterval(listener)
        }
      }, 600)
    })
  }
}
</script>

<style lang="less" scoped>
.screenContainer {
  width: 100%;
  height: 100%;
  background-color: black;
}

iframe {
  width: 100%;
  height: 100%;
}

#loadingTips {
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 900px;
  color: white;
  text-align: center;
  font-size: 20px;
  font-family: 'pixChar';
  z-index: 100;
}

@font-face {
  font-family: 'pixChar';
  src: url('../../assets/pixChar.ttf');
}
</style>


