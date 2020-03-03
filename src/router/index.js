import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import curTimeInfo from '@/views/curTimeInfo/index.vue'
import curTime from '@/views/curTimeInfo/curTime.vue'
import supplyInfo from '@/views/curTimeInfo/gongyingInfo.vue'
import purchaseDemandInfo from '@/views/curTimeInfo/qiugouInfo.vue'
import fundInfo from '@/views/curTimeInfo/zizhuInfo.vue'
import dataStatistic from '@/views/dataStatistic/index'
import luruInfo from '@/views/luruInfo/index.vue'
import worker from '@/views/luruInfo/gong.vue'
import recruitUse from '@/views/luruInfo/xu.vue'
import output from '@/views/luruInfo/minjianOrig.vue'
import hospitalInfo from '@/views/hospitalInfo/index.vue'
import gong1 from '@/views/hospitalInfo/gong.vue'
import xu1 from '@/views/hospitalInfo/xu.vue'
import minjianOrig1 from '@/views/hospitalInfo/minjianOrig.vue'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return routerPush.call(this, location).catch(error => error)
}
export default new Router({
    // mode: 'history',//router模式
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: login,

        },
        {
            path: '/',
            name: 'layout',
            component: layout,
            children: [
                {
                    path: '/hospitalInfo',
                    name: 'hospitalInfo',
                    component: hospitalInfo,
                    curMenuName:"发布信息维护",
                    children:[
                        {
                            path: '/hospitalInfo/xu',
                            name: 'xu1',
                            component: xu1,
                            curMenuName:"发布信息维护/需方"

                        },
                        {
                            path: '/hospitalInfo/gong',
                            name: 'gong1',
                            component: gong1,
                            curMenuName:"发布信息维护/供方"

                        },
                        {
                            path: '/hospitalInfo/minjianOrig',
                            name: 'minjianOrig1',
                            component: minjianOrig1,
                            curMenuName:"发布信息维护/出力方"

                        },
                    ]
                },
                
                {
                    path: '/luruInfo',
                    name: 'luruInfo',
                    component: luruInfo,
                    curMenuName:"录入信息维护",
                    children:[
                        {
                            path: '/luruInfo/recruitUse',
                            name: 'recruitUse',
                            component: recruitUse,
                            curMenuName:"录入信息维护/我要用工"

                        },
                        {
                            path: '/luruInfo/worker',
                            name: 'worker',
                            component: worker,
                            curMenuName:"录入信息维护/我有工人"

                        },
                        {
                            path: '/luruInfo/output',
                            name: 'output',
                            component: output,
                            curMenuName:"录入信息维护/我要出力"

                        },
                    ]
                },
                {
                    path: '/curTimeInfo',
                    name: 'curTimeInfo',
                    component: curTimeInfo,
                    curMenuName:"实时播报信息",
                    children:[
                        {
                            path: '/curTimeInfo/curTime',
                            name: 'curTime',
                            component: curTime,
                            curMenuName:"实时播报信息/实时播报"

                        },
                        {
                            path: '/curTimeInfo/supplyInfo',
                            name: 'supplyInfo',
                            component: supplyInfo,
                            curMenuName:"实时播报信息/出力进展"

                        },
                        {
                            path: '/curTimeInfo/purchaseDemandInfo',
                            name: 'purchaseDemandInfo',
                            component: purchaseDemandInfo,
                            curMenuName:"实时播报信息/需求详情"

                        },
                        {
                            path: '/curTimeInfo/fundInfo',
                            name: 'fundInfo',
                            component: fundInfo,
                            curMenuName:"实时播报信息/供应详情"
                        },
                    ]
                }, 
                {
                    path: '/dataStatistic',
                    name: 'dataStatistic',
                    component: dataStatistic,
                    curMenuName:"统计",
                    children:[]
                }, 
            ]
        }
    ]
        
        
})
