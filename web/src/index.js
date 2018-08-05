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
//
@observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    logout(){
        user.logout();
    }
    render() {
        //登录拦截
        const loginWindown = <LoginView />;
        const indexWindown = [
            <Head key="head" />,
            <Main key="NavContent" />
        ];
        return user.data.username ? indexWindown : loginWindown;
    }
}
ReactDOM.render(
    <App />,
    window.root
);