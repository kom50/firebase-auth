<template>
    <form @submit.prevent="submitPhoneNumberAuth">
        <br />
        <br />
        <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            v-model="phoneNo"
        />
        <br /><br />
        <input
            type="number"
            name="code"
            id=""
            placeholder="code"
            v-model="code"
        />
        <div
            id="recaptcha-container"
            style="border: 1px solid blue; padding: 10px"
        ></div>
        <br />
        <button type="submit" id="sign-in-button">Start</button>
        <button type="button" id="sign-in-button" @click="sendOTP">
            Send OTP
        </button>
        <button type="button" @click="submitPhoneNumberAuthCode">Verify</button>
        <button type="button" @click="reset">reset</button>
    </form>
</template>

<script setup>
import auth from "../firebase.js";
import { RecaptchaVerifier } from "@firebase/auth";
import { ref } from "@vue/reactivity";
import { signInWithPhoneNumber } from "firebase/auth";
import { onMounted } from "@vue/runtime-core";

const phoneNo = ref("");
const code = ref("");

console.log("Auth ", auth);
//

// window.recaptchaVerifier = new RecaptchaVerifier(
//     "sign-in-button",
//     {
//         size: "normal",
//         callback: function (response) {
//             submitPhoneNumberAuth();
//         },
//     },
//     auth
// );
// window.recaptchaVerifier = new RecaptchaVerifier("sign-in-button", {}, auth);
onMounted(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
    );

    // pre render recaptcha
    window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
    });
});

function reset() {
    grecaptcha.reset(window.recaptchaWidgetId);
}

function submitPhoneNumberAuth() {
    // window.recaptchaVerifier = new RecaptchaVerifier(
    //     "recaptcha-container",
    //     {},
    //     auth
    // );

    console.log("Phone number");

    // const phoneNumber = getPhoneNumberFromUserInput();
    // const phoneNumber = "+91" + phoneNo.value;
    // var phoneNumber = "+1 956-611-2233";
}

function sendOTP() {
    const phoneNumber = "+91" + phoneNo.value;

    const appVerifier = window.recaptchaVerifier;
    console.log(" appVerifier", phoneNumber, phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("confirmationResult", confirmationResult);
            // ...
        })
        .catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("Error; SMS not sent ---> ", error);
        });
}
function submitPhoneNumberAuthCode() {
    console.log("submitPhoneNumberAuthCode");
    // We are using the test code we created before
    // var code = document.getElementById("code").value;
    // var code = "123456";
    window.confirmationResult
        .confirm(code.value)
        .then(function (result) {
            var user = result.user;
            console.log(user);
        })
        .catch(function (error) {
            console.log(error);
        });
}
</script>