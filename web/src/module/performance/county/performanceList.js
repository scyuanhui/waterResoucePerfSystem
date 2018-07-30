/**
 *绩效考评列表(默认绩效考评加载的首页面)
 **/
import React,{Component} from 'react';
import {BaseHead,TableYear} from './perf-com';


//本年表格
class CurrentYearTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heads:['考评节点','完成状态','操作'],
            list:[
                {name:'绩效指标申报1',status:0},
                {name:'绩效指标申报2',status:1},
                {name:'绩效指标申报3',status:1},
                {name:'绩效指标申报4',status:0}
            ]
        };
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
                                const statusBtnClass = item.status == 0 ? 'btn btnSmallRed' : 'btn btnSmallGreen';
                                const statusBtnText = item.status == 0 ? '等待申报' : '审核通过';
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button className={statusBtnClass}>{statusBtnText}</button>
                                        </td>
                                        <td>
                                            {
                                                item.status == 0 ?
                                                    <button className="btn btn-md btn-empty">申报</button> :
                                                    <button className="btn btn-md btn-empty">查看</button>
                                            }
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
                                            <button className="btn btn-md btn-empty">查看</button>
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


