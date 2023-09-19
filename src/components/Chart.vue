<template>
    <Radar class="h-[400px] w-[400px]" :data="dataPlayer" :options="options"/>
</template>

<script setup>
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import { reactive, watchEffect } from 'vue';

const props = defineProps({
    playerOne: {
        required: true,
        type: Object
    },
    playerTwo: {
        required: true,
        type: Object
    },
})

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const dataPlayer = reactive({});
const options = reactive({});
const scaleKDA = 10 / 4;
const scaleDamage = 10 / 1500;
const scaleHeadshot = 10 / 200;
const scaleDistance = 10 / 10;
const scaleRevival = 10 / 40;

watchEffect(() => {
    
    dataPlayer.labels = [
        'KDA', 
        'Daño',
        'Headhsots', 
        'Distancia',
        'Revivir'
    ],
    dataPlayer.datasets = [{
        label: `${props.playerOne.name}`,
        data: [
            props.playerOne.KDA * scaleKDA,
            props.playerOne.damageProm * scaleDamage, 
            props.playerOne.headshotAccuracy * scaleHeadshot,
            props.playerOne.distance * scaleDistance, 
            props.playerOne.revival * scaleRevival],
        backgroundColor: `${props.playerOne.color}50`,
        borderColor: `${props.playerOne.color}`,
        pointBorderColor: 'white',
        pointHoverBackgroundColor: '#fff',
        pointBorderWidth: 5,
        pointStyle: 'circle',
        order: 2
    }, {
        label: `${props.playerTwo.name}`,
        data: [
            props.playerTwo.KDA * scaleKDA,
            props.playerTwo.damageProm * scaleDamage, 
            props.playerTwo.headshotAccuracy * scaleHeadshot,
            props.playerTwo.distance * scaleDistance, 
            props.playerTwo.revival * scaleRevival],
        backgroundColor: `${props.playerTwo.color}50`,
        borderColor: `${props.playerTwo.color}`,
        pointBorderColor: 'white',
        pointHoverBackgroundColor: '#fff',
        pointBorderWidth: 5,
        pointStyle: 'triangle',
        order: 1
    }],
    
    options.scales = {
        r: {
            min: 0,
            max: 10,
            animate: true,
            ticks: {
                stepSize: 2,
                display: false,
            },
            grid: {
                display: true,
                color: 'white',
                lineWidth: 2,
            },
            pointLabels: {
                font: {
                    size: 20,
                    family: 'Alatsi',
                },
                color: '#ffbc00',
                backdropPadding: 5,
                display: true,
            },
            angleLines: {
                display: false,
                lineWidth: 2,
                color: 'white',
            }
        },
    }
    options.elements = {
        line: {
            borderWidth: 2,
        }
    }
    options.plugins= {
        legend: {
            display: false
        },
    }
})

</script>