// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io';

export const globalStore = new Vue({
  data: {
    message: "message",
    projects: [{
      id: "1",
      name: "Our Project",
      tracks: ["1","2"],
      length: 244533
    },
    {
      id: "2",
      name: "Our Project",
      tracks: ["1","2"],
      length: 244533
    },
    {
      id: "3",
      name: "Our Project",
      tracks: ["1","2"],
      length: 244533
    },
    {
      id: "4",
      name: "Our Project",
      tracks: ["1","2"],
      length: 244533
    }]
  }
})

Vue.use(VueSocketio, 'https://intermusic.herokuapp.com');

Vue.config.productionTip = false

/* eslint-disable no-new */
export const global = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
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
      this.data.projects.push({"hello": "there"})
    }
  }
})
