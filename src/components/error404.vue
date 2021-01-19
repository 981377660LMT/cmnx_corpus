<template>
  <div id="Error404">
    <div id="message">
      <span id="head">404</span>
      <span id="tail">This page could not be found.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data() {
    return {}
  },
  created() {},
  // mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
#message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
    'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif;
}

#head {
  display: inline-block;
  font-size: 24px;
  font-weight: 500;
  margin: 0 20px 0 0;
  padding: 10px 23px 10px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
}

#tail {
  display: inline-block;
  font-size: 14px;
  line-height: 49px;
  height: 49px;
}
</style>
