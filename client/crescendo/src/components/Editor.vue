<template>
    <div class="editor">
        <draggable v-model="tracks" @start="drag=true" @end="drag=false">
            <div v-for="element in tracks" :key="element.id">{{element.name}}</div>
        </draggable>
    </div>
</template>

<style>

</style>


<script>
import draggable from 'vuedraggable'
export default {
    name: 'Editor',
    props: ['tracks'],
    components: {
        draggable
    }
}
</script>



