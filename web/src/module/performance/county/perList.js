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


const demoData = {
    "data":
    [{
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
    }, {
        "id": null,
        "year": null,
        "regionId": null,
        "status": 0,
        "note": null,
        "nodeNo": 3,
        "statusName": "绩效目标填写",
        "nodeName": "等待填写",
        "createTime": null,
        "lastUpdateTime": null,
        "createUserId": null,
        "lastUpdateUserId": null,
        "level": null
    }, {
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
    }]
};


//本年表格
@observer
class CurrentYearTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //考评节点:[nodeNo:[1|2|3|4]分别对应['绩效指标申报'|'绩效目标填写'|'绩效自评'|'绩效复查']],
            heads:['考评节点','完成状态','操作'],
            list:[
                {name:'绩效指标申报1',status:0},//等待申报(红)
                {name:'绩效指标申报2',status:1},//审核中(紫)
                {name:'绩效指标申报3',status:2},//审核通过(绿)
                {name:'绩效指标申报4',status:3},//等待填写(红)
                {name:'绩效指标申报5',status:4},//填写完成(绿)
                {name:'绩效指标申报6',status:5},//等待自评(红)
                {name:'绩效指标申报7',status:6},//等待审核(紫)
                {name:'绩效指标申报8',status:7},//审核驳回(橙)
                {name:'绩效指标申报9',status:8},//等待复查(紫)
                {name:'绩效指标申报10',status:9}//复查通过(绿)
            ]
        };
    }
    componentDidMount(){
        axios.post(api.getCountyPerList,{regionId:2500,year:2018}).then((res) => {
            console.log(JSON.stringify(res));
            this.setState({
                //list:dataList
            });
        }).catch((error) => {
            console.log(error);
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
        return (
            <div className="row contentRow">
                <TableYear year="2017" />
                <div>
                    <table>
                        <thead><tr>{tds}</tr></thead>
                        <tbody>
                        {
                            this.state.list.map((item,index) => {
                                switch (item.nodeNo){
                                case 1:
                                item.name = '绩效指标申报';
                                item.btnStatusClass = 'btn btnSmallRed';
                                item.btnStatusText = '等待申报';
                                item.btnText = '申报';
                                item.btnEvent = this.perDeclare.bind(this);
                                    break;
                                case 2:
                                item.name = '绩效目标填写';
                                item.btnStatusClass = 'btn btnSmallPurple';
                                item.btnStatusText = '审核中...';
                                item.btnText = '查看';
                                item.btnEvent = null;
                                    break;
                                case 3:
                                item.name = '绩效自评';
                                item.btnStatusClass = 'btn btnSmallGreen';
                                item.btnStatusText = '审核通过';
                                item.btnText = '查看';
                                item.btnEvent = this.perFeedBack.bind(this);
                                    break;
                                case 4:
                                item.name = '绩效复查';
                                item.btnStatusClass = 'btn btnSmallRed';
                                item.btnStatusText = '等待填写';
                                item.btnText = '填写';
                                item.btnEvent = this.perTargetWrite.bind(this);
                                    break;
                                //case 4:
                                //item.btnStatusClass = 'btn btnSmallGreen';
                                //item.btnStatusText = '填写完成';
                                //item.btnText = '查看';
                                //item.btnEvent = null;
                                //    break;
                                //case 5:
                                //item.btnStatusClass = 'btn btnSmallRed';
                                //item.btnStatusText = '等待自评';
                                //item.btnText = '自评';
                                //item.btnEvent = null;
                                //    break;
                                //case 6:
                                //item.btnStatusClass = 'btn btnSmallPurple';
                                //item.btnStatusText = '等待审核';
                                //item.btnText = '查看';
                                //item.btnEvent = this.perWaitLook.bind(this);
                                //    break;
                                //case 7:
                                //item.btnStatusClass = 'btn btnSmallOrange';
                                //item.btnStatusText = '审核驳回';
                                //item.btnText = '查看';
                                //item.btnEvent = null;
                                //    break;
                                //case 8:
                                //item.btnStatusClass = 'btn btnSmallPurple';
                                //item.btnStatusText = '等待复查';
                                //item.btnText = null;
                                //item.btnHide = true;
                                //item.btnEvent = null;
                                //    break;
                                //case 9:
                                //item.btnStatusClass = 'btn btnSmallGreen';
                                //item.btnStatusText = '复查通过';
                                //item.btnText = '查看';
                                //item.btnEvent = null;
                                //    break;
                                }
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button className={item.btnStatusClass}>{item.btnStatusText}</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-md btn-empty"
                                                onClick={item.btnEvent}
                                                style={{visibility:item.btnHide ? 'hidden' : 'visible'}}
                                            >
                                                {item.btnText}
                                            </button>
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


