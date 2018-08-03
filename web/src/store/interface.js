const root = 'http://192.168.10.13:8080';
const api = {
    login: root + '/shuilizijin/login',//用户登录
    logout: root + '/shuilizijin/logout',//用户登出
    getCountyPerList:root + '/shuilizijin/record/query'//获取县级绩效列表
};
export default api;
