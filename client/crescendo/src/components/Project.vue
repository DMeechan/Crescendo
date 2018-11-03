<template>
    <div class="project">
        <h2>{{$route.params.id}}</h2>
        <Editor v-bind:unique="$route.params.id" tracks="tracks"></Editor>
        <button class="upload" @click="record()">Record Track</button>
        <button class="upload" @click="upload()">Upload Track</button>
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
    upload() {
      var fileSelector = document.createElement("input");
      fileSelector.setAttribute("type", "file");

      fileSelector.click();

      fileSelector.addEventListener("change", () => {
         global.addTrack("MyTrack", fileSelector.files[0], this.$route.params.id);
      })
    },
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
          console.log(audioChunks);
          let audio = new File(new Blob(audioChunks), `${name}.webm`, {
            type: "audio/webm;codecs=opus"
          });
          global.addTrack("filename", audio, $route.params.id);
        }, 1000);
      });
    }
  }
};
</script>
