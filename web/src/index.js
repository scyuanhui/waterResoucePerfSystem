import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
//store
import user from './store/userinfo';
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
            user:user.data.username
        };
    }
    render() {
        //登录拦截
        return this.state.user != null ? <Index /> : <LoginView />;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);