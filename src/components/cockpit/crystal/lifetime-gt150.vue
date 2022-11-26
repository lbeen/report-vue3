<template>
    <base-echarts ref="echarts"/>
</template>

<script setup>
import BaseEcharts from '@/components/base/base-echarts'
import {getLifetimeGt150} from '@/api/cockpit/cockpit'
import {getAxisMinAndMax} from '@/assets/common/common'
import {inject, ref} from 'vue'

const props = defineProps({
    factory: String
})

const echarts = ref(null)
const refresh = () => {
    getLifetimeGt150({factory: props.factory}, data => {
        const axisMinAndMax = getAxisMinAndMax([data.yAxis])
        const option = {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2d3b53'
                    }
                },
                axisLabel: {
                    color: '#FFFFFF',
                    fontSize: 8,
                    rotate: '15'
                }
            },
            yAxis: {
                type: 'value',
                min: axisMinAndMax.min,
                max: axisMinAndMax.max,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2d3b53'
                    }
                },
                axisLabel: {
                    fontSize: 8,
                    color: '#999'
                }
            },
            series: {
                data: data.yAxis,
                type: 'line',
                areaStyle: {},
                label: {
                    show: true,
                    color: '#FFFFFF',
                    fontSize: 8
                }
            }
        }
        echarts.value.refresh(option)
    })
}

const leafs = inject('leafs')
leafs.push({
    init: (width, height) => {
        echarts.value.init(width, height)
        refresh()
    },
    refresh
})
</script>