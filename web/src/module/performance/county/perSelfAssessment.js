/**
 *绩效指标申报，添加绩效指标项
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {message} from './../../../public/modal';
import {selfScore,decalWaitLook} from './../../../store/Evaluation';
import user from './../../../store/userinfo';
import {Checkbox,axios,formatDate,isNumber} from './../../../public/common';
import api from './../../../store/interface';
import {Step} from './perCom';
import List from './perHome';

//绩效指标申报，添加绩效指标项头部
@observer
class PerDeclareHead extends Component{
    constructor(props) {
        super(props);
    }
    openListBack(){
        cNode.currentNode = <List />;
    }
    render() {
        return (
            <div className="row contentHeadRow">
                <div className="col-4">
                    <p className="pageTitle">添加绩效指标项</p>
                    <p className="grey">你可以在此申报绩效指标</p>
                </div>
                <div className="col-8 text-right perDeclareAttr">
                    <button className="btn btn-sm btn-default" onClick={this.openListBack.bind(this)}>返回</button>
                </div>
            </div>
        );
    }
}
class SelfAssessTableHead extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <thead>
                <tr>
                    <td width="10%">二级指标</td>
                    <td width="20%">三级指标</td>
                    <td width="40%">指标项</td>
                    <td width="10%">预期指标值</td>
                    <td width="10%">实际完成指标值</td>
                    <td width="10%">自评得分</td>
                </tr>
            </thead>
        );
    }
}
//申报内容列表
@observer
class DeclarTable extends Component{
    constructor(props) {
        super(props);
    }
    onChange(item,event){
        const flag = isNumber(event.currentTarget.value);
        console.log(flag);
        if(flag){
            const value = event.currentTarget.value;
            //console.log(value);
            //console.log(JSON.stringify(item));
            for(let i=0;i<selfScore.commits.length;i++){
                if(selfScore.commits[i].pfmId == item.pfmId){
                    selfScore.commits[i].preValue = value;
                    return;
                }
            }
            const __pfmId = item.pfmId;
            const __selScore = item.selfScore;
            const __realIndexValue = item.realIndexValue;
            const __checkScore = item.checkScore;
            const __preValue = value;
            const sendExamines = {};
            sendExamines.pfmId = __pfmId;
            sendExamines.selScore = __selScore;
            sendExamines.realIndexValue = __realIndexValue;
            sendExamines.checkScore = __checkScore;
            sendExamines.preValue = __preValue;
            selfScore.commits.push(sendExamines);

        }else{
            event.currentTarget.value = '';
        }
    }
    render() {
        const tableList = this.props.list;
        const tempTrOne = <tr><td></td></tr>;
        const tempTrTwo = <tr>
            <td width="52%"></td>
            <td width="16%" style={{borderLeft:'1px solid #d0dfff'}}></td>
            <td width="16%" style={{borderLeft:'1px solid #d0dfff'}}></td>
            <td width="16%" style={{borderLeft:'1px solid #d0dfff'}}></td>
        </tr>;
        return (
            <div className="">
                <table style={{background:'#f4f8ff',borderRadius:'5px'}}>
                    <SelfAssessTableHead />
                    <tbody>
                    {
                        tableList.map((oneItem,oneIndex) => {
                            const twoList = oneItem.child;
                            return (
                                <tr key={(Math.random())+oneItem.indexId}>
                                    <td width="10%">{oneItem.indexName}</td>
                                    <td colSpan="5" width="90%">
                                        <table>
                                            <tbody>
                                            {
                                                twoList && twoList.length > 0 ? twoList.map((twoItem,twoIndex) => {
                                                    const threeList = twoItem.child;
                                                    console.log(JSON.stringify(threeList));
                                                    return (
                                                        <tr key={(Math.random())+twoItem.indexId}>
                                                            <td width="25%">{twoItem.indexName}</td>
                                                            <td colSpan="4" width="75%">
                                                                <table>
                                                                    <tbody>
                                                                    {
                                                                        threeList && threeList.length > 0 ? threeList.map((threeItem,threeIndex) => {
                                                                             return (
                                                                                 <tr key={(Math.random())+threeItem.indexId}>
                                                                                     <td width="52%">{threeItem.indexName}</td>
                                                                                     <td width="16%" style={{borderLeft:'1px solid #d0dfff'}}>{threeItem.preValue}</td>
                                                                                     <td width="16%" style={{borderLeft:'1px solid #d0dfff'}}>{threeItem.realIndexValue}</td>
                                                                                     <td width="16%" style={{borderLeft:'1px solid #d0dfff'}}>
                                                                                         <input type="text" onChange={this.onChange.bind(this,threeItem)} style={{width:'80%'}} />
                                                                                     </td>
                                                                                 </tr>
                                                                             );
                                                                        }) : tempTrTwo
                                                                    }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    );
                                                }) : tempTrOne
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
            </div>
        );
    }
}
@observer
class DeclarContent extends Component{
    constructor(props) {
        super(props);
        this.state ={
            min:1,
            max:5,
            list:[],
            length:null,
            defaultIndex:1
        };
    }
    componentDidMount(){
        this.hanldList(this.state.defaultIndex);
    }
    hanldList(index){
        const sendData = {
            pid:index,
            regionId:user.data.regionId,
            year:formatDate(new Date()).YEAR
        };
        const url = api.getTargetTableList+'?pid='+sendData.pid+'&regionId='+sendData.regionId+'&year='+sendData.year;
        axios.get(url).then((res) => {
            //console.log(JSON.stringify(res));
            if(res.data.length > 0){
                this.setState({
                    list:res.data
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    prev(){
        const flag = this.state.defaultIndex >=1 && this.state.defaultIndex <= 5;
        if(flag){
            const newIndexId = this.state.defaultIndex - 1;
            //console.log(newIndexId);
            if(newIndexId >= this.state.min){
                if(newIndexId < 5){
                    this.refs.save.innerHTML = '确认&nbsp;&nbsp;填写下一项';
                }
                this.setState({
                    defaultIndex:newIndexId
                },() => {
                    this.hanldList(newIndexId);
                });
            }
        }
    }
    next(){
        const flag = this.state.defaultIndex >=1 && this.state.defaultIndex <= 5;
        if(flag){
            const newIndexId = this.state.defaultIndex + 1;
            //console.log(newIndexId);
            if(newIndexId <= this.state.max){
                if(newIndexId == 5){
                    this.refs.save.innerHTML = '保存';
                }
                this.setState({
                    defaultIndex:newIndexId
                },() => {
                    this.hanldList(newIndexId);
                });
            }
            if(newIndexId == 6){
                const sendData = {};
                sendData.examines = selfScore.commits;
                sendData.nodeNo = decalWaitLook.data.nodeNo;
                sendData.status = 1;
                const json = JSON.stringify(sendData);
                console.log(JSON.parse(json));
                axios.post(api.perTargetWrite,{data:json}).then((res) => {
                    console.log(JSON.stringify(res));
                    if(res.data['success']){
                        message.success('保存成功');
                        cNode.currentNode = <List />;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
    render(){
        return (
            [
                <PerDeclareHead key="PerDeclareHead" />,
                <div className="row contentRow" key="DeclarContent">
                    <div className="titleGroup"><span className="module-title">绩效指标</span></div>
                    <div className="stepRow">
                        <div><Step index={this.state.defaultIndex} /></div>
                        <div>
                            <span className="module-title" style={{color:'#82e9b5'}}>92分&nbsp;优</span>
                            <span className="grey">当前自评得分</span>
                        </div>
                    </div>
                    <DeclarTable index={this.state.defaultIndex} list={this.state.list} />
                    <div className="btnGroup text-center">
                        <button className="btn btnLongBlue" onClick={this.prev.bind(this)}>返回&nbsp;&nbsp;修改上一项</button>
                        <button className="btn btnLongBlue" ref="save" onClick={this.next.bind(this)}>确认&nbsp;&nbsp;填写下一项</button>
                    </div>
                </div>
            ]
        );
    }
}
export default class PerSelfAssessment extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <DeclarContent />;
    }
}