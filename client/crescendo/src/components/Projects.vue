<template>
    <div class="grid">
        <router-link v-for="project in projects" :to="'/project/' + project.id" :key="project.id" >
            <div class="project">
                <h2>{{project.name}}</h2>

                <span>{{project.length}}</span>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
    .grid {
        width: 100%;
        grid-template-columns: auto auto auto auto;
        display: grid;
    }

    .project {
        height: 200px;
        background: black;
        border-radius: 4%;
        color: white;
        text-align: center;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        display: flex;
    
    }

    .project span {
       align-self: flex-end;
    }
</style>

<script>
import {globalStore} from '../main.js'

export default {
  name: 'Projects',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      projects: globalStore.projects
    }
  }
}
</script>