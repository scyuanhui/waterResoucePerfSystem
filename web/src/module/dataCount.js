/**
 * 数据统计模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import DataCountContent from './dataCount/index';

export default class DataCount extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return <DataCountContent />;
    }
}
