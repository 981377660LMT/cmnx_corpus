<template>
  <div id="MyLike" class="screenContainer">
    <!-- 收藏为空的背景 -->
    <div id="empty" v-if="likeNumber === 0">
      <img src="../../assets/empty.png" />
      <div>这里有一个...空的收藏夹</div>
    </div>
    <!-- 大卡片 -->
    <el-card class="box-card" id="myLikeCard">
      <!-- 侧边栏 -->
      <el-tabs tab-position="left">
        <el-tab-pane v-for="item in myData" :key="item.from" :label="item.from">
          <!-- 右侧卡片 -->
          <el-card v-for="(data, dataIndex) in item.data" :key="data.corpusId">
            <div slot="header">
              <span class="dataIndex">{{ dataIndex + 1 }}</span>
              <div class="el-icon-delete-solid" @click="deleteLike(data.corpusId)">删除收藏</div>
            </div>
            <div>
              <p>中文：{{ data.chinese }}</p>
              <p>日文：{{ data.japanese }}</p>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'MyLike',
  data() {
    return {
      myData: [],
    }
  },
  created() {
    //获得该用户的数据
    this.getLike()
  },
  //用户的收藏数目有变动时，马上更新myData
  computed: {
    //没有预料时提示添加语料
    showInfo: function() {
      return this.myData == []
    },
    likeNumber: function() {
      return this.$store.state.likeNumber
    },
    token: function() {
      return this.$store.state.token
    },
  },
  watch: {
    likeNumber: function() {
      if (this.$store.state.token) {
        this.getLike()
      }
    },
    token: function(token) {
      if (!token) {
        this.$router.push('/home')
      }
    },
  },
  methods: {
    async getLike() {
      const { data, status } = await this.$axios.get('/getLike')
      if (status !== 200) return this.$message.error('(◎-◎;)!!  获取收藏失败了...?')
      this.myData = data.myLikeResult
    },
    async deleteLike(corpusId) {
      this.$store.commit('changeCorpusId', corpusId)
      const { data, status } = await this.$axios.delete('/deleteLike', {
        data: { corpusId: corpusId },
      })
      if (status != 200) return this.$message.error('(◎-◎;)!!  删除收藏失败了...?')
      this.$message.success({
        showClose: true,
        message: `删除收藏成功！`,
        duration: 1000,
      })
      this.getLike()
      this.$store.commit('changeLikeNumber', data.likeNumber)
    },
  },
  beforeRouteEnter: (to, from, next) => {
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      Message.error('(◎-◎;)!!   请先进行登录!')
      return next('/home')
    }
    next(vm => {
      return vm.getLike()
    })
  },
}
</script>

<style lang="less" scoped>
.screenContainer {
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0.9;
}

#myLikeCard {
  width: 100%;
  height: 100%;
  // overflow: auto;
}

#MyLike /deep/ .el-card__body {
  padding: 3px 0;
}

#MyLike /deep/ .el-card__body .el-card {
  position: relative;
  margin: 30px 15px 30px 0;
  border-radius: 5px;
  opacity: 1;
  background-color: #fff;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

#MyLike /deep/ .el-tabs__nav {
  height: 533px;
  font-family: 'Arial', '华文细黑';
  overflow-y: scroll;
}

#MyLike /deep/ .el-tabs__content {
  height: 533px;
  font-weight: 500;
  overflow-y: scroll;
  font-family: '游明朝体';
}

#MyLike /deep/ .el-tabs__content .el-card__body {
  padding: 0 10px;
}

.dataIndex {
  font-size: 20px;
  font-weight: 600;
  font-family: 'Arial';
}

.el-icon-delete-solid {
  position: absolute;
  right: 20px;
  line-height: 23px;
  cursor: pointer;
}

#MyLike #empty {
  position: absolute;
  width: 100%;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    height: 250px;
    width: 260px;
  }
  font-size: 40px;
  font-weight: 600;
  font-family: '华文细黑';
  z-index: 100;
}
</style>
