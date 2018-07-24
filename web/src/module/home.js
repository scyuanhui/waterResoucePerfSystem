/**
 * 首页模块文件
**/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <h5>home</h5>
                <img src="static/img/loginBg.jpg" />
            </div>
        );
    }
}