<template>
    <base-echarts ref="echarts"/>
</template>

<script setup>
import BaseEcharts from '@/components/base/base-echarts'
import {getTurnoverDays} from '@/api/cockpit/cockpit'
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
    getTurnoverDays({factory: props.factory}, data => {
        const series = []
        for (let i = 0, len = data.legend.length; i < len; i++) {
            series.push({
                name: data.legend[i],
                type: 'line',
                data: data.yAxis[i],
                label: {
                    show: true,
                    color: '#FFFFFF',
                    fontSize: 8,
                    position: 'bottom',
                    formatter(params) {
                        if (params.value) {
                            return params.value
                        }
                        return ''
                    }
                }
            })
        }
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: "10%",
                containLabel: true
            },
            legend: {
                data: data.legend,
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 8
                },
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: data.xAxis,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    color: "#FFFFFF",
                    fontSize: 8,
                    rotate: '15'
                }
            }],
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    fontSize: 8,
                    color: "#999999"
                },
            },
            series: series
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