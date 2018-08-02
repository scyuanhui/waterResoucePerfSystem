/**
 * 首页模块文件
**/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import HomeOneRow from './home/homeTop';
import HomeTwoRow from './home/homeCenter';
import HomeThreeRow from './home/homeBottom';
//import {Modal} from './../public/modal';

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

                {/*
                 <Modal title={"home"} width={"320px"} status={true}>
                 <div>
                 <p>'./home/homeBottom'</p>
                 <p>'./../public/modal'</p>
                 </div>
                 </Modal>
                */}
            </div>
        );
    }
}
