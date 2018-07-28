/**
 * 绩效考评模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//导入省级绩效考评
import ProvincePerformance from './performance/perf-province/province';


export default class Performance extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return <ProvincePerformance />;
    }
}