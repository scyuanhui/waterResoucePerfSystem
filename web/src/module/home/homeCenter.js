/**
 * Created by Lenovo on 2018/7/28.
 * 首页第二行，绩效结果反馈，绩效指标，绩效目标，绩效自评
 */
import React,{Component} from 'react';
import {setEchartPie} from './../../public/pie';

class HomePie extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'绩效结果反馈',
            color:['#3b86ff','#64e3a3','#ff8373','#a3a0fb'],
            data:[
                {value:(Math.random()*200).toFixed(0), name:'优'},
                {value:(Math.random()*200).toFixed(0), name:'良'},
                {value:(Math.random()*200).toFixed(0), name:'中'},
                {value:(Math.random()*200).toFixed(0), name:'差'}
            ]
        };
    }
    componentDidMount(){
        const option = {
            id:'feedback',
            name:this.state.name,
            color:this.state.color,
            data:this.state.data
        };
        setEchartPie(option);
    }
    render(){
        return (
            <div className="col-3">
                <div className="col-feedback borderRadius5 boxShadow">
                    <p className="module-title">绩效结果反馈</p>
                    <p className="grey">四川省2017年绩效考核自评结果</p>
                    <div id="feedback"></div>
                    <div className="feedbackLvl">
                        <span>优</span>
                        <span>良</span>
                        <span>中</span>
                        <span>差</span>
                    </div>
                </div>
            </div>
        );
    }
}
class HomeSmallBlock extends Component{
    constructor(props){
        super(props);
        this.state = {
            allocationOkNum:(Math.random()*100).toFixed(0),
            allocationNoNum:(Math.random()*100).toFixed(0),
            declareOkNum:(Math.random()*100).toFixed(0),
            declareNoNum:(Math.random()*100).toFixed(0)
        };
    }
    render(){
        return (
            <div className="col-6">
                <div className="col-smallBlock">
                    <div className="blockOne borderRadius5 boxShadow">
                        <p className="module-title">绩效指标</p>
                        <div className="blockDesc perfOk">
                            <span className="perfNum"><b>{this.state.allocationOkNum}个</b><i className="iconfont icon-zhengque"></i></span>
                            <span className="perStatus">已分配区县</span>
                            <span className="perfBottom"></span>
                        </div>
                        <div className="blockDesc perfWarning">
                            <span className="perfNum"><b>{this.state.allocationNoNum}个</b><i className="iconfont icon-wuuiconsuotanhao"></i></span>
                            <span className="perStatus">未分配区县</span>
                            <span className="perfBottom"></span>
                        </div>
                    </div>
                    <div className="blockTwo borderRadius5 boxShadow">
                        <p className="module-title">绩效目标</p>
                        <div className="blockDesc perfOk">
                            <span className="perfNum"><b>{this.state.declareOkNum}个</b><i className="iconfont icon-zhengque"></i></span>
                            <span className="perStatus">已申报区县</span>
                            <span className="perfBottom"></span>
                        </div>
                        <div className="blockDesc perfError">
                            <span className="perfNum"><b>{this.state.declareNoNum}个</b><i className="iconfont icon-wuuiconsuotanhao"></i></span>
                            <span className="perStatus">未申报区县</span>
                            <span className="perfBottom"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class PerfSelfComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            you:(Math.random()*100).toFixed(0),
            liang:(Math.random()*100).toFixed(0),
            zhong:(Math.random()*100).toFixed(0),
            cha:(Math.random()*100).toFixed(0)
        };
    }
    render(){
        const total = parseInt(this.state.you)+parseInt(this.state.liang)+parseInt(this.state.zhong)+parseInt(this.state.cha);
        return (
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
        );
    }
}



export default class HomeTwoRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row homeTwoRow">
                <HomePie />
                <HomeSmallBlock />
                <PerfSelfComment />
            </div>
        );
    }
}
