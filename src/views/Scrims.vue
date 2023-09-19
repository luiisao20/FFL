<template>
    <div class="p-10">
        <h1 class="font-bold">EXCEL</h1>
        <input id="excel" type="file" @change="subirExcel()">
    </div>
    <section id="main">
        <h1 class="text-[#262938]">hola</h1>
        <h1 class="title text-[#ffbc00] mt-[150px] text-center text-6xl">FURIOUS GAMING SCRIMS</h1>
        <table class="text-white text-2xl mx-auto w-[70%] text-center">
            <thead>
                <tr>
                    <th scope="col" class="p-2 border border-white">Top</th>
                    <th scope="col" class="p-2 border border-white">Equipo</th>
                    <th scope="col" class="p-2 border border-white">Puntos</th>
                    <th scope="col" class="p-2 border border-white">Kills</th>
                    <th scope="col" class="p-2 border border-white">Booyah</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items">
                    <td class="border border-white p-2">{{ index + begin }}</td>
                    <td class="border border-white p-2">
                        {{ item[1] }}
                    </td>
                    <td class="border border-white p-2">{{ item[4] }}</td>
                    <td class="border border-white p-2">{{ item[3] }}</td>
                    <td class="border border-white p-2">{{ item[5] }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import readXlsFile from 'read-excel-file';
import { ref } from 'vue';

const items = ref([]);
const begin = 1;

function subirExcel(){
    const inputFile = document.getElementById('excel');

    readXlsFile(inputFile.files[0]).then((rows) => {
        const finish = begin + 12;
        for (let index = begin; index < finish + 1; index++) {
            items.value.push(rows[index]); 
        }
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