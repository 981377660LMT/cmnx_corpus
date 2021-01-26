<template>
  <div id="home" class="rwl-exempt" @keydown.ctrl="test">
    <!-- 关于对话框 -->
    <el-dialog title="关于本站" width="60%" center :visible.sync="centerDialogVisible" @close="centerDialogVisible = false" custom-class="el-opacity">
      <about @shut="childShutDialog" @open="childOpenDrawer"></about>
    </el-dialog>
    <!-- drawer -->
    <el-drawer :title="drawerTitle" direction="ltr" :visible="drawerVisible" custom-class="el-opacity" @close="drawerVisible=false" size="20%">
      <transition name="drawerComponent" mode="out-in">
        <keep-alive>
          <login v-if="loginState==1&&!token"></login>
          <signUp v-else-if="loginState==2&&!token"></signUp>
          <afterLogin v-else-if="loginState==3||token"></afterLogin>
        </keep-alive>
      </transition>
    </el-drawer>
    <!-- 导航nav -->
    <el-header class="nav " ref="nav" :class="{ navShow: isnavShow }">
      <el-row>
        <el-col :span="8"><a href="/" class="left">
            <div class="el-icon-milk-tea icon"></div>
            草莓奶昔的语料库小站
          </a>
        </el-col>
        <el-col :span="16"><a class="right" @click="drawerVisible = true">
            <div class="el-icon-user-solid icon"></div>
            我的
          </a>
          <a class="middle" @click="moveTo(2, 1)">
            <div class="el-icon-star-on icon"></div>
            收藏
          </a>
          <a class="middle" @click="centerDialogVisible = true">
            <div class="el-icon-lollipop icon"></div>
            关于
          </a>
          <a href="https://space.bilibili.com/13169607/article" class="middle" target="_blank">
            <div class="el-icon-edit-outline icon"></div>
            文章
          </a>
          <a class="middle" @click="moveTo(2, 0)">
            <div class="el-icon-folder-opened icon"></div>
            搜索
          </a>
        </el-col>
      </el-row>
    </el-header>

    <!-- 整个应用开始 -->
    <full-page :options="options" ref="fullpage">
      <!-- 第一屏 -->
      <div class="section" id="home1" :style="{
          backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
        }">
        <!-- 中部 -->
        <div class="center_info">
          <h1 class="neon" @click="moveTo(2, 0)">CMNX_CORPUS</h1>
          <!-- 介绍栏 -->
          <div class="head_info">
            <p>
              <i class="el-icon-search" @click="moveTo(2, 0)"></i>
              一个用来查找 <del>(不靠谱)</del> 中日语料的小网站(๑･ิω･ิ)۶
            </p>
            <!-- 社交图片 -->
            <div class="social_info">
              <li id="bg-pre">
                <img class="flipx" src="../assets/next-b.svg" @click="image_index_minus" />
              </li>
              <li class="bilibili">
                <a href="https://space.bilibili.com/13169607" target="_blank" title="bilibili">
                  <img src="../assets/bilibili.png" />
                </a>
              </li>
              <li class="qq">
                <a href="tencent://message/?uin=981377660&Site=JooIT.com&Menu=yes" title="qq">
                  <img src="../assets/qq.png" />
                </a>
              </li>
              <li class="wechat">
                <a href="javaScript:void(0)" title="wechat">
                  <el-popover placement="bottom" trigger="hover" :close-delay="0">
                    <img src="../assets/myWechat.jpg" style="width:100px;height:100px" />
                    <img slot="reference" src="../assets/wechat.png" />
                  </el-popover>
                </a>
              </li>
              <li class="wangyicloud" title="wangyicloud">
                <a href="https://music.163.com/#/my/m/music/playlist?id=560596630" target="_blank">
                  <img src="../assets/wangyiyun.png" />
                </a>
              </li>
              <li id="bg-next">
                <img src="../assets/next-b.svg" @click="image_index_plus" />
              </li>
            </div>
            <!-- 底部标记 -->
            <div class="arrow " @click="moveTo(2, 0)">
              <img src="../assets/arrow.png" />
            </div>
          </div>
        </div>
      </div>
      <!-- glitch特效 -->
      <div class="glitch set">
        <div class="glitch_img" :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"></div>
        <div class="glitch_img" :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"></div>
        <div class="glitch_img" :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"></div>
        <div class="glitch_img" :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"></div>
        <div class="glitch_img" :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"></div>
      </div>
      <!-- 第二屏 -->
      <div class="section" id="home2">
        <!-- 第二屏Corpus -->
        <div class="slide" id="corpus">
          <corpus></corpus>
        </div>
        <!-- 第二屏like -->
        <div class="slide" id="like">
          <like></like>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
