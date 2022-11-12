import {ajaxGet, ajaxPost} from '@/api/axios'

export function getResources(param, callback) {
    ajaxGet('manage/kanban/getResources', param, callback)
}

export function getLocations(param, callback) {
    ajaxGet('manage/kanban/getLocations', param, callback)
}

export function saveResource(param, callback) {
    ajaxPost('manage/kanban/saveResource', param, callback)
}

export function getPages(param, callback) {
    ajaxGet('manage/kanban/getPages', param, callback)
}

export function savePage(param, callback) {
    ajaxPost('manage/kanban/savePage', param, callback)
}

export function loadKanbanVersion(param, callback) {
    ajaxPost('manage/kanban/loadKanbanVersion', param, callback)
}

export function getVideos(param, callback) {
    ajaxGet('manage/kanban/getVideos', param, callback)
}

export function getPageResources(param, callback) {
    ajaxGet('manage/kanban/getPageResources', param, callback)
}

export function getKanbanVersion(id, callback) {
    ajaxGet('manage/kanban/getKanbanVersion', {id: id}, version => callback(version))
}