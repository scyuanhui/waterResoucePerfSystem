/**
 * 首页模块文件
**/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <h5>home</h5>
                <p>this is home page</p>
            </div>
        );
    }
}

module.exports = {module:<Home />};