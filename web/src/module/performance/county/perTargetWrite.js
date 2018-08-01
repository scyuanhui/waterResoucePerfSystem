/**
 *绩效目标填写
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {ranNumber,isNumber} from './../../../public/common';
import {RenderThead,Step} from './perCom';
import List from './perList';

//绩效目标填写头部
@observer
class PerTargetWriteHead extends Component{
    constructor(props) {
        super(props);
    }
    openPerList(){
        cNode.currentNode = <List />;
    }
    render() {
        return (
            <div className="row contentHeadRow">
                <div className="col-4">
                    <p className="pageTitle">绩效目标填写</p>
                    <p className="grey">你可以填写预期指标值</p>
                </div>
                <div className="col-8 text-right">
                    <div className="btnGroup">
                        <button className="btn btn-sm btn-default" onClick={this.openPerList.bind(this)}>返回</button>
                    </div>
                </div>
            </div>
        );
    }
}
//申报内容列表
@observer
class TargetWriteTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heads:['二级指标','三级指标','指标项','输入预期指标值'],
            list:[
                {
                    name:'项目决策',
                    list:[
                        {
                            name:'项目决策1',
                            list:['项目决策11','项目决策12','项目决策13','项目决策14']
                        },
                        {
                            name:'项目决策2',
                            list:['项目决策22','项目决策23','项目决策24','项目决策25','项目决策26']
                        },
                        {
                            name:'项目决策3',
                            list:['项目决策33']
                        }
                    ]
                },
                {
                    name:'项目管理',
                    list:[
                        {
                            name:'项目决策1',
                            list:['项目决策11','项目决策12','项目决策13']
                        },
                        {
                            name:'项目决策3',
                            list:['项目决策33']
                        }
                    ]
                }
            ]
        };
    }
    onBackList(){
        cNode.currentNode = <List />;
    }
    checkOnchange(event){
        const flag = isNumber(event.currentTarget.value);
        console.log(flag);
        if(!flag){
            event.currentTarget.value = '';
        }
    }
    onNext(){
        cNode.currentNode = <PerTargetWrite />;
    }
    render() {
        const tds = this.state.heads.map((item,index) => <td key={index}>{item}</td>);
        return (
            <div className="">
                <table style={{background:'#f4f8ff',borderRadius:'5px'}}>
                    <thead><tr>{tds}</tr></thead>
                    <tbody>
                    {
                        this.state.list.map((a,b) => {
                            const aList = a.list;
                            return (
                                <tr key={b}>
                                    <td style={{background:'#d8e6ff'}}>{a.name}</td>
                                    <td colSpan="3">
                                        <table>
                                            <tbody>
                                            {
                                                aList.map((e,f) => {
                                                    const eList = e.list;
                                                    return (
                                                        <tr key={f}>
                                                            <td>{e.name}</td>
                                                            <td colSpan="2">
                                                                <table>
                                                                    <tbody>
                                                                    {
                                                                        eList.map((h,i) => {
                                                                            return (
                                                                                <tr key={i}>
                                                                                    <td>{h}</td>
                                                                                    <td style={{width:'50%'}}>
                                                                                        <input type="text" onChange={this.checkOnchange.bind(this)} className="rateInput" maxLength="5" />
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })
                                                                    }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <div className="btnGroup text-center">
                    <button className="btn btnLongBlue" onClick={this.onBackList.bind(this)}>返回&nbsp;&nbsp;修改上一项</button>
                    <button className="btn btnLongBlue" onClick={this.onNext.bind(this)}>确认&nbsp;&nbsp;填写下一项</button>
                </div>
            </div>
        );
    }
}
//申报内容
class TargetWriteContent extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row contentRow">
                <div className="titleGroup"><span className="module-title">宜宾县绩效指标</span></div>
                <div className="stepRow">
                    <div><Step index={2} /></div>
                    <div>
                        <span className="module-title">{ranNumber(100)+'项'}</span>
                        <span className="grey">当前未填写</span>
                    </div>
                </div>
                <TargetWriteTable />
            </div>
        );
    }
}





export default class PerTargetWrite extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            [
                <PerTargetWriteHead key="PerTargetWriteHead" />,
                <TargetWriteContent key="TargetWriteContent" />
            ]
        );
    }
}