<template>
  <div id="About">
    <h2>1.这是一个怎样的网站？</h2>
    <p>dsd</p>
    <h2>2.这</h2>
    <p>asa</p>
    <h2>3.为什么要建这样一个网站？</h2>
    <p>
      如果你曾了解或者使用过诸如
      <a
        href="https://www.sdltrados.com/cn/products/trados-studio/"
        target="_blank"
        ><u><b>Trados</b></u></a
      >之类的CAT软件，那么你一定会为其强大的翻译记忆库与相关搜索功能惊叹到鼓掌👏——嗯，我只是在说
    </p>
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
