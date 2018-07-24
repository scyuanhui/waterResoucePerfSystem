/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Session} from './common/common';
//login
import LoginView from './common/login';
//header
import Header from './common/header';
//nav
import Navigation from './common/navigation';


export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:''
        };
    }
    componentWillMount(){
        const session = new Session();
        const user = session.getItem('USERINFO');
        if(!user){
            ReactDOM.render(
                <LoginView />,
                document.getElementById('root')
            );
        }else{
            this.setState({
                username:user.username
            });
        }
    }
    render(){
        return (
            [
                <Header key="head" user={this.state.username} />,
                <Navigation key="nav" />
            ]
        );
    }
}
