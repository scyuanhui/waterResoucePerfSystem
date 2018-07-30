/**
 *市级审核待批复
 **/
import React,{Component} from 'react';
import {formatDate} from './../../../public/common';

class WaitAuditorTableTop extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="waitAuditorTableTop">
                <i className="iconfont icon-dian"></i>
                <span className="module-title">待审核</span>
                <span className="grey">共{this.props.len}条纪录</span>
            </div>
        );
    }
}
class WaitAuditorTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heads:['地区','标签','审核类型','提交日期','操作'],
            list:['青羊区','金牛区','双流区','锦江区','武侯区','成华区','新都区']
        };
    }
    render(){
        const tds = this.state.heads.map((item,index) => {
            return <td key={index}>{item}</td>;
        });
        return (
            <div className="waitAuditorContainer">
                <WaitAuditorTableTop len={this.state.list.length} />
                <table>
                    <thead>
                        <tr>{tds}</tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((item,index) => {
                            return (
                                <tr key={index}>
                                    <td>{item}</td>
                                    <td>
                                        <span className="btn btn-xs btn-empty btnRadius">{(Math.random()*100).toFixed(0)}个贫困县</span>
                                    </td>
                                    <td>自评审核</td>
                                    <td>{formatDate(new Date(),'-').YMD_HMS}</td>
                                    <td>
                                        <button className="btn btn-md btn-empty borderradius3">查看</button>
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
export default class WaitAuditor extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="waitAuditorRow">
                <WaitAuditorTable />
            </div>
        );
    }
}
