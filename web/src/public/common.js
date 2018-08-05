import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import globalAxios from 'axios';
//axios全局设置
//globalAxios.interceptors.request.use(
//    (config) => {
//        //config.headers['Content-type'] = 'application/x-www-form-urlencoded';
//        //const token = JSON.parse(sessionStorage.getItem('USER')).token;
//        //console.log('token:'+token);
//        //if (token) {
//        //    config.headers.Authorization = token;
//        //}
//        return config;
//    },
//    (error) => {
//        return Promise.reject(error);
//    }
//);
export const axios = globalAxios;
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