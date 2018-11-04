<template>
    <div class="project">
        <h2>{{$route.params.id}}</h2>
        <Editor v-bind:unique="$route.params.id" tracks="tracks"></Editor>
        <!-- <button class="upload" @click="record()">Record Track</button> -->
        <label>
          Select Track
          <input type="file" id="file" ref="file" @change="uploadFile()" />
        </label>
        <button class="upload" @click="submitFile()">Upload Track</button>
    </div>
</template>

<style>
</style>


<script>
import Axios from 'axios';
import Editor from './Editor';
import { global } from '../main.js';
export default {
  name: 'Project',
  components: {
    Editor,
  },
  beforeRouteUpdate(to, from, next) {
    console.log();
  },
  data() {
    return {
      file: '',
    };
  },
  methods: {
    uploadFile() {
      this.file = this.$refs.file.files[0];
    },

    submitFile: async function() {
      // let formData = new FormData();
      // formData.append('file', this.file);
      // console.log('formData: ', formData);

      const filename = `filename=${this.file.name}`;
      const contentType = 'content_type=audio%2F*';
      const url = `http://localhost:3000/auth-upload?${filename}&${contentType}`;

      try {
        const response = await Axios.get(url);
        console.log('response: ', response);

        const url = response.data.endpoint_url;
        const params = response.data.params;

        for (const key in params) {
          console.log(key);
        }

        // let formData = new FormData();
        // formData.append('file', this.file);

        // if (!this.file) {
        //   console.error('Project.vue | this.file not found:', this.file);
        // }

        // const data = {
        //   url: endpointUrl,
        //   formData: s3Data.data.params,
        // };

        const options = {
          headers: {
            'Content-Type': 'application/xml',
          },
        };

        // const xhr = new XMLHttpRequest();
        // xhr.open('PUT', params);
        // xhr.onreadystatechange = () => {
        //   if (xhr.readyState === 4) {
        //     if (xhr.status === 200) {
        //       console.log(xhr);
        //     } else {
        //       console.error('Could not upload file.');
        //     }
        //   }
        // };
        // xhr.send(this.file);

        // Axios.put(endpointUrl, formData, options)
        //   .then(function() {
        //     console.log('SUCCESS!!');
        //   })
        //   .catch(function() {
        //     console.log('failure :(');
        //   });
      } catch (error) {
        console.error(error);
      }

      // Axios.post(``, formData)
      //   .then(() => {
      //     console.log('SUCCESS!!');
      //   })
      //   .catch(() => {
      //     console.error('Failure :(');
      //   });
    },

    upload() {
      var fileSelector = document.createElement('input');
      fileSelector.setAttribute('type', 'file');

      fileSelector.click();

      fileSelector.addEventListener('change', () => {
        global.addTrack(
          fileSelector.files[0].name,
          fileSelector.files[0],
          this.$route.params.id
        );
      });
    },
    record() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        setTimeout(() => {
          mediaRecorder.stop();
          console.log(audioChunks);
          let audio = new File(new Blob(audioChunks), `${name}.webm`, {
            type: 'audio/webm;codecs=opus',
          });
          global.addTrack('filename', audio, $route.params.id);
        }, 1000);
      });
    },
  },
};
</script>
