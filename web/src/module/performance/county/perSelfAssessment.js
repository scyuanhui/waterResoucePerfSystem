/**
 *绩效指标申报，添加绩效指标项
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {firstGrade} from './../../../store/declar';
import user from './../../../store/userinfo';
import {Checkbox,axios,formatDate} from './../../../public/common';
import api from './../../../store/interface';
import {Step} from './perCom';
import List from './perList';
//获取顶级
function getDataTableList(list,oneIndexId,oneIds){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].oneIndexId == oneIndexId && oneIds.indexOf(list[i].oneIndexId) == -1){
            oneIds.push(list[i].oneIndexId);
            arr.push(list[i]);
        }
    }
    return arr;
}
//获取二级列表
function getTwoTableList(list,id){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].twoIndexId == id){
            arr.push(list[i]);
        }
    }
    return arr;
}

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
                    <td>二级指标</td>
                    <td>三级指标</td>
                    <td>指标项</td>
                    <td>预期指标值</td>
                    <td>实际完成指标值</td>
                    <td>自评得分</td>
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
    render() {
        const totalList = this.props.list;
        const oneIds = [];
        const list = getDataTableList(totalList,this.props.index,oneIds);
        console.log(JSON.stringify(list));
        return (
            <div className="">
                <table style={{background:'#f4f8ff',borderRadius:'5px'}}>
                    <SelfAssessTableHead />
                    <tbody>
                    {
                        list.map((oneItem,oneIndex) => {
                            const twoList = getTwoTableList(totalList,oneItem.twoIndexId);
                            return (
                                <tr key={Math.random()}>
                                    <td>{oneItem.twoIndexName}</td>
                                    <td>
                                        <table>
                                            <tbody>
                                            {
                                                twoList.map((twoItem,twoIndex) => {
                                                    //const threeList = getThreeTableList(totalList,twoItem.indexId);
                                                    return (
                                                        <tr key={Math.random()}>
                                                            <td>{twoItem.threeIndexName}</td>
                                                            <td>123</td>
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
@observer
class DeclarContent extends Component{
    constructor(props) {
        super(props);
        this.state ={
            min:1,
            max:5,
            list:[],
            length:null,
            defaultIndex:1,
            defaultList:[],
            steps:[],//第一排五步的文字
            regionName:null
        };
    }
    componentDidMount(){
        const sendData = {
            regionId:user.data.regionId,
            year:formatDate(new Date()).YEAR
        };
        const url = api.perDeclareWaitLook+'?regionId='+sendData.regionId+'&year='+sendData.year;
        axios.post(url).then((res) => {
            //console.log(JSON.stringify(res));
            const regionName = res.data.regionName;
            const list = res.data;
            this.setState({
                length:list.length,
                regionName:regionName,
                list:list
            },() => {
                this.hanldList(list,this.state.defaultIndex);
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    hanldList(list,index){
        const stepList = [];
        for(let i=0;i<list.length;i++){
            if(stepList.indexOf(list[i].oneIndexName) == -1){
                stepList.push(list[i].oneIndexName);
            }
        }
        //const ids = [];
        //const firsts = [];
        //for(let i=0;i<list.length;i++){
        //    if(ids.indexOf(list[i].oneIndexId) == -1){
        //        ids.push(list[i].oneIndexId);
        //        firsts.push(list[i]);
        //    }
        //}
        this.setState({
            steps:stepList
            //defaultList:firsts
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
            //console.log(JSON.stringify(declar.commits));
            //axios.post(api.addPerDeclare,declar.commits).then((res) => {
            //    console.log(JSON.stringify(res));
            //}).catch((error) => {
            //    console.log(error);
            //});
        }
    }
    render(){
        return (
            [
                <PerDeclareHead key="PerDeclareHead" />,
                <div className="row contentRow" key="DeclarContent">
                    <div className="titleGroup"><span className="module-title">{this.state.regionName}绩效指标</span></div>
                    <div className="stepRow">
                        <div><Step index={this.state.defaultIndex} contents={this.state.steps} /></div>
                        <div>
                            <span className="module-title">{'共计'+this.state.length+'项'}</span>
                            <span className="grey">当前添加绩效考核指标</span>
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