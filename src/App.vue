<template>
    <nav>
        Firebase Auth <br />
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="1" @click="logout">Logout</router-link>
        |
        <router-link to="/phone"> phone number</router-link> |
        <router-link to="/Firestore"> FireStore </router-link>
        <router-view />
    </nav>
</template>


<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "./firebase";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("user", user);
                store.commit("login", { user });
                router.push("/");
            } else {
                // User is signed out
                console.log("logout", user);
                store.commit("logout");
                router.push("/login");
            }
        });
        console.log("currentUser", auth.currentUser);

        const logout = () => {
            console.log("Logout ");
            signOut(auth)
                .then((user) => {
                    console.log(" logout", user);
                })
                .catch((err) => {
                    console.log("err ", err);
                });
        };
        return {
            logout,
        };
    },
};
</script>


<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
