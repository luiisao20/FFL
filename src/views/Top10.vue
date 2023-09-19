<template>
    Top10
    <div class="p-10">
    <h1 class="font-bold">EXCEL</h1>
        <input id="excel" type="file" @change="subirExcel()">
    </div>
    <div class="flex flex-col gap-4 text-xl text-black">
        <label for="cars">Elije un jugador</label>
    
        <select class="w-40" name="cars" id="cars" v-model="player">
            <option v-for="item in players">{{ item[1] }}</option>
        </select>
    </div>
    <section id="main">
        <h1 class="text-[#262938]">hola</h1>
        <div class="flex flex-row mt-[270px]">
            <div>
                <h1 class="text-[#ffbc00] text-[97px] w-[450px] text-center ml-[100px]">TOP {{ data.top }}</h1>
                <div class="flex flex-col mt-[75px] ml-[100px]">
                    <p class="text-white text-[44px] text-left">KILLS: {{ data.kills }}</p>
                    <p class="text-white text-[44px] text-left">DAMAGE: {{ data.damage.toLocaleString('es-ES') }}</p>
                    <p class="text-white text-[44px] text-left">HEADSHOTS: {{ data.headshots }}</p>
                    <p class="text-white text-[44px] text-left">KDA: {{ data.KDA }}</p>
                </div>
            </div>
            <div class="h-[500px] w-full">
                <img :src="`./src/components/players/${data.team}/${data.team}-${player.toLocaleLowerCase()}.png`" alt="" class="ml-[50px] h-full">
            </div>
        </div>
        <div class="bg-[#ffbc00] w-[900px] h-2 mx-auto rounded-xl">
        </div>
    </section>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
import readXlsFile from 'read-excel-file';

const player = ref('');
const players = ref([]);
const data = reactive({
    top: 0,
    kills: 0,
    damage: 0,
    headshots: 0,
    KDA: 0,
    team: ''
})

function subirExcel(){
    const inputFile = document.getElementById('excel');

    readXlsFile(inputFile.files[0]).then((rows) => {
        const begin = 1;
        const finish = 10;
        for (let index = begin; index < finish + 1; index++) {
            players.value.push(rows[index]); 
        }
    })
}

watchEffect(() => {
    console.log(player.value);
    players.value.forEach((item) => {
        if(item[1] === player.value){
            data.top = item[0];
            data.kills = item[2];
            data.damage = item[6];
            data.headshots = item[7];
            data.KDA = item[4];
            data.team = item[8];
        }
    })
})
</script>

<style scoped>
#main {
    background-image: url('../components/player fondo.png');
    width: 1080px;
    height: 1080px;
    background-repeat: no-repeat;
    font-family: 'ROG Fonts', sans-serif;
}
</style>