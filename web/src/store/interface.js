const root = 'http://192.168.10.13:8080';
const api = {
    login: root + '/shuilizijin/login',//用户登录
    logout: root + '/shuilizijin/logout',//用户登出
    ModifyPassWord:'/shuilizijin/user/password',//修改密码
    getOneList: root + '/shuilizijin/pfmIndex/getByLevel',//获取一级指标（5个步骤）
    getTargetTableList: root + '/shuilizijin/pfmIndex/getTree',//获取指标的table树（每个步骤获取的数据,参数 pid,regionId,currentYear）
    getCountyPerList:root + '/shuilizijin/record/query',//获取县级绩效列表
    getCountyPerDeclare:root + '/shuilizijin/pfmIndex/query',//绩效指标申报-申报
    addPerDeclare:root + '/shuilizijin/examine/add',//绩效指标申报-提交
    perDeclareWaitLook:root + '/shuilizijin/examine/query',//绩效指标申报-等待审核，查看
    perTargetWrite:root + '/shuilizijin/examine/update'//绩效目标填写，提交
};
export default api;
