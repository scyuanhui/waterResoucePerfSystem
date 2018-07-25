/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Session} from './common';
//img
import userHead from './../static/img/userhead.png';
import userOnLine from './../static/img/headOnLine.png';

const session = new Session();

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemName:'绩效考核系统',
            userName: null,
            systemLvl: null
        };
    }

    componentWillMount() {
        const userinfo = session.getItem('USERINFO');
        this.setState({
            userName: userinfo.username
        });
        switch (userinfo.userLvl) {
        case '0':
            this.setState({
                systemLvl: '省级系统'
            });
            break;
        case '1':
            this.setState({
                systemLvl: '市级系统'
            });
            break;
        case '2':
            this.setState({
                systemLvl: '县级系统'
            });
            break;
        }
    }

    logout() {
        session.removeItem('USERINFO');
        window.location.href = window.location.origin;
    }

    render() {
        return (
            <div className="row headerRow">
                <div className="col-2 logo">
                    <a>{this.state.systemName}</a>
                </div>
                <div className="col-4 systemLvl">
                    {this.state.systemLvl}
                </div>
                <div className="col-6">
                    <div className="userstatus">
                        <span title="退出系统" className="exit">
                            退出&nbsp;&nbsp;<b className="iconfont icon-icon" onClick={this.logout.bind(this)}></b>
                        </span>
                        <span className="userhead">
                            <img className="userHeadIcon" src={userHead}/>
                            <img className="userStatusIcon" src={userOnLine}/>
                        </span>
                        <span>
                            四川省水利厅-<b>{this.state.userName}</b>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


