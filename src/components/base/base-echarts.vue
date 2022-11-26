<template>
    <div :id="id" :style="{height: height + 'px'}"></div>
</template>

<script setup>
import {nextTick, ref} from 'vue'

const echarts = require('echarts')

const props = defineProps({
    clickFun: Function
})

const id = Math.random().toString(36)
const height = ref(200)
const echartsC = ref('')
defineExpose({
    init: (width, pHeight) => height.value = pHeight,
    refresh: option => {
        if (echartsC.value) {
            echartsC.value.clear()
            echartsC.value.setOption(option, true)
            return
        }
        nextTick(() => {
            echartsC.value = echarts.init(document.getElementById(id))
            echartsC.value.setOption(option, true)
            if (props.clickFun) {
                echartsC.value.on('click', this.clickFun)
            }
        })
    }
})
</script>