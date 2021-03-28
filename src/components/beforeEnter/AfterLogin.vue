<template>
  <div id="afterLogin">
    <el-container>
      <!-- 内容 -->
      <!-- 头像 -->
      <el-header>
        <el-row class="signUpAvatar">
          <el-col :span="24" :offset="0">
            <el-avatar :size="120" :src="require('../../assets/akarin2.jpg')"> </el-avatar>
          </el-col>
        </el-row>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div class="info">
          <p>我收藏的语料数：{{ likeNumber }}</p>
          <p>我最喜欢的语料库是：</p>
          <p>{{ myBestLike }}</p>
        </div>
      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <el-button icon="el-icon-unlock" type="danger" @click="logOut" round>退出登录</el-button>
        <div>快去收藏喜欢的语料吧</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'AfterLogin',
  data() {
    return {
      myData: [],
    }
  },
  created() {
    this.getLike()
  },
  // mounted () {},
  computed: {
    likeNumber: function() {
      return this.$store.state.likeNumber
    },
    myBestLike: function() {
      if (this.likeNumber == 0) {
        return 'Oops！暂无收藏'
      }
      let myBestLike = ''
      let myBestLikeLength = 0
      for (let item of this.myData) {
        if (item.data.length > myBestLikeLength) {
          myBestLike = item.from
          myBestLikeLength = item.data.length
        }
      }
      return myBestLike ? myBestLike : 'Oops！暂无收藏'
    },
  },
  watch: {
    likeNumber: function() {
      if (this.$store.state.token) {
        this.getLike()
      }
    },
  },
  methods: {
    logOut() {
      this.$message.success('v(｡・ω・｡)ｨｪｨ♪　退出登录成功！')
      window.sessionStorage.removeItem('token')
      this.$store.commit('setToken', '')
      this.$store.commit('changeLoginState', 1)
      this.$store.commit('changeLikeNumber', 0)
    },
    async getLike() {
      const { data, status } = await this.$axios.get('/getLike')
      if (status !== 200) return this.$message.error('(◎-◎;)!!  获取收藏失败了...?')
      this.myData = data.myLikeResult
      this.myBestLike = data.myBestLike
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/afterLogin.css';
/deep/ .el-button {
  opacity: 1;
  font-size: 18px;
  margin: 10px 10px 0px 10px;
}

.welcome {
  font-size: 24px;
  font-family: 'Arial', 'Microsoft YaHei';
  margin-top: 20px;
  margin-bottom: 0;
}

.el-main {
  font-size: 24px;
  font-family: 'Arial', 'Microsoft YaHei';
  margin-bottom: 110px;
}
</style>
