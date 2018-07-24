import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import config from './../router/router';

export default class Navigation extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row bodyRow">
                <ul className="nav">
                    <li className="active">
                        <span>图片</span>
                        <span>汉字</span>
                    </li>
                    <li className="">
                        <span>图片</span>
                        <span>汉字</span>
                    </li>
                    <li className="">
                        <span>图片</span>
                        <span>汉字</span>
                    </li>
                    <li className="">
                        <span>图片</span>
                        <span>汉字</span>
                    </li>
                    <li className="">
                        <span>图片</span>
                        <span>汉字</span>
                    </li>
                </ul>
                <div className="content" id="content"></div>
            </div>
        );
    }
}