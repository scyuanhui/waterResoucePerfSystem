/**
 * Created by Lenovo on 2018/7/21.
 */


import Home from './../home/home';//home


module.exports = [
    {
        name:'首页',
        component:null,
        icon:'iconfont icon-home',
        children:[
            {
                name:'首页',
                component:null,
            }
        ]
    },
    {
        name:'绩效目标申报',
        component:null,
        icon:'iconfont icon-shenbao',
        children:[
            {
                name:'绩效指标',
                component:null,
            },
            {
                name:'目标申报',
                component:null,
            }
        ]
    },
    {
        name:'绩效考评',
        component:null,
        icon:'iconfont icon-kaoping',
        children:[
            {
                name:'绩效自评',
                component:null,
            },
            {
                name:'绩效复查',
                component:null,
            }
        ]
    },
    {
        name:'数据统计',
        component:null,
        icon:'iconfont icon-tongji',
        children:[]
    },
    {
        name:'进度展示',
        component:null,
        icon:'iconfont icon-jindu',
        children:[]
    }
    ,
    {
        name:'资金管理',
        component:null,
        icon:'iconfont icon-zijin',
        children:[]
    }
];