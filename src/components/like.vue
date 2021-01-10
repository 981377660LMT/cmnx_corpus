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
        <likeScreen></likeScreen>
      </div>
      <div class="home"></div>
      <div class="bottom-bar"></div>
    </div>
  </div>
</template>

<script>
import LikeScreen from "./LikeScreen";
export default {
  name: "Like",
  data() {
    return {};
  },
  created() {},
  // mounted () {},
  computed: {},
  components: {
    LikeScreen
  },
  watch: {},
  methods: {
    goToCorpus() {
      this.$parent.api.moveTo(2, 0);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/devices.min.css";
@import "../assets/css/like.css";
</style>
