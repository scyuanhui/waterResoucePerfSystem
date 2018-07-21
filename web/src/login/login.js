import React,{Component} from 'react';
import {Session} from './../lib/common';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visbleState: 'hidden'
        };
    }

    desVisbalShow() {
        this.setState({
            visbleState: 'visible'
        });
    }

    desVisbalHide() {
        this.setState({
            visbleState: 'hidden'
        });
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
    componentDidMount() {
    }

    render() {
        return (
            <div className="container loginContainer">
                <div className="row topRow"></div>
                <div className="row buttonRow">
                    <div className="loginArea">
                        <ul>
                            <li>
                                <div><span>账号</span></div>
                                <input type="text" ref="username" placeholder="请输入管理员账号"/>
                            </li>
                            <li>
                                <div><span>密码</span></div>
                                <input type="password" ref="password" placeholder="请输入登录密码"/>
                            </li>
                        </ul>
                        <div className="btnArea">
                            <span></span>
                            <button type="button" onClick={this.loginEvent.bind(this)}>●&nbsp;&nbsp;点击登录</button>
                        </div>
                    </div>
                    <div className="systemDescription">
                        <h4>省级系统</h4>
                        <p className="text-right">
                            <i className="iconfont icon-wenhao"
                                onMouseOver={this.desVisbalShow.bind(this)}
                                onMouseOut={this.desVisbalHide.bind(this)}
                            >
                            </i>
                        </p>
                        <div style={{visibility:this.state.visbleState}}>遇到问题？请联系管理员028-127849</div>
                    </div>
                </div>
            </div>
        );
    }
}