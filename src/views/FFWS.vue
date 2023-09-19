<template>
    <div class="p-10">
        <h1 class="font-bold">EXCEL</h1>
        <input id="excel" type="file" @change="subirExcel()">
    </div>
    <!-- <Radial /> -->
    <section id="main">
        <h1 class="text-[#262938]">hola</h1>
        <div class="mt-[130px] flex flex-row gap-10 items-center justify-center">
            <h1 class="title text-[#ffbc00] text-center text-6xl">CLASIFICACIÓN</h1>
            <div class="h-[100px]">
                <img src="../components/ffws.png" alt="" class="h-full">
            </div>
        </div>
        <table class="text-white text-2xl mx-auto w-[70%] text-center">
            <thead>
                <tr>
                    <th scope="col" class="p-2 border border-white">Top</th>
                    <th scope="col" class="p-2 border border-white">Equipo</th>
                    <th scope="col" class="p-2 border border-white">Apertura</th>
                    <th scope="col" class="p-2 border border-white">Clausura</th>
                    <th scope="col" class="p-2 border border-white">TOTAL</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in teams">
                    <td v-if="index < 9" class="border border-white p-2">{{ index + 1 }}</td>
                    <td v-if="index < 9" class="border border-white p-2 flex flex-row items-center justify-between pl-10 pr-10">
                        {{ item.name }}
                        <div class="h-[50px]">
                            <img :src="`./src/components/participants/${item.name.toLocaleLowerCase()}.png`" alt="" class="h-full">
                        </div>
                    </td>
                    <td v-if="index < 9" class="border border-white p-2">{{ item.pointsApertReg + item.pointsApertFinal }}</td>
                    <td v-if="index < 9" class="border border-white p-2">{{ item.pointsClausReg + item.pointsClausFinal }}</td>
                    <td v-if="index < 9" class="border border-white p-2">{{ item.total }}</td>
                </tr>
            </tbody>
        </table>
        <Chart />
    </section>
</template>

<script setup>
import readXlsFile from 'read-excel-file';
import { ref } from 'vue';
import Radial from '../components/Radial.vue';
import Chart from '../components/Chart.vue';

