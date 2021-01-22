<template>
  <div id="signUp">
    <el-container>
      <!-- 内容 -->
      <!-- 头像 -->
      <el-header>
        <el-row class="signUpAvatar">
          <el-col :span="24" :offset="0">
            <el-avatar :size="120" :src="require('../../assets/akarin.jpg')">
              <!-- <span style="font-size:50px">User</span> -->
            </el-avatar>
          </el-col>
        </el-row>
      </el-header>
      <!-- 注册输入 -->
      <el-main>
        <el-row id="signUpInput">
          <el-col :span="22" :offset="1">
            <el-form :model="signUpForm" :rules="rules" ref="signUpForm" status-icon>
              <el-form-item label="用户名" prop="name">
                <el-input v-model="signUpForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item type="password" label="密码" prop="password">
                <el-input v-model="signUpForm.password" clearable show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" id="check">
                <el-input type="password" v-model="signUpForm.checkPass" autocomplete="off" clearable></el-input>
              </el-form-item>
              <!-- 表单按钮 -->
              <el-row :gutter="20" class="signUpButton">
                <el-form-item style="margin-top:20px">
                  <el-col>
                    <el-button type="primary" @click="toLogin" round>登录<i class="el-icon-upload el-icon--right"></i></el-button>
                    <el-button type="success" @click="signUp" round>注册<i class="el-icon-document el-icon--right"></i></el-button>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>快来注册一个账号吧</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "signUp",
  data() {
    //表单验证密码相同
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.signUpForm.checkPass !== "") {
          this.$refs.signUpForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.signUpForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 登陆表单绑定
      signUpForm: {
        name: "test",
        password: "123456",
        checkPass: "123456"
      },
      //登录表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "长度至少为3个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {
    signUp() {
      this.$refs.signUpForm.validate(async valid => {
        if (!valid) return;
        const { status, data } = await this.$axios.post("signUp", this.signUpForm);
        console.log(status, data); //data里面有token
        if (status == 422) return this.$message.error("(◎-◎;)!!  注册失败,要不换个名字试试...?");
        this.$message.success("v(｡・ω・｡)ｨｪｨ♪　注册成功！");
        this.toLogin();
      });
    },
    toLogin() {
      this.$store.commit("changeLoginState", 1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/signUp.css";
</style>
