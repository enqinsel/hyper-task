<script setup>

const props = defineProps(["color", "colorName"])
const emits = defineEmits(["clickHandler"])

const click = () => {
    emits("clickHandler", props.color)
}
</script>

<template>
    <button @click="click" :class="props.color">{{ props.colorName }}</button>
</template>

<style scoped>
    button{
        font-size: 1vw;
        color: whitesmoke;
    }
</style>