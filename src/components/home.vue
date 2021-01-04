<template>
  <div id="home">
    <!-- 导航固定在整个应用的头部 -->
    <el-header class="nav" ref="nav">
      <el-row>
        <el-col :span="8"
          ><a href="/" class="left"
            ><div class="el-icon-milk-tea icon"></div>
            草莓奶昔的语料库小站
          </a>
        </el-col>
        <el-col :span="16"
          ><a class="right" @click="drawerVisible = true"
            ><div class="el-icon-user-solid icon"></div>
            登录
          </a>
          <a class="middle" @click="moveTo(2, 1)"
            ><div class="el-icon-star-on icon"></div>
            收藏
          </a>
          <a class="middle" @click="centerDialogVisible = true"
            ><div class="el-icon-lollipop icon"></div>
            关于
          </a>
          <a
            href="https://space.bilibili.com/13169607/article"
            class="middle"
            target="_blank"
            ><div class="el-icon-edit-outline icon"></div>
            文章
          </a>
          <a class="middle" @click="moveTo(2, 0)"
            ><div class="el-icon-folder-opened icon"></div>
            搜索
          </a>
        </el-col>
      </el-row>
    </el-header>
    <!-- 关于对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
      custom-class="el-dialog-about"
    >
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        test
      </span>
    </el-dialog>
    <!-- 登陆的drawer -->
    <el-drawer
      direction="ltr"
      :visible.sync="drawerVisible"
      custom-class="demo-drawer"
    >
    </el-drawer>
    <!-- 整个应用开始 -->
    <full-page :options="options" ref="fullpage">
      <!-- 第一屏 -->
      <div
        class="section"
        id="home1"
        :style="{
          backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
        }"
      >
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
                <img
                  class="flipx"
                  src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                  @click="image_index_minus"
                />
              </li>
              <li class="bilibili">
                <a
                  href="https://space.bilibili.com/13169607"
                  target="_blank"
                  title="bilibili"
                >
                  <img src="../assets/bilibili.png" />
                </a>
              </li>
              <li class="qq">
                <a
                  href="tencent://message/?uin=981377660&Site=JooIT.com&Menu=yes"
                  title="qq"
                >
                  <img src="../assets/qq.png" />
                </a>
              </li>
              <li class="wechat">
                <a href="javaScript:void(0)" title="wechat">
                  <el-popover
                    placement="bottom"
                    trigger="hover"
                    close-delay="0"
                  >
                    <img
                      src="../assets/myWechat.jpg"
                      style="width:100px;height:100px"
                    />
                    <img slot="reference" src="../assets/wechat.png" />
                  </el-popover>
                </a>
              </li>
              <li class="wangyicloud" title="wangyicloud">
                <a
                  href="https://music.163.com/#/my/m/music/playlist?id=560596630"
                  target="_blank"
                >
                  <img src="../assets/wangyiyun.png" />
                </a>
              </li>
              <li id="bg-next">
                <img
                  src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                  @click="image_index_plus"
                />
              </li>
            </div>
            <!-- 底部标记 -->
            <div class="arrow " @click="SectionDown">
              <img src="../assets/arrow.png" />
            </div>
          </div>
        </div>
      </div>
      <!-- glitch特效 -->
      <div class="glitch set">
        <div
          class="glitch_img"
          :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"
        ></div>
        <div
          class="glitch_img"
          :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"
        ></div>
        <div
          class="glitch_img"
          :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"
        ></div>
        <div
          class="glitch_img"
          :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"
        ></div>
        <div
          class="glitch_img"
          :style="{
            backgroundImage: 'url(' + random_arr[random_home_img_index] + ')'
          }"
        ></div>
      </div>
      <!-- 第一屏登录页 -->
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
import steins0 from "../assets/steins0.jpg";
import steins1 from "../assets/steins1.jpg";
import steins2 from "../assets/steins2.jpg";
import steins3 from "../assets/steins3.jpg";
import steins4 from "../assets/steins4.jpg";
import corpus from "./corpus.vue";
import like from "./like.vue";

export default {
  data() {
    return {
      //fullpage插件设置
      options: {
        navigation: false,
        keyboardScrolling: false,
        controlArrows: false,
        navigationTooltips: ["Home", "Corpus"],
        // 内容超过满屏时是否显示滚动条，需要jquery.slimscroll插件
        scrollOverflow: true,
        // 是否显示横向幻灯片的导航
        slidesNavigation: false
      },
      //主页面图片都可能出现，steins0的图片出现几率最大
      random_arr: [steins0, steins1, steins2, steins3, steins4].sort(() => {
        return 0.5 - Math.random();
      }),
      random_home_img_index: 0,
      //防止切换图片过快
      isclick1: true,
      isclick2: true,
      //防止nav变化过快
      isscroll: true,
      // 关于对话框显示
      centerDialogVisible: false,
      // 登陆显示
      drawerVisible: false
    };
  },
  created() {
    this.set_bgimg_interval();
  },
  mounted() {
    //mounted相当于jquery里的ready?
    // 这里监听不到scroll事件，用mousewheel强行代替
    window.addEventListener("mousewheel", this.navChangeStyle);
  },
  computed: {},
  watch: {},
  components: {
    corpus,
    like
  },
  methods: {
    test() {
      alert(1);
    },
    // 背景图片计时器挂载到vue对象上
    set_bgimg_interval() {
      this.bg_img_interval = window.setInterval(() => {
        this.random_home_img_index =
          this.random_home_img_index == this.random_arr.length - 1
            ? 0
            : this.random_home_img_index + 1;
      }, 10000);
    },
    //点击→
    image_index_plus() {
      if (this.isclick1) {
        this.isclick1 = false;
        this.isclick2 = false;
        this.random_home_img_index =
          this.random_home_img_index == this.random_arr.length - 1
            ? 0
            : this.random_home_img_index + 1;
        clearInterval(this.bg_img_interval);
        this.set_bgimg_interval();
        setTimeout(() => {
          this.isclick1 = true;
          this.isclick2 = true;
        }, 1000);
      }
    },
    // 点击←
    image_index_minus() {
      if (this.isclick2) {
        this.isclick2 = false;
        this.isclick1 = false;
        this.random_home_img_index =
          this.random_home_img_index == this.random_arr.length - 1
            ? 0
            : this.random_home_img_index + 1;
        clearInterval(this.bg_img_interval);
        this.set_bgimg_interval();
        setTimeout(() => {
          this.isclick2 = true;
          this.isclick1 = true;
        }, 1000);
      }
    },
    // nav栏渐变:能否得到当前section的值?
    navChangeStyle(e) {
      if (this.isscroll) {
        this.isscroll = false;
        if (e.deltaY > 0) {
          document.querySelector(".nav").style.backgroundColor =
            "rgba(255, 255, 255, 0.65)";
        } else {
          document.querySelector(".nav").style.backgroundColor =
            "rgba(255, 255, 255, 0.1)";
        }
        setTimeout(() => {
          this.isscroll = true;
        }, 780);
      }
    },
    //滚动到第几页，第几个幻灯片；页面从1计算，幻灯片从0计算;同时改变nav,且定位到头部
    moveTo(section, slide) {
      this.$refs.fullpage.api.moveTo(section, slide);
      document.querySelector(".nav").style.backgroundColor =
        "rgba(255, 255, 255, 0.65)";
      // this.$refs.fullpage.api.fitToSection();
    }
  }
};
</script>

<style  lang='less' scoped >
@import "../assets/css/glitch.css";
@import "../assets/css/home1.css";
</style>
