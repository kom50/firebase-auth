<script setup>
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import NavBar from "../src/components/NavBar.vue";
import app from "./firebase";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const auth = getAuth(app);
const store = useStore();
const router = useRouter();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged In  ", user);

        store.dispatch("login", { user });
        router.push("/");
    } else {
        console.log("user Logged out");
        store.dispatch("logout", { user });
        router.push("/login");
    }
});
</script>

<template>
    <div class="main-container">
        <nav-bar></nav-bar>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <router-view v-slot="{ Component, route }" mode="in-out">
            <transition :name="route.meta.transitionName">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </div>
</template>


<style>
@import "../src/css/transition.css";
#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
}

.main-container {
    height: 100vh;
    width: 100vw;
    background-color: #e8f1fa;
}

.main-container nav {
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-container > div {
    /* background-color: cadetblue; */
    height: 90%;
}
</style>
