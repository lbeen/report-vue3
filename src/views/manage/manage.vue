<template>
    <el-container style=" border: 1px solid #eee">
        <el-aside width="200px">
            <el-menu :default-active="activeMenu" class="el-menu-demo" @select="goto"
                     :style="{height: height+ 'px'}">
                <template v-for="menu in menus">
                    <el-sub-menu v-if="menu.children" :index="menu.index" v-bind:key="menu.index">
                        <template #title>{{ menu.name }}</template>
                        <el-menu-item v-for="child in menu.children" :index="child.index" v-bind:key="child.index">
                            {{ child.name }}
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else :index="menu.index" v-bind:key="menu.index">
                        {{ menu.name }}
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
import {useRouter} from 'vue-router'
import {ref} from 'vue'

export default {
    setup() {
        const height = ref(window.innerHeight - 20 + 'px')
        const menus = ref([{
            index: 'kanban',
            name: '看板配置',
            children: [{
                index: '/manage/kanban/page',
                name: '页面配置'
            }, {
                index: '/manage/kanban/resource',
                name: '资源配置'
            }]
        }])

        const router = useRouter()
        const goto = index => {
            router.replace(index)
        }

        let activeMenu;
        const path = router.currentRoute.value.path
        if (path === '/manage') {
            activeMenu = ref(menus.value[0].children[0].index)
            goto(activeMenu.value)
        } else {
            activeMenu = ref(path)
        }

        return {
            height,
            menus,
            activeMenu,
            goto
        }
    }
}
</script>