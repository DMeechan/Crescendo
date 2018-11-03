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
export default {
    name: "Project",
    props: ["id"],
    components: {
        Editor,
    },
    beforeRouteUpdate (to, from, next) {
        console.log()
    },
    data() {
        return {
            tracks: {}
        }
    },
    created() {
      
    }
}
</script>
