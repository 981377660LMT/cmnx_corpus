<template>
  <div id="likeScreen" :style="{
      backgroundImage: 'url(' + randomScreen[0] + ')'
    }">
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
              <div class="iconfont icon-Wi-Fi"></div>
            </div>
          </el-col>
          <!-- 中 -->
          <el-col :span="7" :offset="1">
            <div class="navCenter">{{ timeNow }}</div>
          </el-col>
          <!-- 后 -->
          <el-col :span="5" :offset="1">
            <div class="navTail">
              <div class="iconfont icon-lanya"></div>
              <span>100%</span>
              <div class="battery"></div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div id="mainScreen">
        <el-row :gutter="0">
          <el-col :span="20" :offset="1">
            <router-link to="/MyLike">
              <div @mousedown="scaleDown(0)" @mouseup="scaleUp(0)">
                <el-badge :value="likeNumber" :max="99" class="markBadge" type="danger" :class="{ mouseDown: mouseDown['mouseDown_1'] }">
                  <img src="../assets/mark.png" alt="" />
                  <div class="intro">我的收藏</div>
                </el-badge>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!-- 右侧抽屉 -->
      <div id="aside">
        <router-link to="/StudySite">
          <div class="asideItem" @mousedown="scaleDown(1)" @mouseup="scaleUp(1)" :class="{ mouseDown: mouseDown['mouseDown_2'] }">
            <img src="../assets/file.png" alt="svgImg" />
            <div class="intro">学习资料</div>
          </div>
        </router-link>
        <router-link to="/SmallGame">
          <div class="asideItem" @mousedown="scaleDown(2)" @mouseup="scaleUp(2)" :class="{ mouseDown: mouseDown['mouseDown_3'] }">
            <img src="../assets/game.png" alt="" />
            <div class="intro">小游戏</div>
          </div>
        </router-link>
        <router-link to="/Ctm49Site">
          <div class="asideItem" @mousedown="scaleDown(3)" @mouseup="scaleUp(3)" :class="{ mouseDown: mouseDown['mouseDown_4'] }">
            <img src="../assets/cat.png" alt="" />
            <div class="intro">ctm49</div>
          </div>
        </router-link>
        <div class="asideItem" @mousedown="scaleDown(4)" @mouseup="scaleUp(4)" @click="$store.commit('toggleMusic')" :class="{ mouseDown: mouseDown['mouseDown_5'] }">
          <img src="../assets/music.png" alt="" />
          <div class="intro">音乐</div>
        </div>
      </div>
    </div>
    <!-- 路由 -->
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- 音乐播放器 -->
    <transition name="slideAppear">
      <music v-show="showMusic"></music>
    </transition>

  </div>
</template>

<script>
import lovelive0 from "../assets/lovelive0.jpg"
import arknights1 from "../assets/arknights1.jpg"
import arknights2 from "../assets/arknights2.jpg"
import arknights3 from "../assets/arknights3.jpg"
import arknights4 from "../assets/arknights4.jpg"
import arknights5 from "../assets/arknights5.jpg"
import arknights6 from "../assets/arknights6.jpg"
import arknights7 from "../assets/arknights7.jpg"
import arknights8 from "../assets/arknights8.jpg"
import arknights9 from "../assets/arknights9.jpg"

import { shuffle } from "lodash"

export default {
  name: "LikeScreen",
  data() {
    return {
      randomScreen: shuffle([lovelive0, arknights1, arknights2, arknights3, arknights4, arknights5, arknights6, arknights7, arknights8, arknights9]),
      timeNow: "",
      timer: "",
      mouseDown: {
        mouseDown_1: false,
        mouseDown_2: false,
        mouseDown_3: false,
        mouseDown_4: false,
        mouseDown_5: false
      },
      transitionName: "centerAppear"
    }
  },
  created() {
    this.timer = this.getTimeNowInterval()
    if (this.$store.state.token) {
      this.getLike()
    }
  },
  // mounted () {},
  computed: {
    showLikeScreen: function() {
      return this.$route.path == "/home"
    },
    showMusic() {
      return this.$store.state.showMusic
    },
    likeNumber: function() {
      return this.$store.state.likeNumber
    }
  },
  watch: {
    $route(to, from) {
      this.$store.commit("hiddenMusic")
      this.transitionName = to.path == "/MyLike" ? "toMyLike" : "centerAppear"
    }
  },
  methods: {
    async getLike() {
      const { data, status } = await this.$axios.get("/getLike")
      if (status !== 200) return this.$message.error("(◎-◎;)!!  获取收藏失败了...?")
      this.$store.commit("changeLikeNumber", data.likeNumber)
    },
    getTimeNowInterval() {
      setInterval(this.getTimeNow, 500)
    },
    getTimeNow() {
      let date = new Date()
      let hour = date.getHours()
      let minute = (date.getMinutes() + "").padStart(2, "0")
      let ampm = hour >= 12 ? "PM" : "AM"
      this.timeNow = (hour % 12) + ":" + minute + " " + ampm
    },
    scaleDown(index) {
      // console.log(Object.keys(this.mouseDown)[index])
      this.mouseDown[(this.mouseDown, Object.keys(this.mouseDown)[index])] = true
    },
    scaleUp(index) {
      this.mouseDown[(this.mouseDown, Object.keys(this.mouseDown)[index])] = false
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  components: {
    Music: () => import("../components/screen/Music.vue")
  }
}
</script>

<style lang="less" scoped>
@import "../assets/font_ij1ydyo2e3/iconfont.css";
@import "../assets/css/likeScreen.css";
.centerAppear-enter,
.toMyLike-enter {
  transform: scale(0.2);
}
.centerAppear-enter-active,
.toMyLike-enter-active {
  transition: all cubic-bezier(0.215, 0.61, 0.355, 1) 0.35s;
}
.centerAppear-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.toMyliker-enter-to {
  transform: translateX(0);
  opacity: 0.9;
}

.centerAppear-leave,
.toMyLike-leave {
  transform: scale(0.9);
  max-height: 100px;
  opacity: 0.3;
}
.centerAppear-leave-active,
.toMyLike-leave-active {
  transition: all cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;
}
.centerAppear-leave-to,
.toMyLike-leave-to {
  transform: scale(0);
  opacity: 0.1;
  z-index: -100;
}

.slideAppear-enter,
.slideAppear-leave-to {
  transform: translate(-500px, 0);
}

.slideAppear-enter-active,
.slideAppear-leave-active {
  transition: all ease-in-out 0.2s;
}

.slideAppear-leave {
  transform: translate(0, 0);
}
</style>





