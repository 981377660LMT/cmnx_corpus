<template>
  <div id="About">
    <h2>1.这是一个怎样的网站？</h2>
    <p>
      基于个人收集整理的中日
      <a href="https://zh.wikipedia.org/wiki/%E8%AF%AD%E6%96%99%E5%BA%93" target="_blank"
        ><u><b>语料库</b></u></a
      >（Corpus）小站（各种意义上的小）。截止到{{ timeNow }}已收录{{
        total
      }}条句对。这些语料大多来自网络、游戏解包，偏向于文学性。现在就开始搜索吧！你将有一段愉快的冲浪🏄‍时光。
    </p>

    <h2>2.为什么要建这样一个网站？</h2>
    <p>
      如果你曾了解或者使用过诸如
      <a href="https://www.sdltrados.com/cn/products/trados-studio/" target="_blank"
        ><u><b>Trados</b></u></a
      >之类的CAT软件，那么你一定会为其强大的翻译记忆库与相关搜索功能称赞鼓掌👏 ——
      很厉害吗，是的很厉害。建立这样一个网站一是为了分享我自己整理的一些语料（尽管它们不那么靠谱），以及在翻译中像使用CAT一样使用它们；二是为了更好地学习Vue，做出一个像样的页面出来。
    </p>

    <h2>3.我将如何使用这个网站？</h2>
    <p>
      除了普通的搜索功能外（当然，你可以使用一些高级的查询方式），你还可以<span
        style="color:#71C49E;
          cursor:pointer;
          font-weight: 900;"
        @click="openDialog"
        ><u>注册一个账号</u></span
      >来使用收藏功能，以保存自己喜欢的语料（不过，我自己也没想清楚这究竟有啥用）。总之，你将发现一些有趣👌的东西。
    </p>

    <br />
    <el-button type="success" @click="shutDialog" size="mini" icon="el-icon-s-claim"
      >已阅</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      total: '许多',
    }
  },
  async created() {
    let { data } = await this.$axios.get('/getCorpusData')
    this.total = data.total
  },
  computed: {
    timeNow: function() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '年' + month + '月' + day + '日'
    },
  },
  methods: {
    shutDialog() {
      this.$emit('shut', false)
    },
    openDialog() {
      this.$emit('open', true)
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/about.css';
/deep/ .el-dialog {
  font-family: 'Microsoft Yahei';
  user-select: none;
}

/deep/ .el-dialog__title {
  font-size: 30px;
  line-height: 30px;
  font-weight: 600;
}

/deep/ .el-dialog__body {
  font-size: 16px;
  padding: 0 25px 50px !important;
}

/deep/ .el-button {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
