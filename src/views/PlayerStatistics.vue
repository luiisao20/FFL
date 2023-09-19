<template>
    <div class="p-10">
        <h1 class="font-bold">EXCEL</h1>
        <input id="excel" type="file" @change="subirExcel()">
    </div>
    <div class="flex flex-row gap-10 border-4 items-center">
        <div class="flex flex-col gap-4 text-xl text-black">
            <label for="cars">Elije jugador 1</label>
            
            <input type="text" list="playerOne" v-model="playerOne" class="border-4 p-4">
            <datalist id="playerOne">
                <option v-for="item in items">{{ item[1] }}</option>
            </datalist>
            <input type="text" placeholder="Nombre jugador 1" class="p-4 border-4 text-black" v-model="pictureOne">
        </div>
        <div class="flex flex-col gap-4 text-xl text-black">
            <label for="cars">Elije jugador 2</label>
        
            <input type="text" list="playerTwo" v-model="playerTwo" class="border-4 p-4">
            <datalist id="playerTwo">
                <option v-for="item in items">{{ item[1] }}</option>
            </datalist>
            <input type="text" placeholder="Nombre jugador 1" class="p-4 border-4 text-black" v-model="pictureTwo">
        </div>
        <div><button @click="clearData" class="p-4 border-4 rounded-xl">CLEAR</button></div>
        <div><button @click="printData" class="p-4 border-4 rounded-xl">PRINT</button></div>
    </div>
    <section id="main">
        <h1 class="text-[#262938]">hola</h1>
        <div v-if="show" class="text-white flex flex-row items-center justify-center mt-[300px]">
            <div>
                <h1 class="text-center font-bold text-4xl">{{ dataPlayerOne.name }}</h1>
                <div  class="border-4 rounded-xl" :style="`border-color: ${dataPlayerOne.color};`">
                    <img :src="dataPlayerOne.picturePath" alt="" >
                </div>
                <div class="h-[40px] mt-[20px] w-20 mx-auto border-4 rounded-xl flex justify-center items-center"
                :style="`background-color: ${dataPlayerOne.color}50;
                    border-color: ${dataPlayerOne.color};`">
                    <div class="h-[20px]"><img src="../../Excel/circulo.png" alt="" class="h-full"></div>
                </div>
            </div>
            <div class="h-[400px]">
                <Chart :player-one="dataPlayerOne" :player-two="dataPlayerTwo" />
            </div>
            <div>
                <h1 class="text-center font-bold text-4xl">{{ dataPlayerTwo.name }}</h1>
                <div class="border-4 rounded-xl" :style="`border-color: ${dataPlayerTwo.color};`">
                    <img :src="dataPlayerTwo.picturePath" alt="">
                </div>
                <div class="h-[40px] mt-[20px] w-20 mx-auto border-4 rounded-xl flex justify-center items-center"
                :style="`background-color: ${dataPlayerTwo.color}50;
                    border-color: ${dataPlayerTwo.color};`">
                    <div class="h-[20px]"><img src="../../Excel/triangulo.png" alt="" class="h-full"></div>
                </div>
            </div>
        </div>
    </section>
    <div class="text-black">
        <p>Jugador 1: {{ dataPlayerOne.name }}. KDA: {{ dataPlayerOne.KDA.toFixed(2) }}.
            Daño promedio: {{ dataPlayerOne.damageProm.toFixed(2) }}. Headshots: {{ dataPlayerOne.headshotAccuracy }}.
            Distancia promedio: {{ dataPlayerOne.distance.toFixed(2) }}. Resurrecciones {{ dataPlayerOne.revival }}
        </p>
        <p>Jugador 2: {{ dataPlayerTwo.name }}. KDA: {{ dataPlayerTwo.KDA.toFixed(2) }}.
            Daño promedio: {{ dataPlayerTwo.damageProm.toFixed(2) }}. Headshots: {{ dataPlayerTwo.headshotAccuracy }}.
            Distancia promedio: {{ dataPlayerTwo.distance.toFixed(2) }}. Resurrecciones {{ dataPlayerTwo.revival }}
        </p>
    </div>
</template>

<script setup>
import readXlsFile from 'read-excel-file';
import { ref, reactive, watchEffect } from 'vue';
import Chart from '../components/Chart.vue';

const playerOne = ref('');
const playerTwo = ref('');
const items = ref([]);
const dataPlayerOne = reactive({
    team: '',
    name: '',
    KDA: 0,
    damageProm: 0,
    headshotAccuracy: 0,
    revival: 0,
    distance: 0,
    color: null,
    picturePath: '',
})
const dataPlayerTwo = reactive({
    team: '',
    name: '',
    KDA: 0,
    damageProm: 0,
    headshotAccuracy: 0,
    revival: 0,
    distance: 0,
    color: null,
    picturePath: '',
})
const colors = [
    {
        team: 'fg',
        code: '#FFFFFF'
    },
    {
        team: 'ne',
        code: '#FF9500'
    },
    {
        team: 'osk',
        code: '#00FF00'
    },
    {
        team: '6k',
        code: '#B5FC00'
    },
    {
        team: 'vg',
        code: '#04D208'
    },
    {
        team: 'lev',
        code: '#33ADDF'
    },
    {
        team: '19e',
        code: '#04B0D6'
    },
    {
        team: 'r7',
        code: '#4E77F4'
    },
    {
        team: 'agg',
        code: '#FFFFFF'
    },
    {
        team: 'aat',
        code: '#FFFFFF'
    },
    {
        team: 'zlt',
        code: '#F6542B'
    },
    {
        team: 'rr',
        code: '#BDC2C5'
    },
    {
        team: 'jns',
        code: '#EE0E0E'
    },
    {
        team: 'esg',
        code: '#FFC200'
    },
    {
        team: 'gdp',
        code: '#0065CB'
    },
    {
        team: 'inf',
        code: '#FF3100'
    },
    {
        team: 'mvg',
        code: '#03AEDF'
    },
    {
        team: 'qe',
        code: '#0094FF'
    }
]
const show = ref(false);
const pictureOne = ref('');
const pictureTwo = ref('');

function printData(){
    dataPlayerOne.picturePath = `./src/components/players/${dataPlayerOne.team}/${dataPlayerOne.team}-${pictureOne.value}.png`
    dataPlayerTwo.picturePath = `./src/components/players/${dataPlayerTwo.team}/${dataPlayerTwo.team}-${pictureTwo.value}.png`
    show.value = true;
}

function clearData(){
    playerOne.value = '';
    playerTwo.value = '';
    dataPlayerOne.team = '';
    dataPlayerOne.name = '';
    dataPlayerOne.KDA = 0;
    dataPlayerOne.damageProm = 0;
    dataPlayerOne.headshotAccuracy = 0;
    dataPlayerOne.revival = 0;
    dataPlayerOne.distance = 0;
    dataPlayerOne.color = null;

    dataPlayerTwo.team = '';
    dataPlayerTwo.name = '';
    dataPlayerTwo.KDA = 0;
    dataPlayerTwo.damageProm = 0;
    dataPlayerTwo.headshotAccuracy = 0;
    dataPlayerTwo.revival = 0;
    dataPlayerTwo.distance = 0;
    dataPlayerTwo.color = null;

    show.value = false;

}

function subirExcel(){
    const inputFile = document.getElementById('excel');

    readXlsFile(inputFile.files[0]).then((rows) => {
        const begin = 1;
        const finish = 102;
        for (let index = begin; index < finish + 1; index++) {
            items.value.push(rows[index]);
        }

    })
}

watchEffect(() => {
    items.value.forEach((item) => {
        if(item[1] === playerOne.value){
            dataPlayerOne.team = item[2];
            dataPlayerOne.name = item[1];
            dataPlayerOne.KDA = item[5];
            dataPlayerOne.damageProm = item[9];
            dataPlayerOne.headshotAccuracy = item[14];
            dataPlayerOne.revival = item[19];
            dataPlayerOne.distance = item[20];
            dataPlayerOne.color = selectColor(dataPlayerOne.team);
        }
        if(item[1] === playerTwo.value){
            dataPlayerTwo.team = item[2];
            dataPlayerTwo.name = item[1];
            dataPlayerTwo.KDA = item[5];
            dataPlayerTwo.damageProm = item[9];
            dataPlayerTwo.headshotAccuracy = item[14];
            dataPlayerTwo.revival = item[19];
            dataPlayerTwo.distance = item[20];
            dataPlayerTwo.color = selectColor(dataPlayerTwo.team);
        }
    })
})

function selectColor(tag){
    const color = colors.find((color) => color.team === tag.toLowerCase());
    return color ? color.code : null;
}
</script>

<style scoped>
#main {
    background-image: url('../components/player fondo.png');
    width: 1080px;
    height: 1080px;
    background-repeat: no-repeat;
}

.title {
    font-family: 'Alatsi', sans-serif;
}
</style>