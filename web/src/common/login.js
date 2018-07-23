import React,{Component} from 'react';
import {Session} from './common';

class LoginHead extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="loginHead">
                <div className="rowOne">
                    <p><span>四川省水利厅</span><span>Performance Appraisal</span></p>
                </div>
                <div className="rowTwo">
                    <div className="lineImgActive" style={{width:this.props.width}}>
                        <img src={this.props.imgSrc} style={{width:this.props.imgWidth}} />
                    </div>
                </div>
            </div>
        );
    }
}
class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    loginEvent(){
        const username = this.refs.username.value.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g,"");
        const userinfo = {'username':username.length > 0 ? username : 'admin','token':'KFIUCHWKXU128963DAS9D2E95D8DSD5F4Q4DS'};
        if(username.length > 0){
            const session = new Session();
            session.setItem('USERINFO',userinfo);
            window.location.href = window.location.origin;
        }
    }
    render(){
        return (
            <div className="loginForm">
                <span className="loginTitle">登录</span>
                <input type="text" placeholder="账号" ref="username" />
                <input type="password" placeholder="密码" ref="password"/>
                <button type="button" className="btn btn-lg btn-promise" onClick={this.loginEvent.bind(this)}>点击登录</button>
                <p><span className="grey">遇到问题，请联系管理员</span><b>028-234434</b></p>
            </div>
        );
    }
}
class LoginSystemDescription extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="loginSysDes">
                <div className="systemName">水利厅绩效考核系统</div>
                <ul>
                    <li className="staticBg staticSs"></li>
                    <li className="staticBg staticGif"></li>
                    <li className="dynamic">
                        <div className="dynamicImgActive" style={{width:this.props.width}}>
                            <img src={this.props.imgSrc} style={{width:this.props.dynamicActiveImgWidth}} />
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
            lineActiveDivWidth:'0px',
            lineActiveImg:'./src/static/img/line1-active.png',
            lineActiveImgWidth:document.documentElement.clientWidth+'px',//窗口可见宽度
            dynamicDivWidth:'0px',
            dynamicActiveImg:'./src/static/img/line2-active.png',
            dynamicActiveImgWidth:'566px'
        };
    }
    componentDidMount() {
        //头部动效
        setTimeout((() => {
            this.setState({
                lineActiveDivWidth:this.state.lineActiveImgWidth,
                dynamicDivWidth:this.state.dynamicActiveImgWidth
            });
        }),500);
    }

    render() {
        return (
            <div className="loginContainer">
                <LoginHead width={this.state.lineActiveDivWidth} imgSrc={this.state.lineActiveImg} imgWidth={this.state.lineActiveImgWidth} />
                <div className="loginContent">
                    <LoginForm />
                    <LoginSystemDescription width={this.state.dynamicDivWidth} imgSrc={this.state.dynamicActiveImg} imgWidth={this.state.dynamicActiveImgWidth}  />
                </div>
                <div className="loginFooter">
                    <b>省级系统</b>
                </div>
            </div>
        );
    }
}