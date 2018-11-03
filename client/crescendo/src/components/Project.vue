<template>
    <div class="project">
        <h2>{{$route.params.id}}</h2>
        <Editor tracks="tracks"></Editor>
        <button class="upload" @click="record()">Record Track</button>
    </div>
</template>

<style>
</style>


<script>
import Editor from "./Editor";
import { global } from "../main.js";
export default {
  name: "Project",
  components: {
    Editor
  },
  beforeRouteUpdate(to, from, next) {
    console.log();
  },
  computed: {},
  created() {},
  methods: {
    record() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        setTimeout(() => {
          mediaRecorder.stop();
          const audioBlob = new Blob(audioChunks);

          global.addTrack("filename", audioBlob);
        }, 3000);
      });
    }
  }
};
</script>
