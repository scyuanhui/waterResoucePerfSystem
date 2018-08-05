/**
 *绩效指标申报，添加绩效指标项
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {declar} from './../../../store/Evaluation';
import user from './../../../store/userinfo';
import {Checkbox,axios,formatDate} from './../../../public/common';
import api from './../../../store/interface';
import {Step,getTableList} from './perCom';
import List from './perList';


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
                    <div className="perDeclareAttrList">
                        <span className="grey">{this.props.regionName}地区属性</span>
                        {
                            this.props.attrs.length > 0 ? this.props.attrs.map((item,index) => {
                                return (
                                    <span key={index} className="btn btnSmallBlue">{item}</span>
                                );
                            }) : ''
                        }
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
            checked:true,
            heads:['二级指标','三级指标','操作']
        };
    }
    onChange(item,flag){
        if(!flag){
            for(let i=0;i<declar.commits.length;i++){
                if(declar.commits[i] == item.indexId){
                    declar.commits.splice(i,1);
                }
            }
        }
        if(flag){
            for(let i=0;i<declar.commits.length;i++){
                if(declar.commits.indexOf(item.indexId) == -1){
                    declar.commits.push(item.indexId);
                }
            }
        }
    }
    render() {
        const tds = this.state.heads.map((item,index) => <td key={index} width="33.3333%">{item}</td>);
        return (
            <div className="">
                <table style={{background:'#f4f8ff',borderRadius:'5px'}}>
                    <thead><tr>{tds}</tr></thead>
                    <tbody>
                    {
                        this.props.first.map((itemOne,indexOne) => {
                            const indexId = itemOne.indexId;
                            const twoList = getTableList(this.props.list,indexId);
                            return (
                                <tr key={indexOne}>
                                    <td width="33.3333%">{itemOne.indexName}</td>
                                    <td colSpan="2" width="66.6666%">
                                        <table>
                                            <tbody>
                                            {
                                                twoList.map((itemTwo,indexTwo) => {
                                                    return (
                                                        <tr key={indexTwo}>
                                                            <td width="50%">{itemTwo.indexName}</td>
                                                            <td width="50%">
                                                                <Checkbox checked="checked" onChange={this.onChange.bind(this,itemTwo)} />
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
            steps:[],//第一排五步的文字
            firsts:[],//一级指标
            regionName:null,
            attrs:[]
        };
    }
    componentDidMount(){
        const sendData = {
            regionId:user.data.regionId,
            year:formatDate(new Date()).YEAR
        };
        const url = api.getCountyPerDeclare+'?regionId='+sendData.regionId+'&year='+sendData.year;
        axios.post(url).then((res) => {
            //console.log(JSON.stringify(res));
            const regionName = res.data.regionName;
            const attrs = res.data.attrs;
            const list = res.data.idnexs;
            this.setState({
                length:list.length,
                regionName:regionName,
                attrs:attrs,
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
            declar.commits.push(list[i].indexId);
            if(list[i].pid == 0){//默认从PID为0取起走
                stepList.push(list[i].indexName);
            }
        }
        this.setState({
            steps:stepList
        },() => {
            const oneList = getTableList(list,index);
            this.setState({
                firsts:oneList
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
            axios.post(api.addPerDeclare,declar.commits).then((res) => {
                console.log(JSON.stringify(res));
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    render(){
        return (
            [
                <PerDeclareHead key="PerDeclareHead" attrs={this.state.attrs} regionName={this.state.regionName} />,
                <div className="row contentRow" key="DeclarContent">
                    <div className="titleGroup"><span className="module-title">{this.state.regionName}绩效指标</span></div>
                    <div className="stepRow">
                        <div><Step index={this.state.defaultIndex} contents={this.state.steps} /></div>
                        <div>
                            <span className="module-title">{'共计'+this.state.length+'项'}</span>
                            <span className="grey">当前添加绩效考核指标</span>
                        </div>
                    </div>
                    <DeclarTable list={this.state.list} first={this.state.firsts} />
                    <div className="btnGroup text-center">
                        <button className="btn btnLongBlue" onClick={this.prev.bind(this)}>返回&nbsp;&nbsp;修改上一项</button>
                        <button className="btn btnLongBlue" ref="save" onClick={this.next.bind(this)}>确认&nbsp;&nbsp;填写下一项</button>
                    </div>
                </div>
            ]
        );
    }
}
export default class PerDeclarDo extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <DeclarContent />;
    }
}