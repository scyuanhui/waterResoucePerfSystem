/**
 * Created by Lenovo on 2018/7/28.
 * 自评得分柱图，绩效复评
 */
import React,{Component} from 'react';
import {setHomeBar} from './../../public/bar';

export default class HomeThreeRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            you:(Math.random()*100).toFixed(0),
            liang:(Math.random()*100).toFixed(0),
            zhong:(Math.random()*100).toFixed(0),
            cha:(Math.random()*100).toFixed(0)
        };
    }
    componentDidMount(){
        const dataArr = [];
        for(let i = 0;i<9;i++){
            dataArr.push((Math.random()*100).toFixed(0));
        }
        const option = {
            id:'homeBar',
            title:'四川省2017年各市县绩效考核自评得分',
            color:['#3B86FF'],
            xName:['成都','德阳','绵阳','简阳','遂宁','雅安','达州','广元','资中'],
            data:dataArr
        };
        setHomeBar(option);
    }
    render(){
        const total = parseInt(this.state.you)+parseInt(this.state.liang)+parseInt(this.state.zhong)+parseInt(this.state.cha);
        return (
            <div className="row homeThreeRow">
                <div className="col-9">
                    <div id="homeBar" className="col-bar boxShadow"></div>
                </div>
                <div className="col-3">
                    <div className="col-self boxShadow">
                        <p className="module-title">绩效自评<span className="grey">已自评<b>{total}</b></span></p>
                        <ul>
                            <li>
                                <i className="">优</i>
                                <span className="seflComNum">{this.state.you}</span>
                                <span>个/区县</span>
                            </li>
                            <li>
                                <i className="">良</i>
                                <span className="seflComNum">{this.state.liang}</span>
                                <span>个/区县</span>
                            </li>
                            <li>
                                <i className="">中</i>
                                <span className="seflComNum">{this.state.zhong}</span>
                                <span>个/区县</span>
                            </li>
                            <li>
                                <i className="">差</i>
                                <span className="seflComNum">{this.state.cha}</span>
                                <span>个/区县</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
