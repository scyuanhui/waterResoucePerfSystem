/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//img
import userHead from './../static/img/userhead.png';
import userOnLine from './../static/img/headOnLine.png';

export default class Head extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.userinfo;
        return (
            <div className="row headerRow">
                <div className="col-2 logo">
                    <a>绩效考核系统</a>
                </div>
                <div className="col-4 systemLvl">
                    {user.data.sysLvl}
                </div>
                <div className="col-6">
                    <div className="userstatus">
                        <span title="退出系统" className="exit">
                            退出&nbsp;&nbsp;<b className="iconfont icon-icon" onClick={this.props.exit}></b>
                        </span>
                        <span className="userhead">
                            <img className="userHeadIcon" src={userHead}/>
                            <img className="userStatusIcon" src={userOnLine}/>
                        </span>
                        <span>
                            {user.data.userUnit}-<b>{user.data.username}</b>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

