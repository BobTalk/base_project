import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { MessageBox, Message } from 'element-ui'
import * as filters from '@/filters/index.js'
import './assets/css/reset.css' // 样式重置文件
import './lib/element' // element组件 按需加载（挂全局）
Vue.config.productionTip = false
// 弹窗函数
function handleConfirm(
    propsType,
    text = '确定执行此操作吗？',
    options = {
        type: 'warning',
        iconClass: 'el-icon-warning',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        cancelButtonClass: 'confirm-cancle-btn',
        confirmButtonClass: '',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: false,
        showClose: false
    },
    notice = '提示'
) {
    if (propsType === 'message') {
        return Message({
            dangerouslyUseHTMLString: options.dangerouslyUseHTMLString || false, // true 才能使用 html
            showClose: options.showClose || false,
            center: options.center || false,
            type: options.type || 'warning',
            message: text
        })
    }
    return MessageBox.confirm(text, notice, options)

}
// 注册过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
// 注册指令
Vue.use((Vue) => {
    ((requireContext) => {
        const arr = requireContext.keys().map(requireContext);
        (arr || []).forEach((directive) => {
            directive = directive.__esModule && directive.default ? directive.default : directive
            Object.keys(directive).forEach((key) => {
                Vue.directive(key, directive[key])
            })
        })
    })(require.context('./directives', false, /^\.\/.*\.js$/))
})
Vue.prototype.$handleConfirm = handleConfirm
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
