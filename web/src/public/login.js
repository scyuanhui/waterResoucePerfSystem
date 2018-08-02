import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import axios from 'axios';
import api from './../store/interface';
import {trim} from './common';
import user from './../store/userinfo';
import App from './../index';
import {Dilog} from './modal';
//img
import lineActive from './../static/img/line1-active.png';
import dynamicActive from './../static/img/line2-active.png';


@observer
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dilogStatus:false,
            dilogText:''
        };
    }
    closeDilog(bool){
        //console.log(bool);
        this.setState({
            dilogStatus:false
        });
    }
    loginEvent() {
        const name = trim(this.refs.username.value);
        const pwd = trim(this.refs.password.value);
        const result = user.loginCheck(name,pwd);
        const mountNode = window.root;
        if (result.status) {
            //axios.post(api.login,{username:name,password:pwd}).then((res) => {
            //    //console.log(JSON.stringify(res));
            //    if(res.data['success'] == true){
            //        user.setUserSession(res.data.data);
            //        ReactDOM.render(<LoginLoading />,mountNode);
            //        setTimeout(() => {
            //            ReactDOM.render(<App />,mountNode);
            //        }, 1000);
            //    }
            //    if(res.data['success'] == false){
            //        this.setState({
            //            dilogStatus:true,
            //            dilogText:res.data.resultMsg
            //        });
            //    }
            //}).catch((error) => {
            //    console.log(error);
            //});
            //mock start
            const mockLoginUser = {userId:1,username:name,mobile:15555555555,regionId:2500,regionName:'成都市',regionLevel:name == 'admin' ? 2 : name == 'amdin1' ? 3 : 4};
            user.setUserSession(mockLoginUser);
            ReactDOM.render(<LoginLoading />,mountNode);
            setTimeout(() => {
                ReactDOM.render(<App />,mountNode);
            }, 1000);
            //mock end
        }else{
            this.setState({
                dilogStatus:true,
                dilogText:result.text
            });
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
                <Dilog title={'提示信息'} width={'300px'} status={this.state.dilogStatus} close={this.closeDilog.bind(this)}>
                    <p className="grey">{this.state.dilogText}</p>
                </Dilog>
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