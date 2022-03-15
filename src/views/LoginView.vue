<template >
    <div class="bg-white">
        <form
            class="
                flex flex-col
                justify-center
                mx-auto
                p-4
                md:w-1/2
                h-[100%]
                shadow-lg
            "
            @submit.prevent="loginHandler"
        >
            <h1 class="text-[26px] mb-8">Login page</h1>
            <div class="p-2">
                <input
                    class="
                        p-4
                        mb-2
                        w-full
                        rounded-md
                        outline-none
                        border-2 border-teal-400
                        focus:ring-4 focus:ring-teal-200
                    "
                    type="text"
                    placeholder="Enter Email"
                    v-model="email"
                />
                <br />
                <input
                    class="
                        p-4
                        w-full
                        rounded-md
                        outline-none
                        border-2 border-teal-400
                        focus:ring-4 focus:ring-teal-200
                    "
                    type="password"
                    placeholder="Enter Password"
                    v-model="password"
                />
                <br />
                <button
                    class="
                        p-2
                        rounded-md
                        text-white
                        bg-teal-500
                        mt-4
                        outline-none
                        focus:ring-4 focus:ring-teal-200
                    "
                >
                    Submit
                </button>
            </div>
            <div class="mt-4">
                <p
                    @click="signInWithGoogleAccount"
                    class="
                        flex
                        justify-center
                        items-center
                        mx-auto
                        hover:bg-gray-100
                        p-2
                        rounded-md
                        text-[22px]
                        cursor-[pointer]
                    "
                >
                    <img class="w-12" src="../assets/google.jpg" alt="" />
                    Login with Google
                </p>
                <p
                    @click="signInWithEmailLik"
                    class="
                        flex
                        justify-center
                        items-center
                        mx-auto
                        hover:bg-gray-100
                        p-2
                        rounded-md
                        text-[22px]
                        cursor-[pointer]
                    "
                >
                    Login with Email Link
                </p>
            </div>
        </form>
        <div></div>
    </div>
</template>



<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase.js";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        // vue-router
        const router = useRouter();
        // firebase-auth
        const auth = getAuth(app);
        // Store
        const store = useStore();

        //Reactive state
        const state = reactive({ email: "", password: "" });

        function loginHandler() {
            console.log("Login handler");
            const { email, password } = state;
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log("signInWithEmailAndPassword  ", user);
                    //
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }

        function signInWithGoogleAccount() {
            console.log("signInWithGoogleAccount");
        }
        function signInWithEmailLik() {
            console.log("signInWithEmailLik");
        }
        return {
            ...toRefs(state),
            loginHandler,
            signInWithGoogleAccount,
            signInWithEmailLik,
        };
    },
};
</script>

<style lang="css">
</style>