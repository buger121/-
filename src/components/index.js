function changeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /Base[A-Z]\w+\.(vue|js)$/
)

const components = Vue => {
    requireComponent.keys().forEach(fileName => {
        const config = requireComponent(fileName)
        const componentName = changeStr(
            fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
        )
        Vue.component(componentName, config.default || config)
    })
}

export default components
