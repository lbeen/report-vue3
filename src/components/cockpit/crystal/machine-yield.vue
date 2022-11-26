<template>
    <base-echarts ref="echarts"/>
</template>

<script setup>
import BaseEcharts from '@/components/base/base-echarts'
import {round} from '@/assets/common/common'
import {getMachineYield} from '@/api/cockpit/cockpit'
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
    getMachineYield({factory: props.factory}, data => {
        const dataObj = {}
        for (let i = 0, len = data.legend.length; i < len; i++) {
            dataObj[data.legend[i]] = data.yAxis[i]
        }

        const series = []
        let todayFinish
        for (let i = 0, len = data.legend.length; i < len; i++) {
            const item = {
                name: data.legend[i],
                type: 'bar',
                label: {
                    show: true,
                    color: '#FFFFFF',
                    fontSize: 8,
                    position: 'top'
                }
            }

            if (data.legend[i] === '今日预计') {
                const todayEstimate = {}
                const todaySurplus = []
                for (let j = 0; j < data.xAxis.length; j++) {
                    todaySurplus.push(round(data.yAxis[i][j] - todayFinish[j], 1))
                    todayEstimate[data.legend[i] + data.xAxis[j]] = data.yAxis[i][j]
                }
                item.data = todaySurplus
                item.stack = 'today'
                item.itemStyle = {
                    borderColor: '#5470c6',
                    borderWidth: 1,
                    borderRadius: 0,
                    borderType: 'dotted',
                    color: '#55649747'
                }
                item.label.formatter = params => todayEstimate[params.seriesName + params.name] || ''
            } else if (data.legend[i] === '今日') {
                todayFinish = data.yAxis[i]
                item.data = data.yAxis[i]
                item.stack = 'today'
                item.label.formatter = params => params.value || ''
            } else {
                item.data = data.yAxis[i]
                item.label.formatter = params => params.value || ''
                item.label.position = 'inside'
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
            xAxis: [{
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