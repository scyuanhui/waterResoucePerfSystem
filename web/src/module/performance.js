/**
 * 绩效考评模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//省级绩效考评
import ProvincePerformance from './performance/province/index';
//市级绩效考评
import CityPerformance from './performance/city/index';
//区县级绩效考评
import CountPerfmance from './performance/county/index';


export default class Performance extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        //return <ProvincePerformance />;
        //return <CityPerformance />;
        return <CountPerfmance />;
    }
}