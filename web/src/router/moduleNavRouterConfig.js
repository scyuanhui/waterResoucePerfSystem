/**
 * Created by Lenovo on 2018/7/21.
 */
//导入各个功能模块
import home from './../module/home';//首页
import performance from './../module/perfEvaluate';//绩效考评
import auditor from './../module/auditor';//审核批复
import dataCount from './../module/dataCount';//数据统计
import backlog from './../module/backlog';//通知待办


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
            module:performance.module,
            icon:'iconfont icon-kaoping'
        },
        {
            name:'审核批复',
            module:auditor.module,
            icon:'iconfont icon-shenbao'
        },
        {
            name:'数据统计',
            module:dataCount.module,
            icon:'iconfont icon-tongji'
        },
        {
            name:'通知待办',
            module:backlog.module,
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
            module:performance.module,
            icon:'iconfont icon-kaoping'
        },
        {
            name:'审核批复',
            module:auditor.module,
            icon:'iconfont icon-shenbao'
        },
        {
            name:'通知待办',
            module:backlog.module,
            icon:'iconfont icon-jindu'
        }
    ],
    //区/县级菜单
    county:[
        {
            name:'绩效考评',
            module:performance.module,
            icon:'iconfont icon-kaoping'
        }
    ]
};




