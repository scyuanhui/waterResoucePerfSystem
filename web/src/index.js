import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
//store
import user from './store/userinfo';
//login
import LoginView from './public/login';
//header
import Head from './public/head';
//nav,content
import Main from './public/main';
//css
import './static/css/index.css';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:user.data.username
        };
    }
    logout(){
        user.logout();
        this.setState({
            user:user.data.username
        });
    }
    render() {
        //登录拦截
        const loginWindown = <LoginView />;
        const indexWindown = [
            <Head key="head" userinfo={user} exit={this.logout.bind(this)} />,
            <Main key="NavContent" />
        ];
        return this.state.user != null ? indexWindown : loginWindown;
    }
}

ReactDOM.render(
    <App />,
    window.root
);