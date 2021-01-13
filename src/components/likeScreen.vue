<template>
  <div
    id="likeScreen"
    :style="{
      backgroundImage: 'url(' + randomScreen[0] + ')'
    }"
  >
    <!-- 路由 -->
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- 默认屏幕 -->
    <div v-show="showLikeScreen">
      <!-- 屏幕头部 -->
      <div id="nav">
        <el-row :gutter="50">
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
          <el-col :span="5" :offset="1"
            ><div class="navTail">
              <div class="iconfont icon-lanya"></div>
              <span>100%</span>
              <div class="battery"></div></div
          ></el-col>
        </el-row>
      </div>

      <div id="mainScreen">
        <el-row :gutter="0">
          <el-col :span="20" :offset="1">
            <router-link to="/MyLike">
              <el-badge
                :value="likeNumber"
                :max="99"
                class="markBadge"
                type="danger"
              >
                <img src="../assets/mark.png" alt="" />
                <div class="intro">我的收藏</div>
              </el-badge>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!-- 右侧抽屉 -->
      <div id="aside">
        <router-link to="/StudySite"
          ><div class="asideItem">
            <img src="../assets/file.png" alt="svgImg" />
            <div class="intro">学习资料</div>
          </div></router-link
        >
        <router-link to="/SmallGame">
          <div class="asideItem">
            <img src="../assets/game.png" alt="" />
            <div class="intro">小游戏</div>
          </div></router-link
        >
        <router-link to="/Ctm49Site"
          ><div class="asideItem">
            <img src="../assets/cat.png" alt="" />
            <div class="intro">ctm49</div>
          </div></router-link
        >
        <router-link to="/Music">
          <div class="asideItem">
            <img src="../assets/music.png" alt="" />
            <div class="intro">音乐</div>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
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
      ]),
      likeNumber: 66,
      timeNow: "",
      timer: ""
    };
  },
  created() {
    this.timer = this.getTimeNowInterval();
  },
  // mounted () {},
  computed: {
    showLikeScreen: function() {
      return this.$route.path == "/home";
    }
  },
  watch: {},
  methods: {
    getTimeNowInterval() {
      setInterval(this.getTimeNow, 500);
    },
    getTimeNow() {
      let date = new Date();
      let hour = date.getHours();
      let minute = (date.getMinutes() + "").padStart(2, "0");
      let ampm = hour >= 12 ? "PM" : "AM";
      this.timeNow = (hour % 12) + ":" + minute + " " + ampm;
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/font_ij1ydyo2e3/iconfont.css";
@import "../assets/css/likeScreen.css";
</style>
