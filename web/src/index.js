import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//login
import LoginView from './login/login';
//home
import Home from './home/home';
//css
import './static/css/iconfont.css';
import './static/css/public.css';
import './static/css/login.css';



ReactDOM.render(
    <LoginView />,
    document.getElementById('root')
);