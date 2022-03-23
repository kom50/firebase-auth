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
                <button @click="googleToLogin">Login with google</button><br />
                <br />
                <button @click="githubToLogin">Login with GitHub</button><br />

                <br />
                <button v-show="isMerged" @click="mergeAccount">
                    Merge Account
                </button>

                <button @click="githubToLoginRedirect">
                    githubToLoginRedirect with GitHub</button
                ><br />
                <br />
                <hr />

                <!-- :TODO Phone Number-->
                <router-link to="phone-page"
                    >Login with phone number</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
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
    signInWithRedirect,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    OAuthProvider,
    FacebookAuthProvider,
    getRedirectResult,
} from "firebase/auth";
import auth from "@/firebase";
import { useRouter } from "vue-router";

export default {
    //TODO
    setup(props) {
        const state = reactive({
            email: "",
            password: "",
        });

        const pendingCredRef = ref(null);
        const providerRef = ref(null);
        const isMerged = ref(false);

        const router = useRouter();

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

        /* Phone Number */
        //TODO
        // console.log("Recaptcha");

        /* Phone Number End */
        //  Google sign In
        const googleToLogin = () => {
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log(" google sign in ", result);
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
                    console.log("error google sign in ", error);
                });
        };

        async function githubToLogin() {
            console.log("githubToLogin ");
            const provider = new GithubAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential =
                    GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("user github ", user, token);
            } catch (error) {
                console.log("Error Github  ", error.code);
                console.log("Error Github  ", error.customData.email);
                console.log("Error Github  ", error.customData.credential);
                console.log(
                    "Error Github  ",
                    OAuthProvider.credentialFromError(error)
                );
                //User already sign In with other method with same email
                //auth/account-exists-with-different-credential
                if (
                    error.customData.email &&
                    error.code ===
                        "auth/account-exists-with-different-credential"
                ) {
                    var pendingCred = OAuthProvider.credentialFromError(error);
                    // The provider account's email address.fetchSignInMethodsForEmail
                    var email = error.customData.email;
                    // Get sign-in methods for this email.
                    console.log("pendingCred", pendingCred, email);
                    fetchSignInMethodsForEmail(auth, email).then(function (
                        methods
                    ) {
                        console.log("fetchSignInMethodsForEmail", methods);
                        if (methods[0] === "password") {
                            console.log("Password ");
                            // Asks the user their password.
                            // In real scenario, you should handle this asynchronously.
                            // var password = promptUserForPassword();
                            var password = prompt("Enter user password");
                            signInWithEmailAndPassword(auth, email, password)
                                .then(function (result) {
                                    // Step 4a.
                                    return result.user.linkWithCredential(
                                        pendingCred
                                    );
                                })
                                .then(function () {
                                    // Facebook account successfully linked to the existing Firebase user.
                                    // goToApp();
                                    console.log(
                                        "Github account successfully linked to the existing Firebase user."
                                    );
                                    router.push("/");
                                });
                            return;
                        }
                        isMerged.value = true;
                        //    Variables

                        providerRef.value = getProvider(methods[0]);
                        pendingCredRef.value = pendingCred;

                        // console.log(getProvider(pendingCred.providerId));
                        // console.log(pendingCred.providerId, methods[0]);

                        // var provider = getProvider(methods[0]);
                        // signInWithPopup(auth, provider).then(function (result) {
                        //     console.log("result.user", result.user);

                        //     linkWithCredential(result.user, pendingCred).then(
                        //         function (usercred) {
                        //             // Facebook account successfully linked to the existing Firebase user.
                        //             console.log("Goto app ", usercred);
                        //             console.log(
                        //                 "Github account successfully linked to the existing Firebase user."
                        //             );
                        //             router.push("/");
                        //         }
                        //     );
                        // });
                    });
                }
            }
        }

        function mergeAccount() {
            console.log(
                "providerRef.value",
                providerRef.value,
                pendingCredRef.value
            );
            // console.log(getProvider(pendingCred.providerId));
            // console.log(pendingCred.providerId, methods[0]);

            // var provider = getProvider(methods[0]);
            signInWithPopup(auth, providerRef.value).then(function (result) {
                console.log("result.user", result.user);

                linkWithCredential(result.user, pendingCredRef.value).then(
                    function (usercred) {
                        // Github account successfully linked to the existing Firebase user.
                        console.log("Goto app ", usercred);
                        console.log(
                            "Github account successfully linked to the existing Firebase user."
                        );
                        router.push("/");
                    }
                );
            });
        }

        function getProvider(providerId) {
            switch (providerId) {
                case "google.com":
                    return new GoogleAuthProvider();
                case "facebook.com":
                    return new FacebookAuthProvider();
                case "github.com":
                    return new GithubAuthProvider();
                default:
                    throw new Error(
                        `No provider implemented for ${providerId}`
                    );
            }
        }

        function githubToLoginRedirect() {
            console.log("githubToLoginRedirect");
            const auth = getAuth(app);
            const provider = new GithubAuthProvider();
            signInWithRedirect(auth, provider);
        }
        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Github Access Token. You can use it to access the Github API.
                const credential =
                    GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;
                console.log("get Redirect", user);
            })
            .catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.customData.email;
                // // AuthCredential type that was used.
                // // const credential =
                // //     GithubAuthProvider.credentialFromError(error);
                // // ...
                // console.log("get credential", email);

                //User already sign In with other method with same email
                //auth/account-exists-with-different-credential

                if (
                    error.code ===
                    "auth/account-exists-with-different-credential"
                ) {
                    var pendingCred = OAuthProvider.credentialFromError(error);
                    // The provider account's email address.fetchSignInMethodsForEmail
                    // var email = error.customData.email;
                    // Get sign-in methods for this email.
                    const email = error.customData.email;
                    console.log("pendingCred", pendingCred, email);
                    fetchSignInMethodsForEmail(auth, email).then(function (
                        methods
                    ) {
                        console.log("fetchSignInMethodsForEmail", methods);
                        if (methods[0] === "password") {
                            console.log("Password ");
                            // Asks the user their password.
                            // In real scenario, you should handle this asynchronously.
                            // var password = promptUserForPassword();
                            var password = prompt("Enter user password");
                            signInWithEmailAndPassword(auth, email, password)
                                .then(function (result) {
                                    // Step 4a.
                                    return result.user.linkWithCredential(
                                        pendingCred
                                    );
                                })
                                .then(function () {
                                    // Github account successfully linked to the existing Firebase user.
                                    // goToApp();
                                    console.log(
                                        "Github account successfully linked to the existing Firebase user."
                                    );
                                    router.push("/");
                                });
                            return;
                        }
                        //    Variables

                        providerRef.value = getProvider(methods[0]);
                        pendingCredRef.value = pendingCred;
                    });
                }
            });

        return {
            ...toRefs(state),
            submitHandler,
            googleToLogin,

            githubToLogin,
            githubToLoginRedirect,
            mergeAccount,
            pendingCredRef,
            providerRef,
            isMerged,
        };
    },
};
</script>




<!-- css scoped style-->
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

<!-- Using CSS Module 
    Ex.
    <template>
       <h2 class='$style.h1'></h2>  
    </template>
    
-->

<style module>
.h1 {
    color: red;
}
</style>

<!-- Using named CSS Module 
    Ex.
    <template>
            <h2 class='$classes.h1'></h2>  
    </template>
    
-->
<style module="classes">
.h1 {
    color: red;
}
</style>