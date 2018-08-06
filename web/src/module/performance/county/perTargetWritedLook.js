/**
 *绩效指标申报，表单查看
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
import axios from 'axios';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {decalWaitLook} from './../../../store/Evaluation';
import {formatDate} from './../../../public/common';
import user from './../../../store/userinfo';
import api from './../../../store/interface';
import {RenderThead} from './perCom';
import List from './perHome';

//获取二级列表
function getTwoTableList(list,id,secendids){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].oneIndexId == id && secendids.indexOf(id) == -1){
            secendids.push(id);
            arr.push(list[i]);
        }
    }
    return arr;
}
//获取三级列表
function getThreeTableList(list,id){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].twoIndexId == id){
            arr.push(list[i]);
        }
    }
    return arr;
}

//绩效指标表单查看头部
@observer
class PerFormLookHead extends Component{
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
                    <p className="pageTitle">绩效指标表单</p>
                    <p className="grey">你可以查看已提交的指标</p>
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
//绩效指标表单名
class PerFormLookName extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="perTableName">
                <span className="module-title">绩效指标一览表</span>
                <span className="grey">共计{this.props.len}项</span>
            </div>
        );
    }
}

class RenderLookThead extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <thead>
            <tr>
                <td width="10%">一级指标</td>
                <td width="10%">二级指标</td>
                <td width="50%">三级指标</td>
                <td width="20%">指标项</td>
                <td width="10%">各项预期指标值</td>
            </tr>
            </thead>
        );
    }
}
//绩效指标表单
@observer
class PerTargetLookTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentYear:formatDate(new Date()).YEAR,
            list:[],
            firstList:[]
        };
    }
    componentDidMount(){
        //console.log(JSON.stringify(decalWaitLook.data));
        const sendData = {
            regionId:user.data.regionId,
            year:this.state.currentYear
        };
        const url = api.perDeclareWaitLook+'?regionId='+sendData.regionId+'&year='+sendData.year;
        axios.post(url).then((res) => {
            //console.log(JSON.stringify(res));
            const list = res.data;
            const len = list.length;
            const firstIds = [];
            const oneList = [];
            for(let i=0;i<len;i++){
                if(firstIds.indexOf(list[i].oneIndexId) == -1){
                    firstIds.push(list[i].oneIndexId);
                    const item = {
                        id:list[i].oneIndexId,
                        name:list[i].oneIndexName
                    };
                    oneList.push(item);
                }
            }
            this.setState({
                list:list,
                firstList:oneList
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className="row contentRow">
                <PerFormLookName len={this.state.list.length} />
                <div>
                    <table style={{background:'#f4f8ff',borderRadius:'5px'}}>
                        <RenderLookThead />
                        <tbody>
                        {
                            this.state.firstList.map((item,index) => {
                                const secendids = [];
                                const twoList = getTwoTableList(this.state.list,item.id,secendids);
                                return (
                                    <tr key={index}>
                                        <td width="10%">{item.name}</td>
                                        <td colSpan="4" width="90%">
                                            <table>
                                                <tbody>
                                                {
                                                    twoList.map((twoItem,twoIndex) => {
                                                        const threeList = getThreeTableList(this.state.list,twoItem.twoIndexId);
                                                        return (
                                                            <tr key={twoIndex}>
                                                                <td width="10%">{twoItem.twoIndexName}</td>
                                                                <td width="90%" colSpan="3">
                                                                    <table>
                                                                        <tbody>
                                                                        {
                                                                            threeList.map((threeItem,threeIndex) => {
                                                                                console.log(JSON.stringify(threeItem));
                                                                                return (
                                                                                    <tr key={threeIndex}>
                                                                                        <td width="65%">{threeItem.threeIndexName}</td>
                                                                                        <td width="20%">{threeItem.preScore}</td>
                                                                                        <td width="15%">{threeItem.preValue}</td>
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
            </div>
        );
    }
}



export default class PerTargetWritedLook extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            [
                <PerFormLookHead key="PerFormLookHead" />,
                <PerTargetLookTable key="PerTargetLookTable" />
            ]
        );
    }
}