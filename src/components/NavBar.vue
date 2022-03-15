<template>
    <nav class="header">
        <router-link class="menu" to="/">Home </router-link>
        <router-link class="menu" to="login">Login </router-link>
        <router-link class="menu" to="register">Register </router-link>
        <router-link class="menu" to="/about">About </router-link>
        <button class="menu" @click="store.dispatch('logout')">Logout</button>
    </nav>
</template>




<script  setup>
import { useStore } from "vuex";
const store = useStore();
console.log(store);
</script> 



<style lang="css">
nav.header {
    background-color: rgb(243, 214, 179);
    padding: 10px;
}
.menu {
    font-size: 24px;
    margin-left: 10px;
    text-decoration: none;
}
.router-link-active,
.router-link-exact-active {
    color: rgb(255, 60, 0);
    text-decoration: underline;
}
</style>