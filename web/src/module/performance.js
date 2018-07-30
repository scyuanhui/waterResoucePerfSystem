/**
 * 绩效考评模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//导入省级绩效考评
import ProvincePerformance from './performance/perf-province/index';
//导入市级绩效考评
import CityPerformance from './performance/pref-city/index';


export default class Performance extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        //return <ProvincePerformance />;
        return <CityPerformance />;
    }
}