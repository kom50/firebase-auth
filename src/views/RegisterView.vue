<template>
    <div>
        <h1>Resister page</h1>

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
                    You have a account
                    <router-link to="/login"> Login </router-link>
                </p>
            </div>
            <div>
                <div class="recaptcha-container"></div>
                <button @click="googleToLogin">Login with google</button><br />
                <br />
                <button @click="githubToLogin">Login with GitHub</button><br />
                <br />
                <button @click="recaptchaVerifierHandler">ReCAptcha</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    isSignInWithEmailLink,
    signInWithEmailLink,
    sendSignInLinkToEmail,
    RecaptchaVerifier,
    GithubAuthProvider,
} from "firebase/auth";
import app from "@/firebase";
import { useRouter } from "vue-router";

export default {
    setup(props) {
        const state = reactive({
            email: "",
            password: "",
        });
        const router = useRouter();
        const auth = getAuth(app);

        const submitHandler = (event) => {
            console.log("Submit handler", state.email);
            const { email, password } = state;
            if (email && password) {
                const actionCodeSettings = {
                    // Replace this URL with the URL where the user will complete sign-in.
                    url: "http://localhost:8080/register",
                    handleCodeInApp: true,
                };

                sendSignInLinkToEmail(auth, email, actionCodeSettings)
                    .then(() => {
                        // The link was successfully sent. Inform the user.
                        // Save the email locally so you don't need to ask the user for it again
                        // if they open the link on the same device.
                        window.localStorage.setItem("emailForSignIn", email);

                        // Confirm the link is a sign-in with email link.
                        if (isSignInWithEmailLink(auth, window.location.href)) {
                            console.log(" is sign ");
                            // Additional state parameters can also be passed via URL.
                            // This can be used to continue the user's intended action before triggering
                            // the sign-in operation.
                            // Get the email if available. This should be available if the user completes
                            // the flow on the same device where they started it.
                            let email =
                                window.localStorage.getItem("emailForSignIn");
                            if (!email) {
                                // User opened the link on a different device. To prevent session fixation
                                // attacks, ask the user to provide the associated email again. For example:
                                email = window.prompt(
                                    "Please provide your email for confirmation"
                                );
                            }
                            // The client SDK will parse the code from the link for you.
                            signInWithEmailLink(
                                auth,
                                email,
                                window.location.href
                            )
                                .then((result) => {
                                    // Clear email from storage.
                                    window.localStorage.removeItem(
                                        "emailForSignIn"
                                    );
                                    // You can access the new user via result.user
                                    // Additional user info profile not available via:
                                    // result.additionalUserInfo.profile == null
                                    // You can check if the user is new or existing:
                                    // result.additionalUserInfo.isNewUser
                                })
                                .catch((error) => {
                                    // Some error occurred, you can inspect the code: error.code
                                    // Common errors could be invalid email and invalid or expired OTPs.
                                });
                        }
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ...|
                        console.log("error", error);
                    });

                // const auth = getAuth(app)
                // createUserWithEmailAndPassword(auth, email, password)
                //     .then((userCredential) => {
                //         // Signed in
                //         const user = userCredential.user;
                //         // ...
                //         console.log("user", user);
                //         console.log("Register");
                //         router.push("/login");
                //     })
                //     .catch((error) => {
                //         const errorCode = error.code;
                //         const errorMessage = error.message;

                //         console.log(
                //             "errorCode, errorMessage",
                //             errorCode,
                //             errorMessage
                //         );
                //     });

                //
            } else {
                console.log("Not Register");
            }
        };

        const recaptchaVerifierHandler = () => {
            console.log("Recaptcha");
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "normal",
                    callback: (response) => {
                        console.log("response", response);
                    },
                    "expired-callback": () => {
                        console.log("response expired");
                    },
                },
                auth
            );
        };

        //  Google sign In
        const googleToLogin = () => {
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GoogleAuthProvider.credentialFromError(error);
                });
        };
        function githubToLogin() {
            console.log("githubToLogin ");
            const provider = new GithubAuthProvider();
            provider.addScope("repo");
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    const credential =
                        GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                    console.log("user github ", user, token);
                })
                .catch((err) => {
                    console.log("Error Github  ", err);
                });
        }
        return {
            ...toRefs(state),
            submitHandler,
            googleToLogin,
            recaptchaVerifierHandler,
            githubToLogin,
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