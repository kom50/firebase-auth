<template>
    <div>
        <h1>Login page</h1>

        <div class="form-container">
            <input
                type="text"
                name="email"
                v-model="email"
                placeholder="Enter Email"
            />
            <input
                type="password"
                name="password"
                v-model="password"
                placeholder="Enter password"
            />
            <input type="button" value="Submit" @click="submitHandler" />
            <div>
                <p>
                    You need account
                    <router-link to="/register"> Register </router-link>
                </p>
            </div>
            <div class="err-msg" ref="errRef"></div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/firebase";
import { useRouter } from "vue-router";

import { useStore } from "vuex";

export default {
    setup(props) {
        const state = reactive({
            email: "",
            password: "",
        });

        const router = useRouter();
        const errRef = ref(null);

        const store = useStore();

        onMounted(() => {
            console.log("Error msg", errRef.value);
        });

        const submitHandler = (event) => {
            console.log("Submit handler", state.email);
            const { email, password } = state;
            if (email && password) {
                const auth = getAuth(app);
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        // ...
                        console.log("user", user);
                        console.log("signed In");
                        store.commit("login", { user });
                        router.push("/");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        errRef.value.textContent = errorMessage;
                        console.log(
                            "errorCode, errorMessage",
                            errorCode,
                            errorMessage
                        );
                    });

                //
            } else {
                console.log("Not Register");
            }
        };

        return {
            errRef,
            ...toRefs(state),
            submitHandler,
        };
    },
};
</script>

<style lang="scss">
.form-container {
    border: 1px solid gray;
    height: 200px;
    padding: 10px;
    input {
        padding: 4px;
        margin-left: 10px;
    }
}
</style>