// 改变图片的方式：import图片存入数组，style绑定
import steins0 from "../assets/steins0.jpg"
import lovelive0 from "../assets/lovelive0.jpg"
import arknights2 from "../assets/arknights2.jpg"
import arknights3 from "../assets/arknights3.jpg"
import arknights4 from "../assets/arknights4.jpg"
import arknights6 from "../assets/arknights6.jpg"
import arknights7 from "../assets/arknights7.jpg"
import arknights8 from "../assets/arknights8.jpg"
import arknights9 from "../assets/arknights9.jpg"

import Corpus from "../components/Corpus"
import Like from "../components/Like"
import About from "../components/tips/About"

export default {
  data() {
    return {
      isnavShow: false,
      //fullpage插件设置
      options: {
        navigation: false,
        keyboardScrolling: false,
        controlArrows: false,
        normalScrollElements: ".el-drawer,.nav,.aplayer,#myLikeCard",
        // 内容超过满屏时是否显示滚动条
        scrollOverflow: true,
        //Section滚动前的回调函数onLeave (index, nextIndex, direction),从0开始计算
        onLeave: (index, nextIndex, direction) => {
          // console.log(this);
          if (nextIndex.index == 0) {
            this.currentSlide = this.$refs.fullpage.api.getActiveSlide().index
            this.isnavShow = false
          } else {
            if (this.currentSlide == 0) {
              this.isnavShow = true
            }
          }
        },
        // 某一水平滑块滚动前的回调函数，从0开始算起
        onSlideLeave: (anchorLink, index, slideIndex, direction, nextSlideIndex) => {
          // console.log(index.index, slideIndex.index, nextSlideIndex);
          if (slideIndex.index == 1) {
            this.isnavShow = false
          } else {
            this.isnavShow = true
          }
        }
      },
      //主页面图片
      random_arr: this.Lodash.shuffle([steins0, lovelive0, arknights2, arknights3, arknights4, arknights6, arknights7, arknights8, arknights9]),
      random_home_img_index: 0,
      //防止切换图片过快
      isclick1: true,
      isclick2: true,
      //防止nav变化过快
      isscroll: true,
      // 收藏页nav透明度
      isTransparent: 0,
      currentSlide: 0,
      centerDialogVisible: false,
      drawerVisible: false,
      //是否显示注册组件
      isSignUp: false
    }
  },

  created() {
    this.set_bgimg_interval()
  },

  mounted() {},
  computed: {
    loginState: function() {
      return this.$store.state.loginState
    },
    drawerTitle: function() {
      switch (this.$store.state.token || this.loginState) {
        case 1:
          return "登录"
          break
        case 2:
          return "注册"
          break
        default:
          return "我"
          break
      }
    },
    token: function() {
      return this.$store.state.token
    }
  },
  watch: {},
  components: {
    Corpus,
    Like,
    About,
    Login: () => import("../components/beforeEnter/Login"),
    SignUp: () => import("../components/beforeEnter/SignUp"),
    AfterLogin: () => import("../components/beforeEnter/AfterLogin")
  },
  methods: {
    set_bgimg_interval() {
      this.bg_img_interval = window.setInterval(() => {
        this.random_home_img_index = this.random_home_img_index == this.random_arr.length - 1 ? 0 : this.random_home_img_index + 1
      }, 10000)
    },
    image_index_plus() {
      if (this.isclick1) {
        this.isclick1 = false
        this.isclick2 = false
        this.random_home_img_index = this.random_home_img_index == this.random_arr.length - 1 ? 0 : this.random_home_img_index + 1
        clearInterval(this.bg_img_interval)
        this.set_bgimg_interval()
        setTimeout(() => {
          this.isclick1 = true
          this.isclick2 = true
        }, 1000)
      }
    },
    image_index_minus() {
      if (this.isclick2) {
        this.isclick2 = false
        this.isclick1 = false
        this.random_home_img_index = this.random_home_img_index == 0 ? this.random_arr.length - 1 : this.random_home_img_index - 1
        clearInterval(this.bg_img_interval)
        this.set_bgimg_interval()
        setTimeout(() => {
          this.isclick2 = true
          this.isclick1 = true
        }, 1000)
      }
    },
    //滚动到第几页，第几个幻灯片；页面从1计算，幻灯片从0计算;
    moveTo(section, slide) {
      this.$refs.fullpage.api.moveTo(section, slide)
    },
    childShutDialog(value) {
      this.centerDialogVisible = value
    },
    childOpenDrawer(value) {
      this.drawerVisible = value
    }
  }
}
</script>

<style  lang='less' scoped >
@import "../assets/css/glitch.css";
@import "../assets/css/home1.css";
.drawerComponent-enter,
.drawerComponent-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.drawerComponent-enter-to,
.drawerComponent-leave {
  transform: translateX(0);
  opacity: 1;
}

.drawerComponent-enter-active,
.drawerComponent-leave-active {
  transition: all ease-in-out 0.2s;
}
</style>
