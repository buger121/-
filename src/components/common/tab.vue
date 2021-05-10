<template lang="pug">
    div(v-show="isActive")
        slot
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Tab',
        },
    },
    data() {
        return {
            isActive: true,
        }
    },
}
</script>
