<template>
  <div>
    <h1>Sample Player - Vue 3</h1>
    <Player />
  </div>
</template>

<script>
import Player from './components/Player.vue'

export default {
  name: 'App',
  components: {
    Player,
  },
}
</script>

<style>
:root {
  color-scheme: dark light;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
