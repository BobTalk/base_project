# base_layout

### SRC
> api 项目所需接口文件
>
> assets 静态资源
>> css 样式文件
>> fonts 字体文件
>> imgs 图片
>
> axios http请求函数封装
>
> components 项目全局组件 name首字母大写
>> Dialog.vue 基于element-ui进行二次封装 弹窗
``` 组件中使用案例
<dialog-comp :value="dialogVisible" :title="title" width="50%" @input="dialogVisible = false">
    <div class="max-height50vh">
        内容部分
    </div>
    <template #footer>
        页脚部分
    </template>
</dialog-comp>
```
>> Button.vue 基于element-ui进行二次封装 按钮 超过三个按钮显示更多
```组件中使用案例 
deleteBtn: [
    {
        label: '删除',
        bg: '#1C69D4',
        color: 'white',
        size: 'mini',
        complyFn: data => {
            ...
        }
    }
],
<button-comp :button-list="btnList" />
```
> directives 指令<全局注册> 默认有一个双击复制当前数据 有复制成功回调函数 错误回调函数
```
<span v-clipboard:copy="scope.row[item.prop]" v-clipboard:success="onCopySuccessHandler" v-clipboard:error="onErrorHandler">{{ scope.row[item.prop] }}</span>

```
> filters 过滤器<全局注册> 
>>
> lib 第三方库
>>
> router 路由
>>
> store 状态管理 文件划分模块
>
> utils 工具包
>> clipboard 双击复制功能所需文件
>> base.js 常用函数
>
> views 页面模块

### base_layout
> .env 全局环境变量配置文件<开发/生产都会加载>
>
> .env.dev 开发环境变量配置 如与.env环境变量冲突则会覆盖.env文件对应的变量
>
> .env.uat UAT环境<伪生产>变量配置 如与.env环境变量冲突则会覆盖.env文件对应的变量
>
> .env.prod 生产环境变量配置 如与.env环境变量冲突则会覆盖.env文件对应的变量
>
> .eslintrc.js eslint校验规则配置文件
>
> .editorConfig.js vscode编译器需要安装<EditorConfig>插件 Webstorm、IntelliJIDEA等不需要
>
> vue.config.js webpack暴露出来的配置文件

----------------------------------
项目中所用CSS预编译`stylus` 可根据实际情况选取对应的`CSS`预编译