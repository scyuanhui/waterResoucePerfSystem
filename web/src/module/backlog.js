/**
 * 通知待办模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Backlog from './backlog/index';

export default class BackLog extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return <Backlog />;
    }
}