const begin = 1;
const pointsEndRegular = [
    {
        pos: 1,
        points: 30
    },
    {
        pos: 2,
        points: 23
    },
    {
        pos: 3,
        points: 22
    },
    {
        pos: 4,
        points: 21
    },
    {
        pos: 5,
        points: 20
    },
    {
        pos: 6,
        points: 19

    },
    {
        pos: 7,
        points: 18
    },
    {
        pos: 8,
        points: 17

    },
    {
        pos: 9,
        points: 16
    },
    {
        pos: 10,
        points: 15
    },
    {
        pos: 11,
        points: 14
    },
    {
        pos: 12,
        points: 13
    },
    {
        pos: 13,
        points: 12
    },
    {
        pos: 14,
        points: 11
    },
    {
        pos: 15,
        points: 10
    },
    {
        pos: 16,
        points: 9
    },
    {
        pos: 17,
        points: 5
    },
    {
        pos: 18,
        points: 5
    },
]
const pointsEndFinal = [
    {
        pos: 1,
        points: 30
    },
    {
        pos: 2,
        points: 23
    },
    {
        pos: 3,
        points: 22
    },
    {
        pos: 4,
        points: 21
    },
    {
        pos: 5,
        points: 20
    },
    {
        pos: 6,
        points: 19

    },
    {
        pos: 7,
        points: 18
    },
    {
        pos: 8,
        points: 17

    },
    {
        pos: 9,
        points: 16
    },
    {
        pos: 10,
        points: 15
    },
    {
        pos: 11,
        points: 14
    },
    {
        pos: 12,
        points: 13
    },
    {
        pos: 13,
        points: 12
    },
    {
        pos: 14,
        points: 11
    },
    {
        pos: 15,
        points: 10
    },
    {
        pos: 16,
        points: 9
    },
    {
        pos: 17,
        points: 5
    },
    {
        pos: 18,
        points: 5
    },
]
const pointsInitRegular = [
    {
        pos: 1,
        points: 25
    },
    {
        pos: 2,
        points: 18
    },
    {
        pos: 3,
        points: 17
    },
    {
        pos: 4,
        points: 16
    },
    {
        pos: 5,
        points: 15
    },
    {
        pos: 6,
        points: 14

    },
    {
        pos: 7,
        points: 13
    },
    {
        pos: 8,
        points: 12

    },
    {
        pos: 9,
        points: 11
    },
    {
        pos: 10,
        points: 10
    },
    {
        pos: 11,
        points: 9
    },
    {
        pos: 12,
        points: 8
    },
    {
        pos: 13,
        points: 7
    },
    {
        pos: 14,
        points: 6
    },
    {
        pos: 15,
        points: 5
    },
    {
        pos: 16,
        points: 5
    },
    {
        pos: 17,
        points: 0
    },
    {
        pos: 18,
        points: 0
    },
]
const pointsInitFinal = [
    {
        pos: 1,
        points: 25
    },
    {
        pos: 2,
        points: 18
    },
    {
        pos: 3,
        points: 17
    },
    {
        pos: 4,
        points: 16
    },
    {
        pos: 5,
        points: 15
    },
    {
        pos: 6,
        points: 14

    },
    {
        pos: 7,
        points: 13
    },
    {
        pos: 8,
        points: 12

    },
    {
        pos: 9,
        points: 11
    },
    {
        pos: 10,
        points: 10
    },
    {
        pos: 11,
        points: 9
    },
    {
        pos: 12,
        points: 8
    },
    {
        pos: 13,
        points: 0
    },
    {
        pos: 14,
        points: 0
    },
    {
        pos: 15,
        points: 0
    },
    {
        pos: 16,
        points: 0
    },
    {
        pos: 17,
        points: 0
    },
    {
        pos: 18,
        points: 0
    },
]
const teams = ref([]);

function subirExcel(){
    const inputFile = document.getElementById('excel');

    readXlsFile(inputFile.files[0]).then((rows) => {
        const finish = begin + 17;
        let pointsApertReg = 0;
        let pointsApertFinal = 0;
        let pointsClausReg = 0;
        let pointsClausFinal = 0;
        for (let index = begin; index < finish + 1; index++) {
            for (let i = 0; i < pointsInitRegular.length; i++) {
                if(rows[index][2] === pointsInitRegular[i].pos){
                    pointsApertReg = pointsInitRegular[i].points;
                    
                }
            }

            for (let i = 0; i < pointsInitFinal.length; i++) {
                if(rows[index][3] === pointsInitFinal[i].pos){
                    pointsApertFinal = pointsInitFinal[i].points;
                    
                }
            }

            for (let i = 0; i < pointsEndRegular.length; i++) {
                if(rows[index][4] === pointsEndRegular[i].pos){
                    pointsClausReg = pointsEndRegular[i].points;
                    
                }
            }

            for (let i = 0; i < pointsEndFinal.length; i++) {
                if(rows[index][5] === pointsEndFinal[i].pos){
                    pointsClausFinal = pointsEndFinal[i].points;
                    
                }
            }
            let teamNew = {
                name: rows[index][1],
                pointsApertReg: pointsApertReg,
                pointsApertFinal: pointsApertFinal,
                pointsClausReg: pointsClausReg,
                pointsClausFinal: pointsClausFinal,
                total: pointsClausFinal + pointsClausReg + pointsApertFinal + pointsApertReg
            }
            teams.value.push(teamNew);
        }
        teams.value.sort((a, b) => b.total - a.total);
        console.log(teams.value);
    })
}
</script>

<style scoped>
#main {
    background-image: url('../components/top10.png');
    width: 1080px;
    height: 1080px;
    background-repeat: no-repeat;
}

.title {
    font-family: 'Alatsi', sans-serif;
}
</style>