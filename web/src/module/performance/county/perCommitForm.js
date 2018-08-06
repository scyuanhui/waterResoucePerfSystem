/**
 *绩效指标表单
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {RenderTable,RenderThead} from './perCom';
import List from './perHome';
import PerDeclar from './perDeclarDo';

//绩效指标表单头部
@observer
class PerCommitFormHead extends Component{
    constructor(props) {
        super(props);
    }
    openPerDeclare(){
        cNode.currentNode = <PerDeclar />;
    }
    render() {
        return (
            <div className="row contentHeadRow">
                <div className="col-4">
                    <p className="pageTitle">绩效指标表单</p>
                    <p className="grey">你可以修改或者提交</p>
                </div>
                <div className="col-8 text-right">
                    <div className="btnGroup">
                        <button className="btn btn-sm btn-default" onClick={this.openPerDeclare.bind(this)}>返回</button>
                    </div>
                </div>
            </div>
        );
    }
}
//绩效指标表单名
class PerCommitFormName extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="perTableName">
                <span className="module-title">宜宾县绩效指标一览表</span>
                <span className="grey">共计75项</span>
            </div>
        );
    }
}
//绩效指标表单
@observer
class PerCommitFormTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heads:['一级指标','二级指标','三级指标'],
            list:[
                {
                    name:'项目决策',
                    list:[
                        {
                            name:'项目决策1',
                            list:['项目决策11','项目决策12','项目决策13']
                        },
                        {
                            name:'项目决策2',
                            list:['项目决策22','项目决策23','项目决策24']
                        },
                        {
                            name:'项目决策3',
                            list:['项目决策33']
                        }
                    ]
                },
                {
                    name:'项目管理',
                    list:[
                        {
                            name:'项目决策1',
                            list:['项目决策11','项目决策12','项目决策13']
                        },
                        {
                            name:'项目决策3',
                            list:['项目决策33']
                        }
                    ]
                }
            ]
        };
    }
    commitAudit(){
        cNode.currentNode = <List />;
    }
    render() {
        return (
            <div className="row contentRow">
                <PerCommitFormName />
                <div>
                    <table style={{background:'#f4f8ff',borderRadius:'5px'}}>
                        <RenderThead list={this.state.heads} />
                        <tbody>
                        {
                            this.state.list.map((item,index) => {
                                const oneList = item.list;
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td colSpan="2">
                                            <table>
                                                <tbody>
                                                {
                                                    oneList.map((twoItem,twoIndex) => {
                                                        const lastList = twoItem.list;
                                                        return (
                                                            <tr key={twoIndex}>
                                                                <td>{twoItem.name}</td>
                                                                <td colSpan="2">
                                                                    <table>
                                                                        <tbody>
                                                                        {
                                                                            lastList.map((threeItem,threeIndex) => {
                                                                                return (
                                                                                    <tr key={threeIndex}>
                                                                                        <td>{threeItem}</td>
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
                <div className="btnGroup text-center">
                    <button className="btn btnLongBlue" onClick={this.commitAudit.bind(this)}>提交审核</button>
                    <button className="btn btnLongBlue">修改表单</button>
                </div>
            </div>
        );
    }
}



export default class PerCmtForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            [
                <PerCommitFormHead key="PerCommitFormHead" />,
                <PerCommitFormTable key="PerCommitFormTable" />
            ]
        );
    }
}