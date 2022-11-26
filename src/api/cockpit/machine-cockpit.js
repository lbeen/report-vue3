import {ajaxGet} from '@/api/axios'

export function getYieldByProcess(param, callback) {
    ajaxGet('cockpit/machine/yieldByProcess', param, callback)
}

export function getYieldByEquipment(param, callback) {
    ajaxGet('cockpit/machine/yieldByEquipment', param, callback)
}

export function getOnlineByProcess(param, callback) {
    ajaxGet('cockpit/machine/onlineByProcess', param, callback)
}

export function getOnlineBySpec(param, callback) {
    ajaxGet('cockpit/machine/onlineBySpec', param, callback)
}

export function getEquipmentByProcess(param, callback) {
    ajaxGet('cockpit/machine/equipmentByProcess', param, callback)
}

export function getMaintenanceTimeByEquipment(param, callback) {
    ajaxGet('cockpit/machine/maintenanceTimeByEquipment', param, callback)
}

export function getWaitingTimeByEquipment(param, callback) {
    ajaxGet('cockpit/machine/waitingTimeByEquipment', param, callback)
}

export function getPayLengthByProcess(param, callback) {
    ajaxGet('cockpit/machine/payLengthByProcess', param, callback)
}

export function getPayLengthByReason(param, callback) {
    ajaxGet('cockpit/machine/payLengthByReason', param, callback)
}