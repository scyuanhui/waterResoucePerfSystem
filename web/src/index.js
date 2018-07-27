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
import NavContent from './public/navigation-content';
//css
import './static/css/index.css';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:null
        };
    }
    logout(){
        this.setState({
            user:null
        },() => {
            user.logout();
        });
    }
    componentDidMount(){
        this.setState({
            user:user.data.username
        });
    }

    render() {
        //登录拦截
        const loginWindown = <LoginView />;
        const mainWindown = [
            <Header key="head" userinfo={user} exit={this.logout.bind(this)} />,
            <NavContent key="NavContent" />
        ];
        return this.state.user != null ? mainWindown : loginWindown;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);