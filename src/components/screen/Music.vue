<template>
  <div id="Music" class="screenContainer">
    <aplayer
      autoplay
      :music="{
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'http://devtest.qiniudn.com/Preparation.mp3',
        pic: 'http://devtest.qiniudn.com/Preparation.jpg',
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
      }"
    >
    </aplayer>
  </div>
</template>

<script>
export default {
  name: "Music",
  data() {
    return {};
  },
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.screenContainer {
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9999;
}
</style>
