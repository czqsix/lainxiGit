import mixin from './mixin'
import 'simba-awesome-js'
import filter from './filter'
export default {
    install(Vue) {
        //注册全局混入
        Vue.mixin(mixin)

        //注册全局过滤器
        Object.keys(filter).forEach(filterKey => {
            Vue.filter(filterKey, filter[filterKey])
        })
    }
}