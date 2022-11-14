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

<script>
import {ref} from 'vue'

export default {
    name: 'layout1ContainerLi',
    props: {
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
    },
    setup() {
        const liWidth = ref(0)
        const liHeight = ref(0)
        const titleHeight = ref(6)

        this.$parent.children.push({
            component: this,
            children: this.children
        })
        if (this.titleFontSize > 12) {
            this.titleHeight = 14 + this.titleFontSize
        }
        const init = (width, height) => {
            this.liWidth = width
            this.liHeight = height
            if (this.$children.length > 0) {
                this.$children[0].init(width, height - this.titleHeight - 3)
            }
        }
        return {
            liWidth,
            liHeight,
            titleHeight,
            init
        }
    }
}
</script>