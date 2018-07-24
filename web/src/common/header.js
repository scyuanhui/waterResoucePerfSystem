/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Session} from './common';
//css
import './../static/css/header.css';
//img
import userHead from './../static/img/userhead.png';
import userOnLine from './../static/img/headOnLine.png';

export default class Header extends Component{
    constructor(props){
        super(props);
    }
    logout(){
        const session = new Session();
        session.removeItem('USERINFO');
        window.location.href = window.location.origin;
    }
    render(){
        return (
            <div className="row headerRow">
                <div className="col-2 logo">
                    <a>绩效考核系统</a>
                </div>
                <div className="col-4 systemLvl">县级系统</div>
                <div className="col-6">
                    <div className="userstatus">
                        <span title="退出系统" className="exit">
                            退出&nbsp;&nbsp;<b className="iconfont icon-icon" onClick={this.logout.bind(this)}></b>
                        </span>
                        <span className="userhead">
                            <img className="userHeadIcon" src={userHead} />
                            <img className="userStatusIcon" src={userOnLine} />
                        </span>
                        <span>
                            四川省水利厅-<b title={'用户'+this.props.user}>{this.props.user}</b>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


