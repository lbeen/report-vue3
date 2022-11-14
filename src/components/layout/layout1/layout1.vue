<template>
    <div class="layout1">
        <layout1-header :title="title">
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

<script>
import '@/assets/layout/layout1/css/layout1.css'
import layout1Header from '@/components/layout/layout1/layout1-header'
import {onMounted, ref} from 'vue'

export default {
    components: {
        layout1Header
    },
    props: {
        title: {
            type: String,
            require: true
        },
        interval: {
            type: Number,
            default: 0
        },
        meanwhileRefresh: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        // let currentCpn = getCurrentInstance();
        // let parent = currentCpn.parent;
        // console.log(currentCpn)
        // console.log(currentCpn.subTree)

        // const slots = useSlots()
        // if (slots && slots.default) {
        //     slots.default().forEach(vn => {
        //         console.log(vn.type)
        //     })
        // }

        const children = ref([])
        const leafs = ref([])
        const leafIndex = ref(0)

        const getAllLeaf = node => {
            const children = node.children
            if (!children) {
                const leaf = node.component.$children[0]
                if (leaf) {
                    this.leafs.push(leaf)
                }
                return
            }
            for (let child of children) {
                this.getAllLeaf(child)
            }
        }
        const refreshInterval = () => {
            setInterval(() => {
                if (this.meanwhileRefresh) {
                    for (const leaf of this.leafs) {
                        leaf.refresh()
                    }
                } else {
                    this.leafs[this.leafIndex].refresh()
                    if (this.leafIndex === this.leafs.length - 1) {
                        this.leafIndex = 0
                    } else {
                        this.leafIndex++
                    }
                }
            }, this.interval)
        }

        onMounted(() => {
            console.log(this.$children)
            const width = window.innerWidth - 15 * (this.children.length + 1)
            const height = window.innerHeight - 85
            for (let child of this.children) {
                const column = child.component
                const columnWidth = width * parseInt(column.width) / 100
                column.init(columnWidth, height)
            }

            if (this.interval > 0) {
                for (let child of this.children) {
                    this.getAllLeaf(child)
                }
                this.refreshInterval()
            }
        })

        return {
            children,
            leafs,
            leafIndex,
            getAllLeaf,
            refreshInterval
        }
    }
}
</script>