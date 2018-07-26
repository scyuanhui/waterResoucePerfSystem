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
        if(this.state.user != null){
            return (
                [
                    <Header key="head" userinfo={user} logout={this.logout.bind(this)} />,
                    <Main key="nav" />
                ]
            );
        }else{
            return <LoginView />;
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);