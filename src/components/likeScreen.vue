<template>
  <div
    id="likeScreen"
    :style="{
      backgroundImage: 'url(' + randomScreen[0] + ')'
    }"
  >
    <!-- 屏幕头部 -->
    <div id="nav">
      <el-row :gutter="0">
        <el-col :span="8" :offset="0">
          <!-- 前 -->
          <div class="navHead">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div id="wifi">Wi-Fi</div>
            <div class="iconfont icon-Wi-Fi"></div></div
        ></el-col>
        <!-- 中 -->
        <el-col :span="7" :offset="1"
          ><div class="navCenter">{{ timeNow }}</div></el-col
        >
        <!-- 后 -->
        <el-col :span="5" :offset="0"
          ><div class="navTail">
            <div class="iconfont icon-lanya"></div>
            <span>100%</span>
            <div class="battery"></div></div
        ></el-col>
      </el-row>
    </div>
    <!-- 右侧抽屉 -->
    <div id="aside"></div>
  </div>
</template>

<script>
import steins0 from "../assets/steins0.jpg";
import lovelive0 from "../assets/lovelive0.jpg";
import arknights1 from "../assets/arknights1.jpg";
import arknights2 from "../assets/arknights2.jpg";
import arknights3 from "../assets/arknights3.jpg";
import arknights4 from "../assets/arknights4.jpg";
import arknights5 from "../assets/arknights5.jpg";
import arknights6 from "../assets/arknights6.jpg";
import arknights7 from "../assets/arknights7.jpg";
import arknights8 from "../assets/arknights8.jpg";
import arknights9 from "../assets/arknights9.jpg";

export default {
  name: "LikeScreen",
  data() {
    return {
      randomScreen: this.Lodash.shuffle([
        steins0,
        lovelive0,
        arknights1,
        arknights2,
        arknights3,
        arknights4,
        arknights5,
        arknights6,
        arknights7,
        arknights8,
        arknights9
      ])
    };
    // iconFont:{
    //   '125': 'iconfont icon-yonghuguanli',
    // },
  },
  created() {
    document.querySelector("#like .home").addEventListener("click", () => {
      alert(1);
    });
  },
  // mounted () {},
  computed: {
    timeNow: function() {
      let date = new Date();
      let hour = date.getHours();
      let minute = (date.getMinutes() + "").padStart(2, "0");
      let ampm = hour >= 12 ? "PM" : "AM";
      return (hour % 12) + ":" + minute + " " + ampm;
    }
  },
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../assets/font_ij1ydyo2e3/iconfont.css";
@import "../assets/css/likeScreen.css";
</style>
