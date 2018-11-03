<template>
    <div class="editor">
        <button class="play" @click="play()">Play</button>
        <draggable v-model="tracks" @start="drag=true" @end="drag=false">
            <div class="track" v-for="element in tracks" :key="element.id">
                <span class="track-title">{{element.name}}</span>
                <span class="track-length">{{element.length}}</span>
                <audio v-bind:src="element.url" controls></audio>
            </div>
        </draggable>
    </div>
</template>

<style>
.editor {
    width: 100%;
    background-color: #282C34;
    border-radius: 8px;
}

.editor .track {
    color: #61AFEF;
    padding: 64px;
    position: relative;
}

.editor .track:not(:last-child) {
    border-bottom: 2px solid #61AFEF;
}

.editor .track span {
    position: absolute;
}

.editor .track .track-title {
    font-size: 1.2em;
    text-transform: uppercase;
    top: 16px;
    left: 16px;
}

.editor .track .track-length {
    bottom: 16px;
    right: 16px;
}

</style>


<script>
import draggable from 'vuedraggable'
import { SoundCloudWaveform } from '../wave';
import { global, store } from '../main.js'

export default {
    name: 'Editor',
    props: ["unique"],
    computed: {
     tracks() {
         let ob = store.state.projects.filter((e) => e._id == this.unique)[0]
        return ob ? ob.tracks : null
        }
    },
    components: {
        draggable
    },
    methods: {
        play() {
            Object.values(document.getElementsByTagName("audio")).forEach((tag) => tag.paused ? tag.play() : tag.pause())
        }
    }
}
</script>



