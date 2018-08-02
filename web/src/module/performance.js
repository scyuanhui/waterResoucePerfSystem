/**
 * 绩效考评模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
//store
import user from './../store/userinfo';
//省级绩效考评
import ProvincePerformance from './performance/province/index';
//市级绩效考评
import CityPerformance from './performance/city/index';
//区县级绩效考评
import CountPerfmance from './performance/county/index';

@observer
export default class Performance extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        switch (user.data.grades){
        case 'country':
        return <div>{JSON.stringify({country:'国家级系统,正在运筹帷幄中^o^...'})}</div>;
            break;
        case 'province':
        return <ProvincePerformance />;
            break;
        case 'city':
        return <CityPerformance />;
            break;
        case 'county':
        return <CountPerfmance />;
            break;
        }
    }
}