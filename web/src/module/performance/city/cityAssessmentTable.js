/**
 *市本级考核表
 **/
import React,{Component} from 'react';

class CityAssessmentTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            assessmentHeads:['考评节点','完成状态','操作']
        };
    }
    render(){
        const tds = this.state.assessmentHeads.map((item,index) => <td key={index}>{item}</td>);
        const tables = this.props.list.map((item,index) => {
            const tableList = item.list;
            return (
                <div className="assessmentTable" key={item.year}>
                    <div>
                        <i className="iconfont icon-dian"></i>
                        <span className="module-title">{item.year}</span>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>{tds}</tr>
                            </thead>
                            <tbody>
                            {
                                tableList.map((t,i) => {
                                    const btnStatusClass = t.status == 0 ? "btn btn-xs btn-empty btnRadius btnRed" : "btn btn-xs btn-empty btnRadius btnGreen";
                                    const btnStatusText = t.status == 0 ? "等待申报" : "申报通过";
                                    const btnClickText = t.status == 0 ? "申报" : "查看";
                                    return (
                                        <tr key={i}>
                                            <td>{t.name}</td>
                                            <td>
                                                <button className={btnStatusClass}>{btnStatusText}</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-empty">{btnClickText}</button>
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
        });
        return tables;
    }
}
export default class CitySelfTables extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[
                {year:'2015年度',list:[{name:'绩效指标申报',status:0},{name:'绩效指标申报',status:1}]},
                {year:'2016年度',list:[{name:'绩效指标申报',status:0}]},
                {year:'2017年度',list:[{name:'绩效指标申报',status:0},{name:'绩效指标申报',status:1}]}
            ]
        };
    }
    render(){
        return <div><CityAssessmentTable list={this.state.list} /></div>;
    }
}
