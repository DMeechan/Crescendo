<template>
    <div class="track">
        <span class="name">{{name}}</span>
        <span class="length">{{length}}</span>
    </div>
</template>

<script>
export default {
  name: 'Track',
  props: ['id','name','length', 'url'],
  data () {
    return {
      
    }
  }
}
</script>