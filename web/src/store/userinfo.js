import {observable,action} from 'mobx';

const grades = ['province','city','county'];
const units = ['四川省水利厅','成都市水利局','金牛区水务处'];
const sysLvl = ['省级系统','市级系统','县级系统'];
const ran = (Math.random() * 2).toFixed(0);
const ranGrade = grades[ran];
const ranUnit = units[ran];
const ranSysLvl = sysLvl[ran];

class User{
    @observable data = {
        //模拟用户，(province)省级，(city)市级，(county)区县级
        username: 'admin',
        token: '5w4f8gfnbv2d812',
        userGrade:ranGrade,
        userUnit:ranUnit,
        sysLvl:ranSysLvl
    };
    @action.bound login(username){
        this.data.username = username;
    }
    @action.bound logout(){
        this.data.username = null;
    }
}
const user = new User();
export default user;
