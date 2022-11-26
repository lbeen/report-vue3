<template>
    <base-echarts ref="echarts"/>
</template>

<script setup>
import BaseEcharts from '@/components/base/base-echarts'
import {getSquareSingleYield} from '@/api/cockpit/cockpit'
import {getAxisMinAndMax} from "@/assets/common/common"
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
    getSquareSingleYield({factory: props.factory}, data => {
        const axisMinAndMax = getAxisMinAndMax(data.yAxis)
        const series = []
        for (let i = 0, len = data.legend.length; i < len; i++) {
            const name = data.legend[i];
            const item = {
                name: name,
                data: data.yAxis[i],
                type:'bar',
                label: {
                    show: true,
                    color: '#FFFFFF',
                    fontSize: 8,
                    position:'top',
                    formatter: params => params.value || ''
                }
            }
            series.push(item)
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
                itemWidth: 10,
                itemHeight: 8,
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 8
                }
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    fontSize: 8,
                    color: "#FFFFFF"
                }
            },
            yAxis: {
                type: 'value',
                min: axisMinAndMax.min,
                max: axisMinAndMax.max,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D3B53'
                    }
                },
                axisLabel: {
                    fontSize: 8,
                    color: "#999999"
                }
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