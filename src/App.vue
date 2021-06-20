<template>
  <div id="app">
    <transition name="fade">
      <div id="loading" v-show="!isVueScrollInit">
        <div class="ball-beat">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isVueScrollInit: function() {
      return this.$store.state.isVueScrollInit
    },
  },
}
</script>

<style scoped>
#loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: #000;
}

.ball-beat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.ball-beat > div {
  background-color: #ffffff;
  width: 10px;
  height: 10px;
  border-radius: 100% !important;
  margin: 6px;
  display: inline-block;
  animation: ball-beat 0.5s 0s infinite linear;
}

@keyframes ball-beat {
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.ball-beat > div:nth-child(2n-1) {
  animation-delay: 0.25s;
}

.fade-leave-active {
  transition: opacity 0.6s ease-in;
}

.fade-leave-to {
  opacity: 0;
}
</style>
