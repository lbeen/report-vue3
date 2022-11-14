import {createRouter, createWebHistory} from 'vue-router'
import ManageRouter from './manage/manage'
import CockpitRouter from './cockpit/cockpit'

const routes = [
    ...ManageRouter,
    ...CockpitRouter
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router