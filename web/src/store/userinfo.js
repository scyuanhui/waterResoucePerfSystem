import {observable,action} from 'mobx';
import {Session} from './../public/common';

const session = new Session();

class User{
    constructor(){
        //模拟数据
        this.grades = ['province','city','county'];
        this.units = ['四川省水利厅','成都市水利局','金牛区水务处'];
        this.sysLvl = ['省级系统','市级系统','县级系统'];
        this.ran = 0;//0,1,2随机值(Math.random() * 2).toFixed(0)
        this.ranGrade = this.grades[this.ran];
        this.ranUnit = this.units[this.ran];
        this.ranSysLvl = this.sysLvl[this.ran];
    }
    @observable data = {
        //模拟用户，(province)省级，(city)市级，(county)区县级
        username: session.getItem('USERNAME') ? session.getItem('USERNAME') : null,
        token: '5w4f8gfnbv2d812',
        userGrade:this.ranGrade,
        userUnit:this.ranUnit,
        sysLvl:this.ranSysLvl
    };
    @action.bound login(username){
        this.data.username = username;
        session.setItem('USERNAME',username);
    }
    @action.bound logout(){
        this.data.username = null;
        session.removeItem('USERNAME');
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
