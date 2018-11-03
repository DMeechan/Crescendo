<template>
  <div class="hello">
    <h2>Crescendo</h2>
    <v-button :onClick="createProject"> Create Project</v-button>
    <router-link tag="button" class="col" to="/projects" exact>View Projects</router-link>

  </div>
</template>

<script>
import {global} from '../main.js'
import Button from '@/components/Button'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    'v-button': Button
  },
  methods: {
    createProject() {
      console.log("Creating project...")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
