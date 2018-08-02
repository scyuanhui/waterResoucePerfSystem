import {observable,action} from 'mobx';
import {Session} from './../public/common';

class User{
    constructor(){
        this.session = new Session();
    }
    @observable data = {};
    @action.bound setUserSession(result){
        switch (result.regionLevel){
        case 1:
        result.grades = 'country';
        result.systemLvl = '国家级系统';
            break;
        case 2:
        result.grades = 'province';
        result.systemLvl = '省级系统';
            break;
        case 3:
        result.grades = 'city';
        result.systemLvl = '市级系统';
            break;
        case 4:
        result.grades = 'county';
        result.systemLvl = '县级系统';
            break;
        }
        //console.log(JSON.stringify(result));
        this.session.setItem('USERNAME',result);
        this.data = this.session.getItem('USERNAME');

    }
    @action.bound logout(){
        this.session.removeItem('USERNAME');
        this.data = {};
    }
    @action.bound loginCheck(username,password){
        if(username == ''){
            return {status:false,text:'账号不能为空'};
        }
        if(password == ''){
            return {status:false,text:'密码不能为空'};
        }
        if(username.length < 5){
            return {status:false,text:'账号不能少于5位数'};
        }
        if(password.length < 5){
            return {status:false,text:'密码不能少于6位数'};
        }
        return {status:true,text:'输入格式合格'};
    }
}
const user = new User();
export default user;
