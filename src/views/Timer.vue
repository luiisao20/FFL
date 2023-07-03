<template>
    <div class="bg-black w-full h-full text-white p-10">
        <h1>OLA K ASE</h1>
        <h2 @click="timer">Tiempo restante {{ time }}</h2>
    </div>
</template>

<script setup>
import { onBeforeMount, onUpdated, ref, watchEffect } from 'vue';

const time = ref(30);

onUpdated(() => {

})

function timer(){
    setTimeout(() => {
        time.value -= 1;
    }, 1000)
}
</script>