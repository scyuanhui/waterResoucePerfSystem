/**
 * 市绩效结果----自评结果
 **/
import React,{Component} from 'react';
import {ranDate,ranNumber} from './../../../public/common';
import Star from './../../../public/star';

//汇总
class SelfCollect extends Component{
    constructor(props){
        super(props);
        this.state = {
            collectHeads:['自评汇总得分','自评审核通过','待自评','优','良','中','差']
        };
    }
    render(){
        const spans = this.state.collectHeads.map((item,index) => <span key={index}>{item}</span>);
        return (
            <div className="collectRow cityCollectSelfRow">
                <ul>
                    <li>{spans}</li>
                    <li>
                        <span>{ranNumber(100)}</span>
                        <span>{ranNumber(100)}</span>
                        <span>{ranNumber(100)}</span>
                        <span><Star size={4} />{ranNumber(100)}</span>
                        <span><Star size={3} />{ranNumber(100)}</span>
                        <span><Star size={2} />{ranNumber(100)}</span>
                        <span><Star size={1} />{ranNumber(100)}</span>
                    </li>
                </ul>
            </div>
        );
    }
}
//自评得分表
class SelfAssessmentTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            heads:['地区','标签属性','自评审核时间','审核状态','自评得分','自评等级','操作'],
            list:[
                {area:'青羊区',tagAttr:[ranNumber(100)+'个贫困村',ranNumber(100)+'个贫困镇'],time:ranDate().YMD,status:0,score:ranNumber(100),lvl:'优'},
                {area:'双流',tagAttr:[ranNumber(100)+'个贫困村',ranNumber(100)+'个贫困镇'],time:ranDate().YMD,status:1,score:ranNumber(100),lvl:'良'},
                {area:'新都区',tagAttr:[ranNumber(100)+'个贫困村'],time:ranDate().YMD,status:0,score:ranNumber(100),lvl:'优'},
                {area:'金堂县',tagAttr:[ranNumber(100)+'个贫困村',ranNumber(100)+'个贫困镇'],time:ranDate().YMD,status:0,score:ranNumber(100),lvl:'优'},
                {area:'新津县',tagAttr:[ranNumber(100)+'个贫困村'],time:ranDate().YMD,status:1,score:ranNumber(100),lvl:'差'},
                {area:'大邑县',tagAttr:[ranNumber(100)+'个贫困村'],time:ranDate().YMD,status:0,score:ranNumber(100),lvl:'中'},
                {area:'金牛区',tagAttr:[ranNumber(100)+'个贫困村',ranNumber(100)+'个贫困镇'],time:ranDate().YMD,status:0,score:ranNumber(100),lvl:'中'}
            ]
        };
    }
    render(){
        const tds = this.state.heads.map((item,index) => <td key={index}>{item}</td>);
        return (
            <div className="assessmentTable">
                <table>
                    <thead>
                        <tr>{tds}</tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((item,index) => {
                            const statusClass = item.status == 0 ? 'finished' : 'grey';
                            const statusText = item.status == 0 ? '审核通过' : '审核驳回';
                            return (
                                <tr key={index}>
                                    <td>{item.area}</td>
                                    <td>{item.tagAttr.map((tag,tindex) => <button key={tindex} className="btn btn-xs btn-empty btnRadius">{tag}</button>)}</td>
                                    <td>{item.time}</td>
                                    <td className={statusClass}>{statusText}</td>
                                    <td>{item.score}</td>
                                    <td>{item.lvl}</td>
                                    <td>
                                        <button className="btn btn-md btn-empty" style={{visibility:item.status == 0 ? 'visible' : 'hidden'}}>查看</button>
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


export default class SelfAssessment extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            [
                <SelfCollect key="SelfCollect" />,
                <SelfAssessmentTable key="SelfAssessmentTable" />
            ]
        );
    }
}