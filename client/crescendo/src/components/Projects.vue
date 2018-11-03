<template>
<div class="projects">
    <div class="grid">
        <router-link v-for="project in projects" :to="`/project/${project._id}`" :key="project.id" >
            <div class="project">
                <h2>{{project.name}}</h2>
                <a href="#" :onClick="deleteProject(project._id)">&times;</a>
                <span>{{project.length}}</span>
            </div>
        </router-link>
    </div>
    <input v-model="newName" type="text" /><v-button :onClick="createProject">Create Project</v-button>
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
        position: relative;
    }

    a {
        color: white;
        text-decoration: none;
    }

    .project a {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 99;
    }
</style>

<script>
import {store, global} from '../main.js'
import Button from '@/components/Button'

export default { 
  name: 'Projects',
  components: {
      'v-button': Button
  },
  computed: {
    projects() {
      return store.state.projects
    }
  },
  data() {
      return {
          newName: ''
      }
  },
  methods: {
      createProject() {
          global.createProject({
              name: this.newName
          })
      },
      deleteProject(id) {
          //global.deleteProject(id)
      }
  }
}
</script>