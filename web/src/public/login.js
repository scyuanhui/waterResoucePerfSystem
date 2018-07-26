import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {message} from 'antd';
import {trim} from './common';
import axios from 'axios';
import user from './../store/userinfo';
import App from './../index';
//img
import lineActive from './../static/img/line1-active.png';
import dynamicActive from './../static/img/line2-active.png';

@observer
class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    loginEvent() {
        const username = trim(this.refs.username.value);
        const password = trim(this.refs.password.value);
        const result = user.loginCheck(username,password);
        if (result.status) {
            user.login(username);
            ReactDOM.render(
                <LoginLoading />,
                document.getElementById('root')
            );
            setTimeout(() => {
                ReactDOM.render(
                    <App />,
                    document.getElementById('root')
                );
            }, 1000);
        }else{
            message.warning(result.text,1);
        }
    }
    componentDidMount(){
        //回车登录
        document.onkeydown = (e) => {
            let code = e.charCode || e.keyCode;
            if(code == 13){
                this.loginEvent();
            }
        };
    }
    render() {
        return (
            <div className="loginForm">
                <span className="loginTitle">登录</span>
                <input type="text" placeholder="账号" ref="username" defaultValue="admin" maxLength="25"/>
                <input type="password" placeholder="密码" ref="password" maxLength="25"/>
                <button type="button" className="btn btn-lg btn-promise" onClick={this.loginEvent.bind(this)}>点击登录
                </button>
                <p><span className="grey">遇到问题，请联系管理员</span><b>028-234434</b></p>
            </div>
        );
    }
}

class LoginLoading extends Component {
    render() {
        return (
            <div className="loginLoading"></div>
        );
    }
}

class LoginHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loginHead">
                <div className="rowOne">
                    <p>
                        <span>四川省水利厅</span>
                        <span>Performance Appraisal</span>
                    </p>
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
class LoginDesc extends Component {
    constructor(props) {
        super(props);
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
                            <img src={dynamicActive} style={{width:this.props.imgWidth}}/>
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
            dynamicActiveImgWidth: '395px'
        };
    }

    componentDidMount() {
        //动效
        this.setState({
            dynamicDivWidth: this.state.dynamicActiveImgWidth
        },() => {
            setTimeout((() => {
                this.setState({
                    lineActiveDivWidth: this.state.lineActiveImgWidth
                });
            }), 1000);
        });
    }

    render() {
        return (
            <div className="loginContainer">
                <LoginHead width={this.state.lineActiveDivWidth} imgWidth={this.state.lineActiveImgWidth}/>
                <div className="loginContent">
                    <LoginForm />
                    <LoginDesc width={this.state.dynamicDivWidth} imgWidth={this.state.dynamicActiveImgWidth}/>
                </div>
            </div>
        );
    }
}
function loginCheck(username,password){
    if(username == ''){
        return '账号不能为空';
    }
    if(password == ''){
        return '密码不能为空';
    }
    if(username.length < 5){
        return '账号不能少于5位数';
    }
    if(password.length < 5){
        return '密码不能少于6位数';
    }
}