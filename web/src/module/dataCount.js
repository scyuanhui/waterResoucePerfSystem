/**
 * 数据统计模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class DataCount extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div style={{color:'purple'}}>
                <h5>dataCount</h5>
                <p style={{lineHeight:'480px',textAlign:'center'}}>this is dataCount page</p>
            </div>
        );
    }
}
