<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
console.log(router);
defineProps({
    msg: String,
});

const count = ref(0);
</script>

<template>
    <h1>props value : {{ msg }}</h1>
</template>

<style scoped>
a {
    color: #42b983;
}
</style>
