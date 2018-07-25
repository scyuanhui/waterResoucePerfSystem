import {observable,action} from 'mobx';

class User{
    constructor(){
        this.grades = ['province','city','county'];
        this.units = ['四川省水利厅','成都市水利局','金牛区水务处'];
        this.sysLvl = ['省级系统','市级系统','县级系统'];
        this.ran = (Math.random() * 2).toFixed(0);
        this.ranGrade = this.grades[this.ran];
        this.ranUnit = this.units[this.ran];
        this.ranSysLvl = this.sysLvl[this.ran];
    }
    @observable data = {
        //模拟用户，(province)省级，(city)市级，(county)区县级
        username: 'admin',
        token: '5w4f8gfnbv2d812',
        userGrade:this.ranGrade,
        userUnit:this.ranUnit,
        sysLvl:this.ranSysLvl
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
