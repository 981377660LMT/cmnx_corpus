<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    document.body.removeChild(document.getElementById("Loading"))
  }
}
</script>


