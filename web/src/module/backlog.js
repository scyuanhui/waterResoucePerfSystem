/**
 * 通知待办模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class BackLog extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <h5>backLog</h5>
                <p>this is backLog page</p>
            </div>
        );
    }
}

module.exports = {module:<BackLog />};