<template>
    <div class="layout1-column" :style="{width: columnWidth + 'px'}">
        <slot></slot>
    </div>
</template>

<script>
import {ref} from 'vue'

export default {
    props: {
        width: {
            type: String,
            default: '100'
        }
    },
    setup() {
        const children = ref([])
        const columnWidth = ref(0)
        // let currentCpn = getCurrentInstance();
        // let parent = currentCpn.parent;
        // console.log(parent)
        // this.$parent.children.push({
        //     component: this,
        //     children: this.children
        // })

        const init = (width, height) => {
            this.columnWidth = width

            height -= 15 * this.children.length + 10
            for (let child of this.children) {
                const container = child.component
                const containerHeight = height * parseInt(container.height) / 100
                container.init(width, containerHeight)
            }
        }
        return {
            children,
            columnWidth,
            init
        }
    }
}
</script>