/**
 * 数据统计模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class DataCount extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <h5>dataCount</h5>
                <p>this is dataCount page</p>
            </div>
        );
    }
}

module.exports = {module:<DataCount />};