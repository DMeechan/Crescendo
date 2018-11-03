// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io';
import Vuex from 'vuex'

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
    }
  },
  data: {
     
  },
  methods: {
    clickButton: function(val){
        // $socket is socket.io-client instance
        this.$socket.emit('emit_method', val)
    },
    getProjects: () => {
      
    }
  }
})
