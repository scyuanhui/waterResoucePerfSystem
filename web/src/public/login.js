import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {observer} from 'mobx-react';
import user from './../store/userinfo';
import {Index} from './../index';
//img
import lineActive from './../static/img/line1-active.png';
import dynamicActive from './../static/img/line2-active.png';

class LoginLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="loginLoading"></div>
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
@observer
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loginEvent() {
        const username = this.refs.username.value.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
        if(username.length > 0){
            user.login(username);
            ReactDOM.render(<LoginLoading />,document.getElementById('root'));
            setTimeout(() => {
                ReactDOM.render(<Index />,document.getElementById('root'));
            },1500);
        }
    }

    render() {
        return (
            <div className="loginForm">
                <span className="loginTitle">登录</span>
                <input type="text" placeholder="账号" ref="username" defaultValue="admin" />
                <input type="password" placeholder="密码" ref="password"/>
                <button type="button" className="btn btn-lg btn-promise" onClick={this.loginEvent.bind(this)}>点击登录</button>
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
            </div>
        );
    }
}