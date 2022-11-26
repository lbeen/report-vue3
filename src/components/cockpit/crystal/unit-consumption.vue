<template>
    <div class="circular-list" :style="{height: height + 'px'}">
        <div v-for="(v, k) in items" v-bind:key="k" class="circular-item" :style="v.circularStyle">
            <dv-digital-flop :config="v.flopConfig"/>
        </div>
    </div>
</template>

<script setup>
import {getUnitConsumption} from '@/api/cockpit/cockpit'
import {inject, ref} from 'vue'

const height = ref(0)
const items = ref([])

const init = (width, pHeight) => {
    height.value = pHeight
    width -= 60
    pHeight -= 10
    let maxWidth = width * 0.45
    if (maxWidth > pHeight) {
        maxWidth = pHeight
    }

    initCircular('新鲜水', maxWidth / 1.2, '#0bdd87')
    initCircular('电', maxWidth, '#578AF1')
    initCircular('氩气', maxWidth / 1.5, '#E6A23C')
    refresh()
}
const initCircular = (name, radius, color) => {
    items.value.push({
        circularStyle: {
            width: radius + 'px',
            height: radius + 'px',
            backgroundColor: color
        },
        flopConfig: {
            number: [0],
            style: {
                fontSize: 14,
                fill: '#FFFFFF'
            },
            formatter: () => name + '\n--'
        }
    })
}

const refresh = () => {
    getUnitConsumption(data => {
        refreshCircular(1, data, '电', 'kWh/kg')
    })
}
const refreshCircular = (index, data, name, unit) => {
    items.value[index].flopConfig = {
        number: [data[name]],
        content: name + '\n{nt}\n' + unit,
        toFixed: 2,
        style: {
            fontSize: 14,
            fill: '#FFFFFF'
        }
    }
}

const leafs = inject('leafs')
leafs.push({
    init,
    refresh
})
</script>
<style scoped>
.circular-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 5px 5px;
}


.circular-list .circular-item {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
}

.circular-list .circular-item:not(:first-child) {
    margin-left: 15px;
}
</style>