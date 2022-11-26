<template>
    <div style="display: flex">
        <div v-for="item in list" v-bind:key="item.name" class="item">
            <dv-decoration9 :dur="4" :style="{width: circularWidth + 'px',height: circularHeight + 'px'}"
                            :color="item.color" class="item-circular">
                <dv-digital-flop :config="item.flop" :style="{height: circularHeight - 10 + 'px'}"/>
            </dv-decoration9>
            <div class="item-name"><span :style="{marginTop: nameMarginTop + 'px'}"> {{ item.name }} </span></div>
        </div>
    </div>
</template>

<script setup>
import {getFeedingAndFinish} from '@/api/cockpit/cockpit'
import {inject, ref} from 'vue'

const props = defineProps({
    factory: String
})
const width = ref(0)
const height = ref(0)
const circularWidth = ref(0)
const circularHeight = ref(0)
const nameMarginTop = ref(0)
const list = ref([])

const init = (pWidth, pHeight) => {
    width.value = pWidth
    height.value = pHeight
    refresh()
}
const refresh = () => {
    getFeedingAndFinish({factory: props.factory}, data => {
        if (data.length !== list.value.length) {
            initData(data)
        }
        refreshData(data)
    })
}
const initData = data => {
    const pHeight = height.value - 10
    const pWidth = (width.value - 50) / data.length
    if (pHeight <= pWidth) {
        circularWidth.value = pHeight
        circularHeight.value = pHeight
        nameMarginTop.value = 5
    } else {
        circularWidth.value = pWidth
        circularHeight.value = pWidth
        nameMarginTop.value = (height.value - pWidth - 21) * 2 / 3
    }
}
const refreshData = data => {
    const pList = []
    for (let item of data) {
        pList.push({
            name: item.name,
            color: item.value < item.target ? ['red', 'red'] : [],
            flop: getFlopConf(item.value)
        })
    }
    list.value = pList
}
const getFlopConf = value=> {
    return {
        number: [value],
        toFixed: 2,
        style: {
            fontSize: 12,
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
.item {
    width: 25%;
    text-align: center;
}

.item-circular {
    display: inline-flex;
}

.item-name {
    font-size: 10px;
    display: flex;
    justify-content: center;
    color: #FFFFFF;
}
</style>