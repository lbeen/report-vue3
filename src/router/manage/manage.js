const routes = [{
    path: '/manage',
    component: () => import('@/views/manage/manage'),
    // meta: {
    //     title: '看板管理'
    // },
    children: [{
        path: 'kanban/page',
        component: () => import('@/views/manage/kanban/page'),
        // meta: {
        //     title: '看板页面管理'
        // }
    }, {
        path: 'kanban/resource',
        component: () => import('@/views/manage/kanban/resource'),
        // meta: {
        //     title: '看板资源管理'
        // }
    }]
}]
// const routes = [{
//     path: '/kanban/page',
//     component: () => import('@/views/manage/kanban/page'),
//     // meta: {
//     //     title: '看板页面管理'
//     // }
// }, {
//     path: '/kanban/resource',
//     component: () => import('@/views/manage/kanban/resource'),
//     // meta: {
//     //     title: '看板资源管理'
//     // }
// }]
export default routes
