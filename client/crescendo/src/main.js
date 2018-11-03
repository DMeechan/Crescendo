// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io';
import Vuex from 'vuex'
import { SoundCloudWaveform } from './wave';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    projects: []
  },
  mutations: {
    setProjects(state, input) {
      state.projects = input;
    }
  },
  getters: {
    projects: state => {
      return state.projects
    }
  }
})

Vue.use(VueSocketio, 'https://intermusic.herokuapp.com');

Vue.config.productionTip = false

/* eslint-disable no-new */
export const global = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    allProjects: (projects) => {
      store.commit('setProjects', projects)
      console.log(projects)
    },
    users: (users) => {
      store.commit('showUsers', users)
    }
  },
  data: {
     
  },
  mounted() {
 
  },
  methods: {
    createProject: function(val){
        // $socket is socket.io-client instance
        this.$socket.emit('createProject', val)
    },
    deleteProject: function(id) {
      this.$socket.emit('deleteProject', {_id: id})
    },
    getProjects: () => {
      
    },
    addTrack: function(name, file, project) {
      console.log(file)
      let fd = new FormData()
      fd.append("file", file)

      fetch("https://file.io", {
        method: 'POST',
        body: fd
      }).then(response => response.json()).then(resp => {
        console.log(resp)
        this.$socket.emit('addTrack', {
          projectId: project,
          url: resp.link,
          name: name,
          length: 1
        })
      })

      
    }
  }
})

