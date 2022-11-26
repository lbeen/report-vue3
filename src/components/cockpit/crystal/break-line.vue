<template>
    <echarts-stack-horizontal ref="echarts" :data-fun="dataFun" :param="param"
    ></echarts-stack-horizontal>
</template>

<script setup>
import EchartsStackHorizontal from '@/components/cockpit/base/echarts-stack-horizontal'
import {getBreakLine} from '@/api/cockpit/cockpit'
import {inject, ref} from 'vue'

const props = defineProps({
    factory: String
})

const dataFun = getBreakLine
const param = {
    factory: props.factory
}

const echarts = ref(null)
const refresh = () => echarts.value.refresh()

const leafs = inject('leafs')
leafs.push({
    init: (width, height) => {
        echarts.value.init(width, height)
        refresh()
    },
    refresh
})
</script>