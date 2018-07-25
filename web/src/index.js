import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Session} from './common/common';
//login
import LoginView from './common/login';
//header
import Header from './common/header';
//nav,content
import Main from './common/main';
//css
import './static/css/iconfont.css';
import './static/css/public.css';
import './static/css/login.css';
import './static/css/header.css';
import './static/css/navigation.css';

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

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            userinfo:null
        };
    }
    componentWillMount(){
        const session = new Session();
        const userinfo = session.getItem('USERINFO');
        this.setState({
            user:userinfo ? userinfo : null
        });
    }
    render(){
        //登录拦截
        return (this.state.user ? <Index /> : <LoginView />);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);