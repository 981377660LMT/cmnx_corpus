<template>
  <div id="About">
    <h2>1.这是一个怎样的网站？</h2>
    <p>
      基于个人收集整理的中日
      <a
        href="https://zh.wikipedia.org/wiki/%E8%AF%AD%E6%96%99%E5%BA%93"
        target="_blank"
        ><u><b>语料库</b></u></a
      >（Corpus）小站（各种意义上的小）。截止到2021年1月11日已收录32万余条句对。这些语料大多来自网络、游戏解包，偏向于文学性。现在就开始搜索吧！你将有一段愉快的冲浪🏄‍时光。
    </p>
    <p>大方无隅， 大器晚成， 大音希声， 大象无形。</p>
    <h2>2.为什么要建这样一个网站？</h2>
    <p>
      如果你曾了解或者使用过诸如
      <a
        href="https://www.sdltrados.com/cn/products/trados-studio/"
        target="_blank"
        ><u><b>Trados</b></u></a
      >之类的CAT软件，那么你一定会为其强大的翻译记忆库与相关搜索功能惊叹鼓掌👏
      ——
      很厉害吗，是的很厉害。建立这样一个网站是为了分享我自己整理的一些语料（你可能觉得不够靠谱，但实际上是实用的），以及在翻译中像使用CAT一样使用它们。
    </p>
    <p>他山之石，可以攻玉。</p>
    <h2>3.我将如何使用这个网站？</h2>
    <p>
      除了普通的搜索功能外（当然，你可以使用一些高级的查询方式），你还可以注册一个账号来使用收藏功能，以保存自己喜欢的语料（我自己也没想清楚这究竟有甚么用）。你将发现一些有趣👌的东西。
    </p>
    <p>黄州好猪肉，价贱如泥土。</p>
    <br />
    <el-button
      type="success"
      @click="shutDialog"
      size="mini"
      icon="el-icon-s-claim"
      >已阅</el-button
    >
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  },
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {
    shutDialog() {
      this.$emit("shut", false);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/about.css";
</style>
