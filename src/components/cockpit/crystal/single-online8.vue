<template>
    <base-echarts ref="echarts"/>
</template>


<script setup>
import BaseEcharts from '@/components/base/base-echarts'
import {getSingleOnline8} from '@/api/cockpit/cockpit'
import {inject, ref} from 'vue'

const props = defineProps({
    factory: String
})

const echarts = ref(null)
const init = (width, height) => {
    echarts.value.init(width, height)
    refresh()
}
const refresh = () => {
    getSingleOnline8({factory: props.factory}, data => {
        const option = {
            series: {
                type: 'pie',
                center: ['50%', '50%'],
                data: data.series,
                label: {
                    show: true,
                    position: 'outside',
                    color: "#FFFFFF",
                    fontSize: 8,
                    align: "center",
                    baseline: "middle",
                    formatter(object) {
                        return object.value + '\n' + object.name
                    }
                }
            }
        }
        echarts.value.refresh(option)
    })
}

const leafs = inject('leafs')
leafs.push({
    init,
    refresh
})
</script>