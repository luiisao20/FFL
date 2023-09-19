<template>
    <div class="p-10">
        <h1 class="font-bold">EXCEL</h1>
        <input id="excel" type="file" @change="subirExcel()">
    </div>
    <section id="main">
        <h1 class="text-[#262938]">hola</h1>
        <h1 class="title text-white mt-[280px] text-center font-bold text-6xl">Jugadores con más headshots</h1>
        <div class="flex flex-row justify-center items-end">
            <div v-for="(item, index) in items" class="flex flex-col w-[68px] mx-3">
                <!-- <p class="text-white text-3xl text-center pb-2">{{ (item[2]/1000).toFixed(0) }}</p> -->
                <p class="text-white text-3xl text-center pb-2">{{ item[2] }}</p>
                <!-- <div :style="{ height: item[2] / 820 + 'px', backgroundColor: colorTeams[index] }"></div> -->
                <div :style="{ height: item[2] * 2.3 + 'px', backgroundColor: colorTeams[index] }"></div>
                <img class="pt-4" :src="`./src/components/players/${item[1]}/${item[1]}-${item[0]}.png`" alt="" height="20px">
                <!-- <img class="pt-4" :src="`./src/components/participants/${item[0]}.png`" alt="" height="20px"> -->
            </div>
        </div>
    </section>
</template>

<script setup>
import readXlsFile from 'read-excel-file';
import { ref } from 'vue';

const items = ref([]);
const colorTeams = ref([]);
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

function subirExcel(){
    const inputFile = document.getElementById('excel');

    readXlsFile(inputFile.files[0]).then((rows) => {
        const begin = 1;
        const finish = 8;
        for (let index = begin; index < finish + 1; index++) {
            items.value.push(rows[index]);
            colors.forEach((color) => {
                if(color.team === rows[index][1].toLocaleLowerCase()) {
                    colorTeams.value.push(color.code);
                }
            })
        }
    })
}
</script>

<style scoped>
#main {
    background-image: url('../components/fondo.png');
    width: 1080px;
    height: 1080px;
    background-repeat: no-repeat;
}

.title {
    font-family: 'Alatsi', sans-serif;
}
</style>