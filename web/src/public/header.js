/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//loginView
import LoginView from './login';
//img
import userHead from './../static/img/userhead.png';
import userOnLine from './../static/img/headOnLine.png';


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemName:'绩效考核系统',
            systemLvl: null
        };
    }

    componentDidMount() {
        switch (this.props.user.data.userGrade) {
        case 'province':
            this.setState({
                systemLvl: '省级系统'
            });
            break;
        case 'city':
            this.setState({
                systemLvl: '市级系统'
            });
            break;
        case 'county':
            this.setState({
                systemLvl: '县级系统'
            });
            break;
        }
    }

    logout() {
        this.props.logout();
        ReactDOM.render(<LoginView />,document.getElementById('root'));
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
                            {this.props.user.data.userUnit}-<b>{this.props.user.data.username}</b>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


