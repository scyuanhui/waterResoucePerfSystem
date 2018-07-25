/**
 * 绩效考评模块
 * **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Performance extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <h5>performance</h5>
                <p>this is performance page</p>
            </div>
        );
    }
}
module.exports = {module:<Performance />};