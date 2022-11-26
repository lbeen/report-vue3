<template>
    <base-echarts ref="echarts"/>
</template>

<script setup>
import BaseEcharts from '@/components/base/base-echarts'
import {ref} from 'vue'

const props = defineProps({
    dataFun: Function,
    param: Object
})

const echarts = ref(null)
defineExpose({
    init: (width, height) => echarts.value.init(width, height),
    refresh: () => {
        props.dataFun(props.param, data => {
            const series = []
            for (let i = 0; i < data.legend.length; i++) {
                series.push({
                    name: data.legend[i],
                    stack: 'online',
                    type: 'bar',
                    data: data.yAxis[i],
                    label: {
                        show: true,
                        color: '#FFFFFF',
                        fontSize: 8,
                        formatter: params => params.value || ''
                    }
                })
            }
            const option = {
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    top: '20%',
                    containLabel: true
                },
                legend: {
                    data: data.legend,
                    itemWidth: 10,
                    itemHeight: 8,
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 8
                    }
                },
                xAxis: {
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#2D3B53'
                        }
                    },
                    axisLabel: {
                        fontSize: 8,
                        color: '#999',
                        rotate: '15'
                    }
                },
                yAxis: [{
                    data: data.xAxis,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#2D3B53'
                        }
                    },
                    axisLabel: {
                        color: '#FFFFFF',
                        fontSize: 8,
                    }
                }],
                series: series
            }
            echarts.value.refresh(option)
        })
    }
})
</script>