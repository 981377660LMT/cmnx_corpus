<template>
  <div id="home">
    <!-- 关于对话框 -->
    <el-dialog
      title="关于本站"
      width="60%"
      center
      :visible.sync="centerDialogVisible"
      @close="closeDialog"
      custom-class="el-opacity"
    >
    </el-dialog>
    <!-- 登陆的drawer -->
    <el-drawer
      direction="ltr"
      :visible="drawerVisible"
      custom-class="el-opacity"
      @close="closeDrawer"
      size="26%"
    >
      <!-- 内容 -->

      <div id="loginInput">
        <!-- 头像 -->
        <el-row class="loginAvatar">
          <el-col :span="24" :offset="0"
            ><el-avatar
              :size="100"
              icon="el-icon-user-solid"
              style="font-size:60px"
            >
            </el-avatar
          ></el-col>
        </el-row>
        <!-- 登陆输入 -->
        <el-row id="loginInput">
          <el-col :span="22" :offset="1">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              status-icon
            >
              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item type="password" label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- 表单按钮 -->
              <el-row :gutter="0" class="loginButton">
                <el-form-item style="margin-top:20px">
                  <el-col>
                    <el-button type="info" @click="resetLoginForm" round
                      >重置<i class="el-icon-s-release el-icon--right"></i
                    ></el-button>
                    <el-button type="primary" @click="login" round
                      >登录<i class="el-icon-upload el-icon--right"></i
                    ></el-button>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <!-- 导航nav -->
    <el-header class="nav" ref="nav" :class="{ navShow: isnavShow }">
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
            <div class="arrow " @click="moveTo(2, 0)">
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
    //表单验证密码相同
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isnavShow: false,
      // currentSection: this.$refs.fullpage.api.getActiveSection().index,
      // cuurentSlide: this.$refs.fullpage.api.getActiveSlide().index,
      //fullpage插件设置
      options: {
        navigation: false,
        keyboardScrolling: false,
        controlArrows: false,
        navigationTooltips: ["Home", "Corpus"],
        // anchors: ["firstPage", "secondPage", "thirdPage"],
        // 内容超过满屏时是否显示滚动条，需要jquery.slimscroll插件
        scrollOverflow: true,
        // 是否显示横向幻灯片的导航
        slidesNavigation: false,
        //Section滚动前的回调函数onLeave (index, nextIndex, direction),从0开始计算
        onLeave: function(index, nextIndex, direction) {
          // console.log(this.item.id);  //this是
          // console.log(window.$vue.isnavShow);
          // console.log(index, nextIndex, direction);
          if (nextIndex.index == 0) {
            window.$homeVue.currentSlide = window.$homeVue.$refs.fullpage.api.getActiveSlide().index;
            window.$homeVue.isnavShow = false;
          } else {
            if (window.$homeVue.currentSlide == 0) {
              window.$homeVue.isnavShow = true;
            }
          }
        },
        // 某一水平滑块滚动前的回调函数，从0开始算起
        onSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex) {
          // console.log(index.index, slideIndex.index, nextSlideIndex);
          if (slideIndex.index == 1) {
            window.$homeVue.isnavShow = false;
          } else {
            window.$homeVue.isnavShow = true;
          }
        }
        // afterLoad (anchorLink, index)到某一屏后的回调函数
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
      // 收藏页nav透明度
      isTransparent: 0,
      // 记录当前的Slide，初始为0
      currentSlide: 0,
      // 关于对话框显示
      centerDialogVisible: false,
      // 登陆显示
      drawerVisible: false,
      // 登陆表单绑定
      ruleForm: {
        name: "",
        password: "",
        checkPass: ""
      },
      //登录表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  created() {
    //挂载vue到window
    window.$homeVue = this;
    this.set_bgimg_interval();
  },
  mounted() {},
  computed: {},
  watch: {},
  components: {
    corpus,
    like
  },
  methods: {
    // 得到当前的section数与slide数
    // getSectionAndSlide() {
    //   console.log(this.onLeave);
    // },
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
    //滚动到第几页，第几个幻灯片；页面从1计算，幻灯片从0计算;
    moveTo(section, slide) {
      this.$refs.fullpage.api.moveTo(section, slide);
    },
    closeDialog() {
      this.centerDialogVisible = false;
    },
    closeDrawer() {
      this.drawerVisible = false;
    },
    //表单提交
    login() {},
    // 重置表单
    resetLoginForm() {}
  }
};
</script>

<style  lang='less' scoped >
@import "../assets/css/glitch.css";
@import "../assets/css/home1.css";
</style>
