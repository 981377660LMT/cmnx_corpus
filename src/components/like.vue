<template>
  <div id="like">
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
import likeScreen from "./likeScreen.vue";
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  // mounted () {},
  computed: {},
  components: {
    likeScreen
  },
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../assets/css/devices.min.css";
@import "../assets/css/like.css";
</style>
