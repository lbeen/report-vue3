<template>
    <li :style="{width: liWidth + 'px', height: liHeight + 'px'}">
        <div v-if="title" class="name-title" :style="{height: titleHeight + 'px', fontSize: titleFontSize + 'px'}">
            {{ title }}
        </div>
        <div style="margin-top: 3px">
            <slot/>
        </div>
    </li>
</template>

<script setup>
import {inject, provide, ref} from 'vue'

const props = defineProps({
    title: {
        type: String
    },
    titleFontSize: {
        type: Number,
        default: 12
    },
    width: {
        type: String,
        default: '50'
    }
})

const liWidth = ref(0)
const liHeight = ref(0)
const titleHeight = ref(props.titleFontSize > 12 ? (14 + props.titleFontSize) : 6)

const children = []
provide('leafs', children)

const containerLis = inject('containerLis')
containerLis.push({
    width: props.width,
    init: (width, height) => {
        liWidth.value = width
        liHeight.value = height
        if (children.length > 0) {
            children[0].init(width, height - titleHeight.value - 3)
        }
    },
    children
})
</script>