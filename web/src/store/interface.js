const root = 'http://192.168.10.13:8080';
const api = {
    login: root + '/shuilizijin/login/byuname',//用户登录
    getCountyPerList:root + '/shuilizijin/record/query'//获取县级绩效列表
};
export default api;
