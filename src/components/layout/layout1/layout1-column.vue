<template>
    <div class="layout1-column" :style="{width: columnWidth + 'px'}">
        <slot></slot>
    </div>
</template>

<script setup>
import {inject, provide, ref} from 'vue'

const props = defineProps({
    width: {
        type: String,
        default: '100'
    }
})

const columnWidth = ref(0)
const children = []
provide('containers', children)

const columns = inject('columns')
columns.push({
    width: props.width,
    init: (width, height) => {
        columnWidth.value = width

        height -= 15 * children.length + 10
        for (const child of children) {
            const containerHeight = height * parseInt(child.height) / 100
            child.init(width, containerHeight)
        }
    },
    children
})
</script>