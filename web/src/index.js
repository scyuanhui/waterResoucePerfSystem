import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//css
import './../static/css/public.css';
//login
import LoginView from './login/login';



ReactDOM.render(
    <LoginView />,
    document.getElementById('root')
);