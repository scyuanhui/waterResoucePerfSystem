/**
 *绩效指标申报，添加绩效指标项
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {ranNumber} from './../../../public/common';
import {Step,RenderTable} from './perCom';
import List from './perList';
import PerCmtForm from './perCommitForm';


//绩效指标申报，添加绩效指标项头部
class PerDeclareHead extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row contentHeadRow">
                <div className="col-4">
                    <p className="pageTitle">添加绩效指标项</p>
                    <p className="grey">你可以在此申报绩效指标</p>
                </div>
                <div className="col-8 text-right perDeclareAttr">
                    <p className="grey">宜宾地区属性</p>
                    <div className="perDeclareAttrList">
                        <span className="btn btnSmallBlue">{ranNumber(100)+'个贫困县'}</span>
                        <span className="btn btnSmallBlue">{ranNumber(100)+'个贫困术'}</span>
                        <span className="btn btnSmallBlue">{'长江干流'}</span>
                    </div>
                </div>
            </div>
        );
    }
}
//申报内容列表
@observer
class DeclarTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heads:['二级指标','三级指标','操作'],
            list:[
                {
                    name:'数量指标',
                    list:['数量指标','数量指标','数量指标','数量指标','数量指标','数量指标','数量指标']
                },
                {
                    name:'质量指标',
                    list:['质量指标','质量指标','质量指标']
                },
                {
                    name:'时效指标',
                    list:['时效指标','时效指标']
                },
                {
                    name:'成本指标',
                    list:['成本指标']
                }
            ]
        };
    }
    onBackList(){
        cNode.currentNode = <List />;
    }
    checkOnchange(item,event){
        switch (event.currentTarget.checked){
        case true:
            console.log('true');
            console.log(item);
            break;
        case false:
            console.log('false');
            console.log(item);
            break;
        }
    }
    openPerForm(){
        cNode.currentNode = <PerCmtForm />;
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
                                    <td>{a.name}</td>
                                    <td>
                                        <RenderTable list={aList} />
                                    </td>
                                     <td>
                                         <table>
                                             <tbody>
                                             {
                                                 aList.map((e,f) => {
                                                     return (
                                                         <tr key={f}>
                                                             <td className="checkboxTd">
                                                                <input type="checkbox" onChange={this.checkOnchange.bind(this,e)} />
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
                    <button className="btn btnLongBlue" onClick={this.openPerForm.bind(this)}>确认&nbsp;&nbsp;填写下一项</button>
                </div>
            </div>
        );
    }
}
//申报内容
class DeclarContent extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row contentRow">
                <div className="titleGroup"><span className="module-title">宜宾县绩效指标</span></div>
                <div className="stepRow">
                    <div><Step index={3} /></div>
                    <div>
                        <span className="module-title">{ranNumber(100)+'项'}</span>
                        <span className="grey">当前添加绩效考核指标</span>
                    </div>
                </div>
                <DeclarTable />
            </div>
        );
    }
}





export default class PerDeclar extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            [
                <PerDeclareHead key="PerDeclareHead" />,
                <DeclarContent key="DeclarContent" />
            ]
        );
    }
}