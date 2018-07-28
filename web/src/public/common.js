import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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