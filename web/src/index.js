import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//public
import {Session} from './public/common';
//login
import LoginView from './public/login';
//header
import Header from './public/header';
//nav,content
import Main from './public/main';
//css
import './static/css/antd.min.css';
import './static/css/iconfont.css';
import './static/css/public.css';
import './static/css/login.css';
import './static/css/header.css';
import './static/css/navigation.css';

const session = new Session();

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            [
                <Header key="head" />,
                <Main key="nav" />
            ]
        );
    }
}
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:session.getItem('USERNAME')
        };
    }
    render() {
        //登录拦截
        return this.state.user ? <Index /> : <LoginView />;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);