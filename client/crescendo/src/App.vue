<template>
  <div id="app">
    <div class="header">
    <router-link tag="a" to="/"><img src="./assets/logo.png"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1200px;
  margin: 0 auto;
}

.header {
  
}
</style>
