/**
 * 审核批复模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class Auditor extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div style={{color:'orange'}}>
                <h5>auditor</h5>
                <p style={{lineHeight:'480px',textAlign:'center'}}>this is auditor page</p>
            </div>
        );
    }
}
