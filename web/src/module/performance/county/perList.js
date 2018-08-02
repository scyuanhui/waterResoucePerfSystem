/**
 *绩效考评列表(默认绩效考评加载的首页面)
 **/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import axios from 'axios';
import api from './../../../store/interface';
import cNode from './../../../store/PerCurrentMountModule';
import {BaseHead,TableYear} from './perCom';
import PerDeclar from './perDeclare';
import PerFormLook from './perLook';
import PerFeedBack from './perFeedback';
import PerTargetWrite from './perTargetWrite';


const demoData =[
    {
        "id": 1,
        "year": 2018,
        "regionId": 2500,
        "status": 1,
        "note": "",
        "nodeNo": 1,
        "statusName": "等待审核",
        "nodeName": "绩效指标申报",
        "createTime": 1531475568000,
        "lastUpdateTime": 1532685164000,
        "createUserId": 2323,
        "lastUpdateUserId": 2323,
        "level": null
    },
    {
        "id": null,
        "year": null,
        "regionId": null,
        "status": 0,
        "note": null,
        "nodeNo": 2,
        "statusName": "等待填写",
        "nodeName": "绩效目标填写",
        "createTime": null,
        "lastUpdateTime": null,
        "createUserId": null,
        "lastUpdateUserId": null,
        "level": null
    },
    {
        "id": 2,
        "year": 2018,
        "regionId": 2500,
        "status": 2,
        "note": null,
        "nodeNo": 1,
        "statusName": "审核通过",
        "nodeName": "绩效指标申报",
        "createTime": 1533002963000,
        "lastUpdateTime": 1532761823000,
        "createUserId": 23,
        "lastUpdateUserId": null,
        "level": 0
    }
];



//本年表格
@observer
class CurrentYearTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //考评节点:[1.绩效指标申报,2.绩效目标填写,3.绩效自评,4.绩效复查]
            heads:['考评节点','完成状态','操作'],
            arr:[]
        };
    }
    componentDidMount(){
        //axios.post(api.getCountyPerList,{regionId:2500,year:2018}).then((res) => {
        //    console.log(JSON.stringify(res));
        //    this.setState({
        //        list:res.data.data
        //    });
        //}).catch((error) => {
        //    console.log(error);
        //});
        this.hanldList(demoData);
    }
    hanldList(list){
        for(let i=0;i<list.length;i++){
            //绩效指标申报
            if(list[i].nodeNo == 1 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '申报';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 1 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 1 && list[i].status == 2){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
            //绩效目标填写
            if(list[i].nodeNo == 2 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '填写';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 2 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
            //绩效自评
            if(list[i].nodeNo == 3 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallRed';
                list[i].btnText = '填写';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 3 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 3 && list[i].status == 2){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '填写';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 3 && list[i].status == 3){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 3 && list[i].status == 4){
                list[i].btnStatusClass = 'btn btnSmallOrange';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
            //绩效自评复查
            if(list[i].nodeNo == 4 && list[i].status == 0){
                list[i].btnStatusClass = 'btn btnSmallPurple';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
            if(list[i].nodeNo == 4 && list[i].status == 1){
                list[i].btnStatusClass = 'btn btnSmallGreen';
                list[i].btnText = '查看';
                list[i].btnEvent = null;
            }
        }
        this.setState({
            arr:list
        });
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
        const tds = this.state.heads.map((a,b) => <td key={a}>{a}</td>);
        const trs = this.state.arr.map((item,index) => {
            return (
                <tr key={index}>
                    <td>{item.nodeName}</td>
                    <td>
                        <button className={item.btnStatusClass}>{item.statusName}</button>
                    </td>
                    <td>
                        <button className="btn btn-md btn-empty">
                            {item.btnText}
                        </button>
                    </td>
                </tr>
            );
        });
        const table = <table><thead><tr>{tds}</tr></thead><tbody>{trs}</tbody></table>;
        if(this.state.arr.length > 0){
            return (
                <div className="row contentRow">
                    <TableYear year="2017" />
                    <div>{table}</div>
                </div>
            );
        }else{
            return (
                <div className="row contentRow">
                    <TableYear year="2017" />
                    <div className="text-center">LOADING...</div>
                </div>
            );
        }
    }
}
//去年表格
@observer
class LastYearTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heads:['考评节点','完成状态','操作'],
            list:[
                {name:'绩效指标申报1',status:0},
                {name:'绩效指标申报2',status:0},
                {name:'绩效指标申报3',status:0},
                {name:'绩效指标申报4',status:0}
            ]
        };
    }
    perLook(){
        cNode.currentNode = <PerFormLook />;
    }
    render(){
        const tds = this.state.heads.map((a,b) => <td key={a}>{a}</td>);
        return (
            <div className="row contentRow">
                <TableYear year="2016" />
                <div>
                    <table>
                        <thead><tr>{tds}</tr></thead>
                        <tbody>
                        {
                            this.state.list.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button className="btn btnSmallGreen">审核通过</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-md btn-empty" onClick={this.perLook.bind(this)}>查看</button>
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


