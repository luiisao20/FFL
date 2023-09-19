<template>
    <div class="bg-black w-full h-full text-white p-10">
        <h1>OLA K {{ word }}</h1>
        <h2>Tiempo restante {{ hours % 24 }} : {{ minutes % 60 }} : {{ seconds % 60 }}</h2>
        <button @click="getDate" class="bg-white p-4 rounded-xl text-black">INICIAR</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const time = ref(3); // minutos
const word = ref('ASE');
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const nowDate = ref({});
const timeIn45Mins = ref({});
const idInterval = ref(0);
const distance = ref(1000);

function getDate(){
    nowDate.value = new Date();
    timeIn45Mins.value = new Date(nowDate.value.getTime() + time.value * 60000);
    console.log(timeIn45Mins.value);
    idInterval.value = setInterval(() => {
        getDistance();
        if(minutes.value % 60 === 1) console.log('falta menos de un minuto');
        if(distance.value <= 0){
            time.value = 0;
            word.value = 'ASE@';
            clearInterval(idInterval.value);
            return
        }
    }, 1000)
}

function getDistance(){

    distance.value = timeIn45Mins.value - new Date();
    seconds.value = parseInt(distance.value / 1000);
    minutes.value = parseInt(seconds.value / 60);
    hours.value = parseInt(minutes.value / 60);

}
</script>