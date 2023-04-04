<script setup>
const props = defineProps(["name"]);

const emits = defineEmits(["update:name"]);

const nameHandler = (event) => {
  emits("update:name", event.target.value);
};
</script>

<template>
  <input
    type="text"
    class="name"
    :value="props.name"
    :placeholder="props.placeholder"
    @input="nameHandler"
  />
</template>

