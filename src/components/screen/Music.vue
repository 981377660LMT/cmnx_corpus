<template>
  <div id="Music">
    <aplayer mutex="true" :audio="audio" :lrcType="1" listMaxHeight=120 />
  </div>
</template>


<script>
import test from "../../assets/茅野愛衣,戸松遥,早見沙織 - secret base ~君がくれたもの~ (10 years after Ver.).mp3"

export default {
  name: "Music",
  data() {
    return {
      audio: [
        {
          id: 0,
          name: "东西（Cover：林俊呈）",
          artist: "纳豆",
          url: test,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: "[00:00.00]lrc here[00:01.00]aplayer"
        },
        {
          id: 1,
          name: "东西（Cover：林俊呈）",
          artist: "纳豆",
          url: test,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: "[00:00.00]lrc here[00:01.00]aplayer"
        },
        {
          id: 2,
          name: "东西（Cover：林俊呈）",
          artist: "纳豆",
          url: test,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: "[00:00.00]lrc here[00:01.00]aplayer"
        },
        {
          id: 3,
          name: "东西（Cover：林俊呈）",
          artist: "纳豆",
          url: test,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: "lrc here[00:01.00]aplayer"
        },
        {
          id: 4,
          name: "东西（Cover：林俊呈）",
          artist: "纳豆",
          url: test,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: "[00:00.00]lrc here[00:01.00]aplayer"
        },
        {
          id: 5,
          name: "东西（Cover：林俊呈）",
          artist: "纳豆",
          url: test,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: "[00:00.00]lrc here[00:01.00]aplayer"
        },
        {
          id: 6,
          name: "东西（Cover：林俊呈）",
          artist: "纳豆",
          url: test,
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: "[00:00.00]lrc here[00:01.00]aplayer"
        }
      ]
    }
  },
  created() {},
  mounted() {
    //自动改变主题颜色
    const link = document.createElement("script")
    link.type = "text/javascript"
    link.src = "https://cdn.jsdelivr.net/npm/colorthief@2.0.2/dist/color-thief.min.js"
    document.body.appendChild(link)
  },
  computed: {},
  watch: {},
  components: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.aplayer {
  top: 288px;
  width: 45%;
  border-radius: 10px;
  box-shadow: inset 0px -5px 30px 10px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
}
</style>
