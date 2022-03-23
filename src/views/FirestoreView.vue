<template>
    <div>
        <h1>Firestore Databases</h1>
        <button @click="addData">Add Data</button>
        <button @click="getData">Get Data</button>
    </div>
</template>


<script setup>
import { collection, addDoc, getDocs } from "firebase/firestore";

import { reactive } from "@vue/reactivity";
import { db } from "@/firebase";

const state = reactive({
    name: "",
    age: "",
});

async function addData() {
    console.log("Add data in firestore");

    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getData = async () => {
    console.log("Get Data");
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`, doc.data());
    });
};
</script>