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
                    placeholder="Enter Username"
                    v-model="username"
                />
                <br />
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
                    type="email"
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
                <input
                    class="
                        mt-2
                        p-4
                        w-full
                        rounded-md
                        outline-none
                        border-2 border-teal-400
                        focus:ring-4 focus:ring-teal-200
                    "
                    type="password"
                    placeholder="Enter confirm Password"
                    v-model="c_password"
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
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import app from "../firebase.js";
import axios from "../axios";

import { reactive, toRefs } from "vue";
export default {
    setup() {
        const auth = getAuth(app);
        //
        const state = reactive({
            username: "",
            password: "",
            email: "",
            c_password: "",
        });
        async function addUser(userID, data) {
            const res = await axios.put(`/usersauth${userID}`, data);
            console.log("Data ", res);
        }
        function loginHandler() {
            console.log("Login handler");
            const { username, email, password } = state;
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("signInWithEmailAndPassword  ", user);

                    //
                    // addUser(user.UID, { username, email });
                    updateProfile(auth.currentUser, {
                        displayName: username,
                    })
                        .then((val) => {
                            console.log("Profile updated");
                        })
                        .catch((error) => {
                            console.log(
                                "Error occurred in profile updated time",
                                error
                            );
                        });
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
    mounted() {
        console.log("mounted ", this);
    },
};
</script>

<style lang="css">
</style>