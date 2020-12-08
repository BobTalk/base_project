/*
 *读取env环境变量
 */
const fs = require('fs')
const path = require('path')
// env 文件 判断打包环境指定对应的服务器id
const envFile = process.env.NODE_ENV === 'production' ? '../.env.production' : (process.env.NODE_ENV === 'uat' ? '../.env.uat' : '../.env.development')
// env环境变量的路径
const envPath = path.resolve(__dirname, envFile)
// env对象
const envObj = parse(fs.readFileSync(envPath, 'utf8'))
const SERVER_ID = parseInt(envObj.VUE_APP_SERVER_ID, 10)

function parse(src) {
    // 解析KEY=VAL的文件
    const res = {}
    src.split('\n').forEach(line => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    // eslint-disable-next-line no-useless-escape
        const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
        if (keyValueArr != null) {
            const key = keyValueArr[1]
            let value = keyValueArr[2] || ''
            const len = value ? value.length : 0
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n')
            }
            value = value.replace(/(^['"]|['"]$)/g, '').trim()

            res[key] = value
        }
    })
    return res
}

/*
 *定义多个服务器账号 及 根据 SERVER_ID 导出当前环境服务器账号
 */
const SERVER_LIST = [
    {
        id: 0,
        name: 'A-测试环境',
        domain: 'https://ysmart-test.ysservice.com.cn', // 域名
        host: '10.129.38.65', // 服务器ip地址
        port: 22, // 端口
        username: 'root', // 登录服务器的账号
        password: 'STEVQcmbNr', // 登录服务器的账号
        path: '/app/nginx-1.14.2/html/strategymap'// 发布至静态服务器的项目路径
    },
    {
        id: 1,
        name: 'B-UAT环境',
        domain: 'https://ysmart-uat.ysservice.com.cn',
        host: '10.192.2.8',
        port: 22,
        username: 'root',
        password: 'Ysservice@123',
        path: '/usr/local/ngx_mart/html/strategymap'
    }
]
/**
 * SERVER_ID 来源于env配置
 */
module.exports = SERVER_LIST[SERVER_ID]
