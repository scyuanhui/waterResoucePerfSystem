/**
 *绩效指标申报，审核通过查看
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
    render(){
        const tds = this.props.list.map((item,index) => {
            const width = index == 0 || index == 1 ? '25%' : '50%';
            return <td key={index} width={width}>{item}</td>;
        });
        return <thead><tr>{tds}</tr></thead>;
    }
}
//绩效指标表单
@observer
class PerFormLookTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heads:['一级指标','二级指标','三级指标'],
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
                        <RenderLookThead list={this.state.heads} />
                        <tbody>
                        {
                            this.state.firstList.map((item,index) => {
                                const secendids = [];
                                const twoList = getTwoTableList(this.state.list,item.id,secendids);
                                return (
                                    <tr key={index}>
                                        <td width="25%">{item.name}</td>
                                        <td colSpan="2" width="75%">
                                            <table>
                                                <tbody>
                                                {
                                                    twoList.map((twoItem,twoIndex) => {
                                                        const threeList = getThreeTableList(this.state.list,twoItem.twoIndexId);
                                                        return (
                                                            <tr key={twoIndex}>
                                                                <td width="30%">{twoItem.twoIndexName}</td>
                                                                <td width="70%" colSpan="2">
                                                                    <table>
                                                                        <tbody>
                                                                        {
                                                                            threeList.map((threeItem,threeIndex) => {
                                                                                return (
                                                                                    <tr key={threeIndex}>
                                                                                        <td style={{borderBottom:'1px solid #d0dfff',textAlign:'left',textIndent:'50px'}}>{threeItem.threeIndexName}</td>
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



export default class PerAuditorOk extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            [
                <PerFormLookHead key="PerFormLookHead" />,
                <PerFormLookTable key="PerFormLookTable" />
            ]
        );
    }
}