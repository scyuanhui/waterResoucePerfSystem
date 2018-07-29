/**
 * Created by Lenovo on 2018/7/29.
 * 通知待办
 */
import React,{Component} from 'react';
import {formatDate} from './../../public/common';

//通知待办头部
class BacklogHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row provHead">
                <div className="col-6">
                    <p className="pageTitle">通知待办</p>
                    <p className="grey">您可以选择操作或者查看</p>
                </div>
            </div>
        );
    }
}
class BacklogTableTop extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="backlogTableTop">
                <i className="iconfont icon-dian"></i>
                <b className="module-title">待办列表</b>
                <span className="grey">共{this.props.len}项待办事项</span>
            </div>
        );
    }
}
class BacklogTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list:['青羊区','金牛区','双流区','锦江区','武侯区','成华区','新都区','碑都区','温江县','龙泉驿','金堂县']
        };
    }
    render(){
        const ran = (Math.random()*this.state.list.length).toFixed(0);
        return (
            [
                <BacklogTableTop key="BacklogTableTop" len={ran} />,
                <table key="BacklogTable">
                    <tbody>
                    {
                        this.state.list.map((item,index) => {
                            if(index < ran){
                                return (
                                    <tr key={index}>
                                        <td>自评审核</td>
                                        <td>四川省成都市-{item}水利局提交了自评结果</td>
                                        <td>等待审核</td>
                                        <td>{formatDate(new Date(),'-').YMD_HMS}</td>
                                        <td>
                                            <button className="btn btn-sm btn-empty">查看</button>
                                        </td>
                                    </tr>
                                );
                            }
                        })
                    }
                    </tbody>
                </table>
            ]
        );
    }
}
export default class Backlog extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            [
                <BacklogHead key="BacklogHead" />,
                <div className="backlogRow" key="backlogRow">
                    <BacklogTable />
                </div>
            ]
        );
    }
}