<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="1" @click="logout">Logout</router-link>
        <router-view />
    </nav>
</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebase";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("user", user);
                store.commit("login", { user });
            } else {
                // User is signed out
                console.log("logout", user);
                store.commit("logout");
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
