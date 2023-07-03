<template>
    <div class="p-10">
    <h1 class="font-bold">EXCEL</h1>
    <input id="excel" type="file" @change="subirExcel()">
    </div>
    <section id="main">
        <div class="text-center pt-20">
            <img src="./components/INFOLOGO_BLANCO.png" alt="" class="h-[120px] mx-auto">
        </div>
        <table class="text-white mt-10 text-4xl mx-auto w-[80%]">
            <thead class="border border-white">
            <tr>
                <th scope="col" class="p-2 border border-white">TOP</th>
                <th scope="col" class="p-2 border border-white">TEAM / JUGADOR</th>
                <th scope="col" class="p-2 border border-white">ELIMINACIONES</th>
                <th scope="col" class="p-2 border border-white">DAÑO</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(player, index) in items" class="text-center text-3xl">
                <td v-if="index < 9" class="py-4 border border-white">{{ player[0] }}</td>
                <td v-else class="py-4 border border-white">{{ player[0] }}</td>
                <td class="py-4 border border-white text-left pl-4">{{ player[1] }} {{ player[2] }}</td>
                <td class="py-4 border border-white">{{ player[5] }}</td>
                <td class="py-4 border border-white">{{ player[7].toLocaleString('es-ES') }}</td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import readXlsFile from 'read-excel-file';
import { ref } from 'vue';

const items = ref([]);

function subirExcel(){
    const inputFile = document.getElementById('excel');

    readXlsFile(inputFile.files[0]).then((rows) => {
        const begin = 41;
        const finish = 50;
        for (let index = begin; index < finish + 1; index++) {
            items.value.push(rows[index]); 
        }
    })
}

</script>

<style scoped>
#main {
    background-image: url('../components/BOMBAZO_CARATULA.png');
    width: 1080px;
    height: 1080px;
    background-repeat: no-repeat;
}
</style>
