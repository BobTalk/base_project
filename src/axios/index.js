import axios from 'axios'
import { Message } from 'element-ui'
const IS_DEV = ['development', 'dev'].includes(process.env.NODE_ENV)
const token = ''
// 创建axios实例
const service = axios.create({
    baseURL: IS_DEV ? '/' : process.env.VUE_APP_INTERFACE_URL, // 接口访问基本地址
    headers: {
        'Content-Type': 'application/json',
        charset: 'utf-8'
    }
    // withCredentials: true, // 跨域请求时发送cookie
    // timeout: 30000, // request timeout
})
// 同步请求
export function asyncFn(interfaceArr = []) {
    return new Promise((resolve, reject) => {
        axios.all(interfaceArr).then(res => resolve(res)).catch(e => reject(e))
    })
}
service.interceptors.request.use(
    config => {
        config.headers.Authorization = token
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// response 拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data
        }
    },
    error => {
        if (error.response) {
            const message = error?.response?.data?.Error?.Message
            if (error.response.status === 400) {
                message ? Message.error(`${message}`) : Message.error('[400]错误的请求')
            } else if (error.response.status === 401) {
                message ? Message.error(`${message}`) : Message.error('会话过期,请重新登录')
            } else if (error.response.status === 403) {
                message ? Message.error(`${message}`) : Message.error('拒绝访问')
            } else if (error.response.status === 404) {
                message ? Message.error(`${message}`) : Message.error('未找到')
            } else if (error.response.status === 413) {
                message ? Message.error(`${message}`) : Message.error('文件过大')
            } else if (error.response.status >= 500) {
                message ? Message.error(`${message}`) : Message.error('服务器内部错误')
            }
        }
        return Promise.reject(error)
    }
)
export default service
