/**
 * 首页模块文件
**/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div style={{height:'1920px',textAlign:'center',color:'#3B86FF'}}>
                <h5>home</h5>
                <p style={{lineHeight:'480px',textAlign:'center'}}>this is home page</p>
            </div>
        );
    }
}
