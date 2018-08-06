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

class IndexLoading extends Component {
    render() {
        return (
            <div className="loginLoading"></div>
        );
    }
}
@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        //登录拦截
        const loginWindown = <LoginView />;
        const indexWindown = [<Head key="head" />,<Main key="NavContent" />];
        return user.data.username ? indexWindown : loginWindown;
    }
}
export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        };
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                loading:false
            });
        },1000);
    }
    render(){
        const app = this.state.loading ? <IndexLoading /> : <Index />;
        return app;
    }
}
ReactDOM.render(
    <App />,
    window.root
);