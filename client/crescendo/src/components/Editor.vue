<template>
    <div class="editor">
        
        <draggable v-model="tracks" @start="drag=true" @end="drag=false">
            <div class="track" v-for="element in tracks" :key="element.id">
                <span class="track-title">{{element.name}}</span>
                <span class="track-length">{{element.length}}</span>
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
export default {
    name: 'Editor',
    data() {
        return {
            tracks: [{
                    name: "Track One",
                    id: 1, 
                    length: 1000
                },
                {
                    name: "two", 
                    id: 2, 
                    length: 2000
                }]
        }
    },
    components: {
        draggable
    }
}
</script>



