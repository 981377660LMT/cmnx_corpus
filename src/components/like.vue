<template>
  <div id="like">
    <!-- 左标记 -->
    <div class="arrow " @click="goToCorpus">
      <img src="../assets/arrow.png" />
    </div>
    <div class="marvel-device iphone8plus silver landscape">
      <div class="top-bar"></div>
      <div class="sleep"></div>
      <div class="volume"></div>
      <div class="camera"></div>
      <div class="sensor"></div>
      <div class="speaker"></div>
      <div class="screen">
        <!-- 默认屏幕 -->
        <likeScreen></likeScreen>
      </div>
      <div class="home" @click="goBackHome"></div>
      <div class="bottom-bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Like',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  components: {
    LikeScreen: () => import('./LikeScreen')
  },
  watch: {},
  methods: {
    goToCorpus() {
      this.$parent.api.moveTo(2, 0)
    },
    goBackHome() {
      this.$store.commit('hiddenMusic')
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/css/devices.min.css';
@import '../assets/css/like.css';
.landscape {
  overflow: hidden;
}
</style>
