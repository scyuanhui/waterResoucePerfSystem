import React,{Component} from 'react';
import {Session} from './common';
import axios from 'axios';
//img
import lineActive from './../static/img/line1-active.png';
import dynamicActive from './../static/img/line2-active.png';

class LoginLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const status = this.props.loading ? 'block' : 'none';
        return (
            <div className="loginLoading" style={{display:status}}></div>
        );
    }
}

class LoginHead extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="loginHead">
                <div className="rowOne">
                    <p><span>四川省水利厅</span><span>Performance Appraisal</span></p>
                </div>
                <div className="rowTwo">
                    <div className="lineImgActive" style={{width:this.props.width}}>
                        <img src={lineActive} style={{width:this.props.imgWidth}}/>
                    </div>
                </div>
            </div>
        );
    }
}
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loginEvent() {
        const username = this.refs.username.value.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
        //模拟用户，0是省级用户，1是市级用户，2是区县级用户
        const ran = (Math.random()*2).toFixed(0);
        const name = ran == 0 ? '省级管理员' : ran == 1 ? '市级管理员' : '县级管理员';
        const userinfo = {
            "count":"admin",
            "username": name,
            "token": "5w4f8gfnbv2d812",
            "userLvl":ran
        };
        if(userinfo.count == username){
            this.props.loadingCallback(true);//loading回调
            setTimeout(() => {
                const session = new Session();
                session.setItem('USERINFO', userinfo);
                window.location.href = window.location.origin;
                this.props.loadingCallback(false);
            },1500);
        }
    }

    render() {
        return (
            <div className="loginForm">
                <span className="loginTitle">登录</span>
                <input type="text" placeholder="账号" ref="username"/>
                <input type="password" placeholder="密码" ref="password"/>
                <button type="button" className="btn btn-lg btn-promise" onClick={this.loginEvent.bind(this)}>点击登录
                </button>
                <p><span className="grey">遇到问题，请联系管理员</span><b>028-234434</b></p>
            </div>
        );
    }
}
class LoginDesc extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="loginSysDes">
                <div className="systemName">水利厅绩效考核系统</div>
                <ul>
                    <li className="staticBg">
                        <a></a><a></a>
                    </li>
                    <li className="dynamic">
                        <div className="dynamicImgActive" style={{width:this.props.width}}>
                            <img src={dynamicActive} style={{width:this.props.dynamicActiveImgWidth}}/>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineActiveDivWidth: '0px',
            lineActiveImgWidth: document.documentElement.clientWidth + 'px',//窗口可见宽度
            dynamicDivWidth: '0px',
            dynamicActiveImgWidth: '395px',
            loading:false
        };
    }

    loginLoadingCallback(bool) {
        this.setState({
            loading:bool
        });
    }

    componentDidMount() {
        //动效
        setTimeout((() => {
            this.setState({
                dynamicDivWidth: this.state.dynamicActiveImgWidth
            });
        }), 1);
        setTimeout((() => {
            this.setState({
                lineActiveDivWidth: this.state.lineActiveImgWidth
            });
        }), 1001);
    }

    render() {
        return (
            <div className="loginContainer">
                <LoginHead width={this.state.lineActiveDivWidth} imgWidth={this.state.lineActiveImgWidth} />
                <div className="loginContent">
                    <LoginForm loadingCallback={this.loginLoadingCallback.bind(this)}/>
                    <LoginDesc width={this.state.dynamicDivWidth} imgWidth={this.state.dynamicActiveImgWidth} />
                </div>
                <LoginLoading loading={this.state.loading} />
            </div>
        );
    }
}