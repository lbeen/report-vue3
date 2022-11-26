import axios from 'axios'
import {ajaxGet} from '@/api/axios'

export function getLifetimeGt150(param, callback) {
    ajaxGet('cockpit/lifetimeGt150', param, callback)
}

export function getBreakLine(param, callback) {
    ajaxGet('cockpit/breakLine', param, callback)
}

export function getUnitConsumption(callback) {
    axios.post('http://10.0.2.52:18032/EMStoMES').then(response => {
        if (response.data && response.data.data) {
            let data = {}
            for (const item of response.data.data) {
                switch (item.variableId) {
                    case "38b983da-c6b4-11ec-8004-005056896c7d":
                        data['氩气'] = item.modifiedValue
                        break
                    case "b8ecb247-c6b3-11ec-8004-005056896c7d":
                        data['电'] = item.modifiedValue
                        break
                    case "e43000be-c6b3-11ec-8004-005056896c7d":
                        data['新鲜水'] = item.modifiedValue
                        break
                }
            }
            callback(data)
        }
    })
}

export function getSingleYield(param, callback) {
    ajaxGet('cockpit/singleYield', param, callback)
}

export function getMachineYield(param, callback) {
    ajaxGet('cockpit/machineYield', param, callback)
}

export function getFeedingAndFinish(param, callback) {
    ajaxGet('cockpit/feedingAndFinish', param, callback)
}

export function getSquareSingleYield(param, callback) {
    ajaxGet('cockpit/squareSingleYield', param, callback)
}

export function getTurnoverDays(param, callback) {
    ajaxGet('cockpit/turnoverDays', param, callback)
}

export function getMachineOnline48(param, callback) {
    ajaxGet('cockpit/machineOnline48', param, callback)
}

export function getSingleOnline8(param, callback) {
    ajaxGet('cockpit/singleOnline8', param, callback)
}

export function getSingleFinishedRate(param, callback) {
    ajaxGet('cockpit/singleFinishedRate', param, callback)
}

export function getPayLength(param, callback) {
    ajaxGet('cockpit/payLength', param, callback)
}

export function getSingleOnline(param, callback) {
    ajaxGet('cockpit/singleOnline', param, callback)
}

export function getMachineOnline(param, callback) {
    ajaxGet('cockpit/machineOnline', param, callback)
}