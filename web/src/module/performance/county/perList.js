/**
 *绩效考评列表(默认绩效考评加载的首页面)
 **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import api from './../../../store/interface';
import cNode from './../../../store/PerCurrentMountModule';
import {axios,formatDate} from './../../../public/common';
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
        const sendData = {
            year:this.state.currentYear
        };
        axios.post(api.getCountyPerList,sendData).then((res) => {
            console.log(JSON.stringify(res));
            const list = res.data;
            if(list.length > 0){
                const newArr = this.hanldList(list);
                this.setState({
                    arr:newArr
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    hanldList(list){
        for(let i=0;i<list.length;i++){
            //绩效指标申报
            if(list[i].nodeNo == 1 && list[i].status == 0){//绩效指标申报：待申报
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '申报';
                list[i].page = <PerDeclarDo />;
            }
            if(list[i].nodeNo == 1 && list[i].status == 1){//绩效指标申报：等待审核
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
                list[i].page = <PerDeclareWaitLook />;
            }
            if(list[i].nodeNo == 1 && list[i].status == 2){//绩效指标申报：审核通过
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
            }
            //绩效目标填写
            if(list[i].nodeNo == 2 && list[i].status == 0){//绩效目标填写：待填写
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '填写';
                list[i].page = <PerTargetWrite />;
            }
            if(list[i].nodeNo == 2 && list[i].status == 1){//绩效目标填写：填写完成
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
            }
            //绩效自评
            if(list[i].nodeNo == 3 && list[i].status == 0){//绩效自评：待自评填写
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '填写';
            }
            if(list[i].nodeNo == 3 && list[i].status == 1){//绩效自评：等待审核
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
            }
            if(list[i].nodeNo == 3 && list[i].status == 2){//绩效自评：市审核通过
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '填写';
            }
            if(list[i].nodeNo == 3 && list[i].status == 3){//绩效自评：省审核通过
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
            }
            if(list[i].nodeNo == 3 && list[i].status == 4){//绩效自评：审核驳回
                list[i].btnStatusClass = 'btn btnSmallOrange';
                list[i].btnText = '查看';
            }
            //绩效自评复查
            if(list[i].nodeNo == 4 && list[i].status == 0){//绩效自评复查：等待复查
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
            }
            if(list[i].nodeNo == 4 && list[i].status == 1){//绩效自评复查：已复查
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
            }
        }
        return list;
    }
    eventHanld(item){
        console.log(item.page);
        cNode.currentNode = item.page;
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
                                            <button className="btn btn-md btn-empty" onClick={this.eventHanld.bind(this,item)}>
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
            yesterYear:formatDate(new Date()).YEAR - 1,
            heads:['考评节点','完成状态','操作'],
            arr:[]
        };
    }
    componentDidMount(){
        const sendData = {
            year:this.state.yesterYear
        };
        axios.post(api.getCountyPerList,sendData).then((res) => {
            console.log(JSON.stringify(res));
            const list = res.data;
            if(list.length > 0){
                for(let i=0;i<list.length;i++){
                    list[i].btnStatusClass = 'btn btnSmallGreen';
                    list[i].btnText = '查看';
                    list[i].page = <PerDeclareWaitLook />;
                }
                this.setState({
                    arr:list
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    perLook(item){
        cNode.currentNode = item.page;
    }
    render(){
        const tds = this.state.heads.map((a,b) => <td key={a} width="33.3333%">{a}</td>);
        return (
            <div className="row contentRow">
                <TableYear year={this.state.yesterYear} />
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
                                            <button className="btn btn-md btn-empty" onClick={this.perLook.bind(this,item)}>
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


