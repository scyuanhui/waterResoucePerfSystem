/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
//导入各个功能模块
import Home from './../module/home';//首页
import Performance from './../module/performance';//绩效考评
import Auditor from './../module/auditor';//审核批复
import DataCount from './../module/dataCount';//数据统计
import BackLog from './../module/backlog';//通知待办


module.exports = {
    //省级菜单
    province:[
        {
            name:'首页',
            module:<Home />,
            icon:'iconfont icon-home'
        },
        {
            name:'绩效考评',
            module:<Performance />,
            icon:'iconfont icon-kaoping'
        },
        {
            name:'审核批复',
            module:<Auditor />,
            icon:'iconfont icon-shenbao'
        },
        {
            name:'数据统计',
            module:<DataCount />,
            icon:'iconfont icon-tongji'
        },
        {
            name:'通知待办',
            module:<BackLog />,
            icon:'iconfont icon-jindu'
        }
    ],
    //市级菜单
    city:[
        {
            name:'首页',
            module:<Home />,
            icon:'iconfont icon-home'
        },
        {
            name:'绩效考评',
            module:<Performance />,
            icon:'iconfont icon-kaoping'
        },
        {
            name:'审核批复',
            module:<Auditor />,
            icon:'iconfont icon-shenbao'
        },
        {
            name:'通知待办',
            module:<BackLog />,
            icon:'iconfont icon-jindu'
        }
    ],
    //区/县级菜单
    county:[
        {
            name:'绩效考评',
            module:<Performance />,
            icon:'iconfont icon-kaoping'
        }
    ]
};




