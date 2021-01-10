<template>
  <div
    id="likeScreen"
    :style="{
      backgroundImage: 'url(' + randomScreen[0] + ')'
    }"
  >
    <!-- likeScreen -->
    <el-row :gutter="0">
      <el-col :span="12" :offset="0"><div class="">11</div></el-col>
      <el-col :span="12" :offset="0"><div class="">22</div></el-col>
    </el-row>
  </div>
</template>

<script>
import steins0 from "../assets/steins0.jpg";
import lovelive0 from "../assets/lovelive0.jpg";
import arknights1 from "../assets/arknights1.jpg";
import arknights2 from "../assets/arknights2.jpg";
import arknights3 from "../assets/arknights3.jpg";
import arknights4 from "../assets/arknights4.jpg";
import arknights5 from "../assets/arknights5.jpg";
import arknights6 from "../assets/arknights6.jpg";
import arknights7 from "../assets/arknights7.jpg";
import arknights8 from "../assets/arknights8.jpg";
import arknights9 from "../assets/arknights9.jpg";

export default {
  name: "LikeScreen",
  data() {
    return {
      randomScreen: this.Lodash.shuffle([
        steins0,
        lovelive0,
        arknights1,
        arknights2,
        arknights3,
        arknights4,
        arknights5,
        arknights6,
        arknights7,
        arknights8,
        arknights9
      ])
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
@import "../assets/css/likeScreen.css";
</style>
