/**
 * 首页模块文件
**/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import HomeOneRow from './home/homeTop';
import HomeTwoRow from './home/homeCenter';
import HomeThreeRow from './home/homeBottom';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="container homeContainer">
                <HomeOneRow />
                <HomeTwoRow />
                <HomeThreeRow />
            </div>
        );
    }
}
