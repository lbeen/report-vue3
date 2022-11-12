import {ElMessage} from 'element-plus'

export function alertSuccess(msg) {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
    })
}

export function alertError(msg) {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
    })
}