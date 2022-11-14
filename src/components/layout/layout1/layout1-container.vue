<template>
    <div class="layout1-container" :style="{width: containerWidth + 'px', height: containerHeight + 'px'}">
        <div v-if="title" class="name-title" :style="{height: titleHeight + 'px', fontSize: titleFontSize + 'px'}">
            {{ title }}
        </div>
        <slot v-if="!split"/>
        <ul v-else class="teacher-pie clearfix">
            <slot/>
        </ul>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
    </div>
</template>

<script>
import {ref} from 'vue'

export default {
    props: {
        title: {
            type: String
        },
        titleFontSize: {
            type: Number,
            default: 12
        },
        split: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: '100'
        }
    },
    setup() {
        const children = ref([])
        const containerWidth = ref(0)
        const containerHeight = ref(0)
        const titleHeight = ref(16)

        const child = {
            component: this
        }
        if (this.split) {
            child.children = this.children
        }
        this.$parent.children.push(child)
        if (this.titleFontSize > 12) {
            this.titleHeight = 4 + this.titleFontSize
        }

        const init = (width, height) => {
            this.containerWidth = width
            this.containerHeight = height

            if (this.split) {
                width -= 2
                for (let child of this.children) {
                    const li = child.component
                    const liWidth = width * parseInt(li.width) / 100
                    li.init(liWidth, height)
                }
            } else if (this.$children.length > 0) {
                width -= 10
                this.$children[0].init(width, height - this.titleHeight - 3)
            }
        }

        return {
            children,
            containerWidth,
            containerHeight,
            titleHeight,
            init
        }
    }
}
</script>