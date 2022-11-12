import axios from 'axios'
import {ElMessage} from 'element-plus'
import {alertSuccess, alertError} from '@/assets/common/alert'

const baseURL = 'http://10.2.0.147:8090'
// const baseURL = 'http://10.2.6.166:8090'
// const baseURL = 'http://localhost:8090/'
const service = axios.create({
    baseURL,
    timeout: 250000
})

/**
 * GET获取数据
 */
export function ajaxGet(url, params, success, error) {
    service.get(url, {params}).then(response => checkResponse(response, success, error))
}

/**
 * post提交数据
 */
export function ajaxPost(url, data, success, error) {
    service.post(url, data).then(response => checkResponse(response, success, error))
}

/**
 * 验证返回
 */
function checkResponse(response, success, error) {
    const result = response.data
    if (!result) {
        if (error) {
            error(result)
        }
        alertError('操作失败')
        return
    }
    if (result.code === 0) {
        if (success) {
            success(result.data)
        }
        if (result.msg) {
            alertSuccess(result.msg)
        }
    } else {
        if (error) {
            error(result)
        }
        if (result.msg) {
            alertError(result.msg)
            ElMessage({
                showClose: true,
                message: result.msg,
                type: 'error',
            })
        } else {
            alertError('操作失败')
        }
    }
}