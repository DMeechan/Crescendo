<template>
    <button class="button" @click="onClick"><slot>Button</slot></button>
</template>

<script>
export default {
    name: 'button',
    props: {
        onClick: {
            type: Function,
            default: () => {},
        }
    },
}
</script>