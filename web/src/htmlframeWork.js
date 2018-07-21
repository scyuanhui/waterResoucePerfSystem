/**
 * Created by Lenovo on 2018/7/21.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Session} from './lib/common';
//login
import LoginView from './login/login';
//header
import Header from './header/header';


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
            <div>
                <Header user={this.state.username} />
            </div>
        );
    }
}
