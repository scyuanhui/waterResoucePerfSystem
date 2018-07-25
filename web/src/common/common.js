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
class Axios{
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