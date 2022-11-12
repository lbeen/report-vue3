import {createRouter, createWebHistory} from 'vue-router'
import ManageRouter from './manage/manage'

const routes = [
    ...ManageRouter
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router