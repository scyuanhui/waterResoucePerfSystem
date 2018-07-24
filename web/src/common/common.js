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
//export class Axios{
//    constructor(){
//        this.token = JSON.parse(sessionStorage.getItem('USERINFO'));
//    }
//    get(){
//        axios.get();
//    }
//}