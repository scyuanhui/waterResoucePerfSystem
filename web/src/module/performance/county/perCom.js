/**
 * 绩效考评模块公共组件
 *
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
import {firstGrade} from './../../../store/Evaluation';

//绩效考评列表头部(只有左边有文字)
export class BaseHead extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row contentHeadRow">
                <div className="col-6">
                    <p className="pageTitle">{this.props.name}</p>
                    <p className="grey">{this.props.desc}</p>
                </div>
            </div>
        );
    }
}
//表头：点+年度
export class TableYear extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="tableYear">
                <i className="iconfont icon-dian" style={{color:'#3B86FF'}}></i>
                <span className="module-title">{this.props.year}年度</span>
                <span className="grey">{this.props.desc}</span>
            </div>
        );
    }
}
//步骤条
@observer
export class Step extends Component{
    //props:index[1-5]
    constructor(props){
        super(props);
        this.state = {
            steps:['A','B','C','D','E']
        };
    }
    render(){
        if(this.props.index > this.state.steps.length){
            return;
        }
        return (
            <div className="stepContainer">
                <div className="steps">
                    <div className="line"></div>
                    <ul className="stepsPoints">
                        {
                            this.state.steps.map((item,index) => {
                                const isIcon = index+1 < this.props.index ? 'iconfont icon-zhengque' : '';
                                const isText = index+1 < this.props.index ? '' : item;
                                return (
                                    <li key={index}><span className={isIcon}>{isText}</span></li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="stepTextList">
                    {
                        firstGrade.data.map((item,index) => {
                            const isActive = index+1 == this.props.index ? 'active' :'';
                            return (
                                <span key={index} className={isActive}><b>{item.indexName}</b></span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
//用于返回多重表格
export class RenderTable extends Component{
    //props:list:[]
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <table>
                <tbody>
                {
                    this.props.list.map((item,index) => {
                        return (
                            <tr key={index}>
                                <td>{item+(index+1)}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }
}
//用于返回一个表头
export class RenderThead extends Component{
    //props:list:['xxx','xxx','xxx','xxx',...]
    constructor(props) {
        super(props);
    }
    render(){
        const tds = this.props.list.map((item,index) => <td key={index}>{item}</td>);
        return <thead><tr>{tds}</tr></thead>;
    }
}
export function getTableList(list,id){
    //list:所有的list,indexId:下一级的PID
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].pid == id){
            arr.push(list[i]);
        }
    }
    return arr;
}
