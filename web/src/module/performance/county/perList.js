/**
 *绩效考评列表(默认绩效考评加载的首页面)
 **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import axios from 'axios';
import api from './../../../store/interface';
import cNode from './../../../store/PerCurrentMountModule';
import {formatDate} from './../../../public/common';
import user from './../../../store/userinfo';
import {BaseHead,TableYear} from './perCom';
import PerDeclarDo from './perDeclarDo';
import PerDeclareWaitLook from './perDeclareWaitLook';
import PerFeedBack from './perFeedback';
import PerTargetWrite from './perTargetWrite';
//本年表格
@observer
class CurrentYearTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //考评节点:[1.绩效指标申报,2.绩效目标填写,3.绩效自评,4.绩效复查]
            currentYear:formatDate(new Date()).YEAR,
            heads:['考评节点','完成状态','操作'],
            arr:[]
        };
    }
    componentDidMount(){
        const regionId = user.data.regionId;
        axios.post(api.getCountyPerList,
            {regionId:regionId,year:this.state.currentYear}
        ).then((res) => {
            console.log(JSON.stringify(res));
            const newArr = this.hanldList(res.data);
            this.setState({
                arr:newArr
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    hanldList(list){
        for(let i=0;i<list.length;i++){
            //绩效指标申报
            if(list[i].nodeNo == 1 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '申报';
                list[i].btnEvent = () => {cNode.currentNode = <PerDeclar />;};//绩效指标申报，去申报
            }
            if(list[i].nodeNo == 1 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
                list[i].btnEvent = () => {cNode.currentNode = <PerDeclareWaitLook />;};//绩效指标申报，等待审核查看
            }
            if(list[i].nodeNo == 1 && list[i].status == 2){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = () => null;//绩效指标申报，审核通过查看
            }
            //绩效目标填写
            if(list[i].nodeNo == 2 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '填写';
                list[i].btnEvent = () => {cNode.currentNode = <PerTargetWrite />;};
            }
            if(list[i].nodeNo == 2 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = () => {console.log(list[i].btnText);};
            }
            //绩效自评
            if(list[i].nodeNo == 3 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '填写';
                list[i].btnEvent = () => {cNode.currentNode = <PerTargetWrite />;};
            }
            if(list[i].nodeNo == 3 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
                list[i].btnEvent = () => {console.log(list[i].btnText);};
            }
            if(list[i].nodeNo == 3 && list[i].status == 2){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '填写';
                list[i].btnEvent = () => () => {cNode.currentNode = <PerTargetWrite />;};
            }
            if(list[i].nodeNo == 3 && list[i].status == 3){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = () => {console.log(list[i].btnText);};
            }
            if(list[i].nodeNo == 3 && list[i].status == 4){
                list[i].btnStatusClass = 'btn btnSmallOrange';
                list[i].btnText = '查看';
                list[i].btnEvent = () => {console.log(list[i].btnText);};
            }
            //绩效自评复查
            if(list[i].nodeNo == 4 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
                list[i].btnEvent = () => {console.log(list[i].btnText);};
            }
            if(list[i].nodeNo == 4 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = () => {console.log(list[i].btnText);};
            }
        }
        return list;
    }
    perDeclare(){
        cNode.currentNode = <PerDeclar />;
    }
    perWaitLook(){
        cNode.currentNode = <PerFormLook />;
    }
    perFeedBack(){
        cNode.currentNode = <PerFeedBack />;
    }
    perTargetWrite(){
        cNode.currentNode = <PerTargetWrite />;
    }
    render(){
        const tds = this.state.heads.map((a,b) => <td key={a} width="33.3333%">{a}</td>);
        return (
            <div className="row contentRow">
                <TableYear year={this.state.currentYear} />
                <div>
                    <table>
                        <thead><tr>{tds}</tr></thead>
                        <tbody>
                        {
                            this.state.arr.length > 0 ? this.state.arr.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nodeName}</td>
                                        <td>
                                            <button className={item.btnStatusClass}>{item.statusName}</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-md btn-empty" onClick={item.btnEvent}>
                                                {item.btnText}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : <tr><td className="text-center" colSpan="3">No Data</td></tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
//去年表格
@observer
class LastYearTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            yesteryear:formatDate(new Date()).YEAR - 1,
            heads:['考评节点','完成状态','操作'],
            arr:[]
        };
    }
    componentDidMount(){
        const regionId = user.data.regionId;
        axios.post(api.getCountyPerList,
            {regionId:regionId,year:this.state.yesteryear}
        ).then((res) => {
            console.log(JSON.stringify(res));
            const list = res.data;
            for(let i=0;i<list.length;i++){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
            }
            this.setState({
                arr:list
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    perLook(){
        cNode.currentNode = <PerFormLook />;
    }
    render(){
        const tds = this.state.heads.map((a,b) => <td key={a} width="33.3333%">{a}</td>);
        return (
            <div className="row contentRow">
                <TableYear year={this.state.yesteryear} />
                <div>
                    <table>
                        <thead><tr>{tds}</tr></thead>
                        <tbody>
                        {
                            this.state.arr.length > 0 ? this.state.arr.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nodeName}</td>
                                        <td>
                                            <button className={item.btnStatusClass}>{item.statusName}</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-md btn-empty" onClick={this.perLook.bind(this)}>
                                                {item.btnText}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : <tr><td className="text-center" colSpan="3">No Data</td></tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default class List extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            [
                <BaseHead key="BaseHead" name="绩效列表" desc="你可以通过列表操作进行绩效考评" />,
                <CurrentYearTable key="CurrentTable" />,
                <LastYearTable key="LastYearTable" />
            ]
        );
    }
}


