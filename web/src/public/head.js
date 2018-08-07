/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
//store
import user from './../store/userinfo';
import {trim,axios} from './common';
import api from './../store/interface';
import {message} from './modal';
//img
import userHead from './../static/img/userhead.png';
import userOnLine from './../static/img/headOnLine.png';

//修改密码模块
@observer
class ModifyPassWord extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputRowStatus:false,
            modifyTipsStatus:false
        };
    }
    openModifyWindow(){
        const status = this.state.inputRowStatus;
        switch (status){
        case true:
        this.setState({
            inputRowStatus:false
        });
            break;
        case false:
        this.setState({
            inputRowStatus:true
        });
            break;
        }
    }
    savePassWord(){
        const __oldPwd = trim(this.refs.oldPwd.value);
        const __firstPwd = trim(this.refs.firstPwd.value);
        const __secendPwd = trim(this.refs.secendPwd.value);
        if(__oldPwd.length >= 6 && __firstPwd == __secendPwd && __firstPwd.length >= 6){
            const sendData = {
                userId:user.data.userId,
                oldPassword:__oldPwd,
                newPassword:__firstPwd
            };
            axios.post(api.ModifyPassWord,sendData).then((res) => {
                //console.log(JSON.stringify(res));
                if(res.data.code == 0){
                    this.setState({
                        inputRowStatus:false,
                        modifyTipsStatus:true
                    },() => {
                        setTimeout(() => {
                            this.setState({
                                inputRowStatus:false,
                                modifyTipsStatus:false
                            });
                            this.props.close(false);
                        },2000);
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        }else{
            message.warning('密码长度至少6位或者两次输入的新密码不一致');
        }




    }
    render(){
        return (
            <div className="modifyPwdBox" ref="modifyPwdBox" style={{display:this.props.status ? 'block' : 'none'}}>
                <ul>
                    <li><i className="iconfont icon-ren"></i><span>我的账号：</span><span>{user.data.username}</span></li>
                    <li><i className="iconfont icon-im"></i><span>我的名字：</span><span>{user.data.username}</span></li>
                    <li><i className="iconfont icon-unit"></i><span>所属单位：</span><span>{user.data.systemLvl}</span></li>
                    <li onClick={this.openModifyWindow.bind(this)}><i className="iconfont icon-suo1"></i><span>修改密码</span></li>
                </ul>
                <div className="inputRow" style={{display:this.state.inputRowStatus ? 'block' : 'none'}}>
                    <input type="password" placeholder="输入原密码" ref="oldPwd" />
                    <input type="password" placeholder="输入新密码" ref="firstPwd" />
                    <input type="password" placeholder="再次输入新密码" ref="secendPwd" />
                    <button className="btn btnLongBlue" onClick={this.savePassWord.bind(this)}>保存</button>
                </div>
                <div className="modifyTips" style={{display:this.state.modifyTipsStatus ? 'block' : 'none'}}>
                    <i className="iconfont icon-suo2"></i>
                    <p>修改成功</p>
                </div>
            </div>
        );
    }
}


@observer
export default class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyBoxStatus:false
        };
    }
    closeModifyBox(flag){
        this.setState({
            modifyBoxStatus:flag
        });
    }
    userLogout(){
        axios.post(api.logout,{userId:user.data.userId}).then((res) => {
            if(res.data && res.data.code == 0){
                user.logout();
            }else{
                console.log(JSON.stringify(res));
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }
    openModifyBox(){
        const status = this.state.modifyBoxStatus;
        switch (status){
        case true:
        this.setState({
            modifyBoxStatus:false
        });
            break;
        case false:
        this.setState({
            modifyBoxStatus:true
        });
            break;
        }
    }
    render() {
        return (
            <div className="row headerRow">
                <div className="col-2 logo">
                    <a>绩效考核系统</a>
                </div>
                <div className="col-4 systemLvl">
                    {user.data.systemLvl}
                </div>
                <div className="col-6">
                    <div className="userstatus">
                        <span title="退出系统" className="exit">
                            退出&nbsp;&nbsp;<b className="iconfont icon-icon" onClick={this.userLogout.bind(this)}></b>
                        </span>
                        <span className="userhead" onClick={this.openModifyBox.bind(this)}>
                            <img className="userHeadIcon" src={userHead}/>
                            <img className="userStatusIcon" src={userOnLine}/>
                        </span>
                        <span>
                            {user.data.systemLvl}-<b>{user.data.username}</b>
                        </span>
                    </div>
                </div>
                <ModifyPassWord status={this.state.modifyBoxStatus} close={this.closeModifyBox.bind(this)} />
            </div>
        );
    }
}


