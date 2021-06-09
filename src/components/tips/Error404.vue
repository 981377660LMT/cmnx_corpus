<template>
  <div id="Error404">
    <div id="message">
      <router-link to="/home"> <span id="head">404</span></router-link>

      <span id="tail"> <- Go back to Home.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
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
  font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir,
    'Helvetica Neue', 'Lucida Grande', sans-serif;
}

#head {
  color: white;
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
