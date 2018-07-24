/**
 * Created by Lenovo on 2018/7/21.
 */
//导入各个功能模块
import home from '../module/home';//module

module.exports = {
    //省级菜单
    province:[
        {
            name:'首页',
            module:home.module,
            icon:'iconfont icon-home'
        },
        {
            name:'绩效考评',
            module:null,
            icon:'iconfont icon-kaoping'
        },
        {
            name:'审核批复',
            module:null,
            icon:'iconfont icon-shenbao'
        },
        {
            name:'数据统计',
            module:null,
            icon:'iconfont icon-tongji'
        },
        {
            name:'通知待办',
            module:null,
            icon:'iconfont icon-jindu'
        }
    ],
    //市级菜单
    city:[
        {
            name:'首页',
            module:home.module,
            icon:'iconfont icon-home'
        },
        {
            name:'绩效考评',
            module:null,
            icon:'iconfont icon-kaoping'
        },
        {
            name:'审核批复',
            module:null,
            icon:'iconfont icon-shenbao'
        },
        {
            name:'通知待办',
            module:null,
            icon:'iconfont icon-jindu'
        }
    ],
    //区/县级菜单
    county:[
        {
            name:'绩效考评',
            module:home.module,
            icon:'iconfont icon-kaoping'
        }
    ]
};




