import React,{Component} from 'react';

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
                                <input type="text" id="username" placeholder="请输入管理员账号"/>
                            </li>
                            <li>
                                <div><span>密码</span></div>
                                <input type="password" id="password" placeholder="请输入登录密码"/>
                            </li>
                        </ul>
                        <div className="btnArea">
                            <span></span>
                            <button type="button">●&nbsp;&nbsp;点击登录</button>
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