/**
 * 审核批复模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//导入省级审核批复
import ProvinceAuditor from './auditor/province/index';

export default class Auditor extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return <ProvinceAuditor />;
    }
}
