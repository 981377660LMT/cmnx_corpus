<template>
  <div id="login">
    <el-container>
      <!-- 内容 -->
      <!-- 头像 -->
      <el-header>
        <el-row class="loginAvatar">
          <el-col :span="24" :offset="0">
            <el-avatar :size="120" :src="require('../../assets/akarin.jpg')">
              <!-- <span style="font-size:50px">User</span> -->
            </el-avatar>
          </el-col>
        </el-row>
      </el-header>
      <!-- 登陆输入 -->
      <el-main>
        <el-row id="loginInput">
          <el-col :span="22" :offset="1">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon>
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item type="password" label="密码" prop="password">
                <el-input v-model="loginForm.password" clearable show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" id="check">
                <el-input type="password" v-model="loginForm.checkPass" autocomplete="off" clearable></el-input>
              </el-form-item>
              <!-- 表单按钮 -->
              <el-row :gutter="20" class="loginButton">
                <el-form-item style="margin-top:20px">
                  <el-col>
                    <el-button type="primary" @click="signUp" round>注册<i class="el-icon-document el-icon--right"></i></el-button>
                    <el-button type="success" @click="login" round>登录<i class="el-icon-upload el-icon--right"></i></el-button>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>登录以使用收藏功能</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    //表单验证密码相同
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.loginForm.checkPass !== '') {
          this.$refs.loginForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 登陆表单绑定
      loginForm: {
        name: 'test',
        password: '123456',
        checkPass: '123456'
      },
      //登录表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            message: '长度至少为3个字符',
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {
    //登录
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        const { status, data } = await this.$axios.post('login', this.loginForm)
        console.log(status, data) //data里面有token
        if (status !== 200)
          return this.$message.error('(◎-◎;)!!  用户名或密码错误...?')
        this.$message.success('v(｡・ω・｡)ｨｪｨ♪　登录成功！')
        window.sessionStorage.setItem('token', data.token) //将token保存到sessionStorage里
        // this.$router.push('/home') //编程式导航跳转,或者是控制v-if 先想好是那种
        //邮箱验证还是手机验证 想好是那种 看哪种好实现
        //要不要为login和注册加路由，要想好
      })
    },
    // 注册
    signUp() {
      // console.log('注册')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/login.css';
</style>
