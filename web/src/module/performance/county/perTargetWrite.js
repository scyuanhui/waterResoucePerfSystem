/**
 *绩效目标填写
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {declar,targetWrite,decalWaitLook} from './../../../store/Evaluation';
import user from './../../../store/userinfo';
import api from './../../../store/interface';
import {ranNumber,isNumber,formatDate,axios} from './../../../public/common';
import {RenderThead,Step} from './perCom';
import List from './perHome';

function getDataTableList(list,indexId){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].oneIndexId == indexId){
            arr.push(list[i]);
        }
    }
    return arr;
}
function getTwoDataList(list,indexId,twoIds){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].twoIndexId == indexId && twoIds.indexOf(list[i].twoIndexId) == -1){
            twoIds.push(list[i].twoIndexId);
            arr.push(list[i]);
        }
    }
    return arr;
}
function getThreeDataList(list,twoIndexId){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].twoIndexId == twoIndexId){
            arr.push(list[i]);
        }
    }
    return arr;
}

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
            heads:['二级指标','三级指标','指标项','输入预期指标值']
        };
    }
    componentDidUpdate (){
        setTimeout(() => {
            const expect = document.getElementById('expect');
            const inputs = expect.getElementsByTagName('input');
            console.log(inputs.length);
            for(let i=0;i<inputs.length;i++){
                inputs[i].value = '';
            }
        },10);
    }
    inputOnchange(item,event){
        const flag = isNumber(event.currentTarget.value);
        console.log(flag);
        if(flag){
            const value = event.currentTarget.value;
            //console.log(value);
            //console.log(JSON.stringify(item));
            for(let i=0;i<targetWrite.commits.length;i++){
                if(targetWrite.commits[i].pfmId == item.pfmId){
                    targetWrite.commits[i].preValue = value;
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
            targetWrite.commits.push(sendExamines);


        }else{
            event.currentTarget.value = '';
        }
    }
    render() {
        const tds = this.state.heads.map((item,index) => <td key={index}>{item}</td>);
        const list = this.props.list;
        const totalList = this.props.totalList;
        const oneList = [];
        const oneIds = [];
        for(let i=0;i<list.length;i++){
            if(oneIds.indexOf(list[i].oneIndexId) == -1) {
                oneIds.push(list[i].oneIndexId);
                oneList.push(list[i]);
            }
        }
        return (
            <div className="">
                <table style={{background:'#f4f8ff'}} id="expect">
                    <thead><tr>{tds}</tr></thead>
                    <tbody>
                    {
                        oneList.map((oneItem,oneIndex) => {
                            const twoIds = [];
                            const twoList = getTwoDataList(totalList,oneItem.twoIndexId,twoIds);
                            return (
                                <tr key={oneIndex}>
                                    <td>{oneItem.oneIndexName}</td>
                                    <td colSpan="3">
                                        <table>
                                            <tbody>
                                            {
                                                twoList.map((twoItem,twoIndex) => {
                                                    //const threeIds = [];
                                                    const threeList = getThreeDataList(totalList,twoItem.twoIndexId);
                                                    return (
                                                        <tr key={twoIndex}>
                                                            <td>{twoItem.twoIndexName}</td>
                                                            <td colSpan="2">
                                                                <table>
                                                                    <tbody>
                                                                    {
                                                                        threeList.map((threeItem,threeIndex) => {
                                                                            return (
                                                                                <tr key={threeIndex}>
                                                                                    <td>{threeItem.threeIndexName}</td>
                                                                                    <td style={{width:'50%'}}>
                                                                                        <input type="text" onChange={this.inputOnchange.bind(this,threeItem)} className="rateInput" maxLength="3" defaultValue={this.state.defaultValue} />
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
            </div>
        );
    }
}
//申报内容
@observer
class TargetWriteContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            min:1,
            max:5,
            list:[],
            length:null,
            defaultIndex:1,
            defaultList:[],
            steps:[]//第一排五步的文字
        };
    }
    componentDidMount(){
        const sendData = {
            regionId:user.data.regionId,
            year:formatDate(new Date()).YEAR
        };
        const url = api.perDeclareWaitLook+'?regionId='+sendData.regionId+'&year='+sendData.year;
        axios.post(url).then((res) => {
            const list = res.data;
            //console.log(JSON.stringify(list));
            this.setState({
                length:list.length,
                list:list
            },() => {
                this.hanldList(list,this.state.defaultIndex);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    hanldList(list,index){
        //console.log(JSON.stringify(list));
        const stepList = [];
        for(let i=0;i<list.length;i++){
            if(stepList.indexOf(list[i].oneIndexName) == -1){//默认从PID为0取起走
                stepList.push(list[i].oneIndexName);
            }
        }
        this.setState({
            steps:stepList
        },() => {
            const tableList = getDataTableList(list,index);
            this.setState({
                defaultList:tableList
            });
        });
    }
    prev(){
        if(this.state.defaultIndex > this.state.min){
            const newIndexId = this.state.defaultIndex - 1;
            this.setState({
                defaultIndex:newIndexId
            },() => {
                this.hanldList(this.state.list,this.state.defaultIndex);
            });
        }
        if(this.state.defaultIndex < this.state.max + 1){
            this.refs.save.innerHTML = '确认&nbsp;&nbsp;填写下一项';
        }
    }
    next(){
        if(this.state.defaultIndex < this.state.max){
            const newIndexId = this.state.defaultIndex + 1;
            this.setState({
                defaultIndex:newIndexId
            },() => {
                this.hanldList(this.state.list,this.state.defaultIndex);
            });
        }
        if(this.state.defaultIndex == this.state.max - 1){
            this.refs.save.innerHTML = '保存';
        }
        //最后一步，保存
        if(this.state.defaultIndex == this.state.max){
            //console.log(JSON.stringify(targetWrite.commits));
            const sendData = {};
            sendData.examines = targetWrite.commits;
            sendData.nodeNo = decalWaitLook.data.nodeNo;
            sendData.status = 1;
            const json = JSON.stringify(sendData);
            console.log(JSON.parse(json));
            axios.post(api.perTargetWrite,{data:json}).then((res) => {
                console.log(JSON.stringify(res));
                if(res.data['success']){
                    alert('保存成功');
                    cNode.currentNode = <List />;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    render() {
        return (
            [
                <PerTargetWriteHead key="PerTargetWriteHead" />,
                <div className="row contentRow" key="contentRow">
                    <div className="titleGroup"><span className="module-title">绩效指标</span></div>
                    <div className="stepRow">
                        <div><Step index={this.state.defaultIndex} contents={this.state.steps} /></div>
                        <div>
                            <span className="module-title">{this.state.length+'项'}</span>
                            <span className="grey">当前未填写</span>
                        </div>
                    </div>
                    <TargetWriteTable list={this.state.defaultList} totalList={this.state.list} />
                    <div className="btnGroup text-center">
                        <button className="btn btnLongBlue" onClick={this.prev.bind(this)}>返回&nbsp;&nbsp;修改上一项</button>
                        <button className="btn btnLongBlue" ref="save" onClick={this.next.bind(this)}>确认&nbsp;&nbsp;填写下一项</button>
                    </div>
                </div>
            ]
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
                <TargetWriteContent key="TargetWriteContent" />
            ]
        );
    }
}