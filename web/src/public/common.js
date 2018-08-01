import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export const root = '';
//session
export class Session{
    setItem(key,value){
        sessionStorage.setItem(key,JSON.stringify(value));
    }
    getItem(key){
        return JSON.parse(sessionStorage.getItem(key));
    }
    removeItem(key){
        sessionStorage.removeItem(key);
    }
}
//ajax
export class Axios{
    constructor(){
        //前提：登录时已设置好USERINFO
        this.user = JSON.parse(sessionStorage.getItem('USERINFO'));
    }
    get(o){
        if(!this.user.TOKEN){
            console.log('USER.TOKEN is undefined');
            return;
        }
        axios.get(o.url,{
            headers:{'Authorization':'Bearer '+this.user.TOKEN},
            params: o.data ? o.data : null//{}
        }).then((res) => {
            o.success(res);
        }).catch((error) => {
            console.log(error);
        });
    }
    post(o){
        if(!this.user.TOKEN){
            console.log('USER.TOKEN is undefined');
            return;
        }
        axios.post(o.url,o.data,{
            headers:{'Authorization':'Bearer '+this.user.TOKEN}
        }).then((res) => {
            o.success(res);
        }).catch((error) => {
            console.log(error);
        });
    }
    delete(url,callback){
        if(!this.user.TOKEN){
            console.log('USER.TOKEN is undefined');
            return;
        }
        axios.delete(url).then((res) => {
            callback(res);
        });
    }
    put(o){
        if(!this.user.TOKEN){
            console.log('USER.TOKEN is undefined');
            return;
        }
        axios.put(o.url,o.data,{
            headers:{'Authorization':'Bearer '+this.user.TOKEN}
        }).then((res) => {
            o.success(res);
        }).catch((error) => {
            console.log(error);
        });
    }
}
function setLen(str){
    str = str.toString().length < 2 ? 0 + str.toString() : str;
    return str;
}
//日期格式化
export function formatDate(dateStr,reg) {
    if(!dateStr){
        return;
    }
    let _data = new Date(dateStr);
    let year = _data.getFullYear();
    let month = setLen(_data.getMonth() + 1);
    let date = setLen(_data.getDate());
    let hour = setLen(_data.getHours());
    let minute = setLen(_data.getMinutes());
    let second = setLen(_data.getSeconds());
    let _reg = reg ? reg : '-';
    return {
        'YEAR':year,
        'MONTH':month,
        'DATE':date,
        'YMD':year + _reg + month + _reg + date,
        'HMS':hour + ":" + minute + ":" + second,
        'YMD_HMS':year + _reg + month + _reg + date + " " + hour + ":" + minute + ":" + second
    };
}
//字符串去空
export function trim(str){
    let result = '';
    let len = str.length;
    for(let i=0;i<len;i++){
        if(str[i] != ' '){
            result += str[i];
        }
    }
    return result;
}
//常用图表颜色，分别是 【优，良，中，差】
export const echartDefaultColor = ['#3b86ff','#64e3a3','#ff8373','#a3a0fb'];
//随机数
export function ranNumber(int){
    //返回int以内的随机数
    return (Math.random()*int).toFixed(0);
}
//随机日期、时间
export function ranDate(){
    const ran = (Math.random()*1000000000000).toFixed(0);
    const ranTime = new Date().getTime() - parseInt(ran);
    const dateNum = new Date(ranTime);
    const year = dateNum.getFullYear();
    const month = setLen(dateNum.getMonth() + 1);
    const date = setLen(dateNum.getDate());
    const hour = setLen(dateNum.getHours());
    const minute = setLen(dateNum.getMinutes());
    const second = setLen(dateNum.getSeconds());
    return {
        'YEAR':year,
        'MONTH':month,
        'DATE':date,
        'YMD':year + '-' + month + '-' + date,
        'HMS':hour + ":" + minute + ":" + second,
        'YMD_HMS':year + '-' + month + '-' + date + " " + hour + ":" + minute + ":" + second
    };
}
export function isNumber(num){
    return /^\d|\d.\d$/.test(num);
}
export class Checkbox extends Component{
    //<Checkbox checked="checked" onChange={this.onChange.bind(this)} />
    constructor(props){
        super(props);
    }
    onClick(event){
        const checkbox = event.currentTarget;
        const className = checkbox.className;
        switch (className){
        case 'checkbox active':
        checkbox.className = 'checkbox';
        this.props.onChange(false);
            break;
        case 'checkbox':
        checkbox.className = 'checkbox active';
        this.props.onChange(true);
            break;
        }
    }
    render(){
        const isChecked = this.props.checked == 'checked' ? 'checkbox active' : 'checkbox';
        return (
            <span className={isChecked} onClick={this.onClick.bind(this)}></span>
        );
    }
}