<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />

        <h1>Home page</h1>
        <div v-if="$store.state.currentUser">
            <h2>Hello {{ $store.state.currentUser.email }}</h2>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "HomeView",
    mounted() {
        console.log("this ", this.$store.state);
    },
    setup() {},
};
</script>
