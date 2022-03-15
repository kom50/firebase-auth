<template >
    <div>
        Home page

        <div v-if="store.state">
            <h1 :class="$style.name">{{ store.state.user.displayName }}</h1>
            <h1 :class="hii.name">{{ store.state.user.displayName }}</h1>
        </div>
    </div>
</template>



<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>



<style lang="css" module>
.name {
    color: red;
    font-size: 30px;
}
</style>


<style lang="css" module='hii'>
.name {
    color: blue;
    font-size: 30px;
}
</style>
