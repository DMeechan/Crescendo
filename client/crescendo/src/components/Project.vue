<template>
    <div class="project">
        <h2>{{$route.params.id}}</h2>
        <Editor tracks="tracks"></Editor>
    </div>
</template>

<style>

</style>


<script>
import Editor from './Editor'
import {globalStore, global} from '../main.js'
export default {
    name: "Project",
    props: ["id"],
    components: {
        Editor,
    },
    beforeRouteUpdate (to, from, next) {
        console.log(globalStore.socket)
    },
    data() {
        return {
            tracks: {}
        }
    },
    created() {
        globalStore.getProject(this.props.id);
    }
}
</script>
