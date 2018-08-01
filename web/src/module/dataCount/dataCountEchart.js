/**
 * Created by Lenovo on 2018/7/29.
 * 数据统计图表
 */
import React,{Component} from 'react';
import {setHomeBar} from './../../public/bar';
import {setEchartPie} from './../../public/pie';
import {echartDefaultColor} from './../../public/common';

export default class DataCountEchart extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'绩效结果反馈',
            color:echartDefaultColor,
            ran:props.ran,
            data:[
                {value:(Math.random()*200).toFixed(0), name:'优'},
                {value:(Math.random()*200).toFixed(0), name:'良'},
                {value:(Math.random()*200).toFixed(0), name:'中'},
                {value:(Math.random()*200).toFixed(0), name:'差'}
            ]
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            ran:nextProps.ran
        },() => {
            const dataArr = [];
            const nameArr = [];
            const ran = nextProps.ran;
            for(let i = 0;i<ran;i++){
                dataArr.push((Math.random()*100).toFixed(0));
                nameArr.push('第'+i+'条');
            }
            const option = {
                id:'dataCountBar',
                title:'四川省各市统计',
                color:['#3B86FF'],
                xName:nameArr,
                data:dataArr
            };
            setHomeBar(option);
        });
    }
    componentDidMount(){
        const dataArr = [];
        const nameArr = [];
        const ran = this.state.ran;
        for(let i = 0;i<ran;i++){
            dataArr.push((Math.random()*100).toFixed(0));
            nameArr.push('第'+i+'条');
        }
        const option = {
            id:'dataCountBar',
            title:'四川省各市统计',
            color:['#3B86FF'],
            xName:nameArr,
            data:dataArr
        };
        setHomeBar(option);

        const option2 = {
            id:'dataCountPie',
            name:this.state.name,
            color:this.state.color,
            data:this.state.data
        };
        setEchartPie(option2);
    }
    render(){
        console.log(this.state.ran);
        return (
            <div className="echartRow">
                <div className="col-9">
                    <div id="dataCountBar" className="dataCountBar"></div>
                </div>
                <div className="col-3">
                    <div className="dataCount-feedback">
                        <p className="module-title">绩效结果反馈</p>
                        <p className="grey">四川省2017年绩效考核结果</p>
                        <div id="dataCountPie" style={{height:'300px'}}></div>
                        <div className="feedbackLvl">
                            <span className="iconfont icon-you"><b>优</b></span>
                            <span className="iconfont icon-liang"><b>良</b></span>
                            <span className="iconfont icon-zhong"><b>中</b></span>
                            <span className="iconfont icon-cha"><b>差</b></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



