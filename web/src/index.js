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
import './static/css/iconfont.css';
import './static/css/public.css';
import './static/css/login.css';
import './static/css/header.css';
import './static/css/navigation.css';

export class Index extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    headerLogout(){
        user.logout();
    }
    render(){
        return (
            [
                <Header key="head" user={user} logout={this.headerLogout.bind(this)} />,
                <Main key="nav" />
            ]
        );
    }
}
@observer
class App extends Component {
    constructor(props) {
        super(props);
    }

    headerLogout() {
        user.logout();
    }

    render() {
        //登录拦截
        return (user.data.username != null ? <Index /> : <LoginView />);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);