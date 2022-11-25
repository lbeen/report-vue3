<template>
    <div class="layout1">
        <layout1-header ref="head" :title="title">
            <template #left>
                <slot name="headLeft"/>
            </template>
            <template #right>
                <slot name="headRight"/>
            </template>
        </layout1-header>
        <slot/>
    </div>
</template>

<script setup>
import '@/assets/layout/layout1/css/layout1.css'
import layout1Header from '@/components/layout/layout1/layout1-header'
import {onMounted, provide} from 'vue'

defineProps({
    title: String,
    interval: {
        type: Number,
        default: 0
    },
    meanwhileRefresh: {
        type: Boolean,
        default: false
    }
})

const children = []
provide('columns', children)
onMounted(() => {
    const width = window.innerWidth - 15 * (children.length + 1)
    const height = window.innerHeight - 85
    for (const child of children) {
        const childWidth = width * parseInt(child.width) / 100
        child.init(childWidth, height)
    }
})
</script>