<template>
  <div id="login">
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
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
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
                  <el-button type="danger" @click="resetLoginForm" round
                    >重置<i class="el-icon-s-release el-icon--right"></i
                  ></el-button>
                  <el-button type="success" @click="login" round
                    >登录<i class="el-icon-upload el-icon--right"></i
                  ></el-button>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
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
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
