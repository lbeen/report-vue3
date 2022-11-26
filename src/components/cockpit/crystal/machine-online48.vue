<template>
    <echarts-stack-horizontal ref="echarts" :data-fun="dataFun" :param="param"/>
</template>

<script setup>
import EchartsStackHorizontal from '@/components/cockpit/base/echarts-stack-horizontal'
import {getMachineOnline48} from '@/api/cockpit/cockpit'
import {inject, ref} from 'vue'

const props = defineProps({
    factory: String
})

const dataFun = getMachineOnline48
const param = {
    factory: props.factory
}

const echarts = ref(null)
const init = (width, height) => {
    echarts.value.init(width, height)
    refresh()
}
const refresh = () => echarts.value.refresh()

const leafs = inject('leafs')
leafs.push({
    init,
    refresh
})
</script>