/**
 * Created by Lenovo on 2018/7/21.
 */
//导入各个功能模块
import home from '../module/home';//module

module.exports = [
    {
        name:'首页',
        module:home.module,
        icon:'iconfont icon-home'
    },
    {
        name:'绩效目标申报',
        module:null,
        icon:'iconfont icon-shenbao'
    },
    {
        name:'绩效考评',
        module:null,
        icon:'iconfont icon-kaoping'
    },
    {
        name:'数据统计',
        module:null,
        icon:'iconfont icon-tongji'
    },
    {
        name:'进度展示',
        module:null,
        icon:'iconfont icon-jindu'
    }
    ,
    {
        name:'资金管理',
        module:null,
        icon:'iconfont icon-zijin'
    }
];