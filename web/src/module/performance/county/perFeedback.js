/**
 *绩效指标表单查看-审核通过查看反馈结果
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {RenderThead} from './perCom';
import List from './perList';

//绩效指标表单查看头部
@observer
class PerFormFeedBackHead extends Component{
    constructor(props) {
        super(props);
    }
    openPerList(){
        cNode.currentNode = <List />;
    }
    render() {
        return (
            <div className="row contentHeadRow">
                <div className="col-4">
                    <p className="pageTitle">绩效指标表单</p>
                    <p className="grey">你可以查看已提交的指标</p>
                </div>
                <div className="col-8 text-right">
                    <div className="btnGroup">
                        <button className="btn btn-sm btn-default" onClick={this.openPerList.bind(this)}>返回</button>
                    </div>
                </div>
            </div>
        );
    }
}
//绩效指标表单名
class PerFormFeedBackName extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="perTableName">
                <span className="module-title">宜宾县绩效指标一览表</span>
                <div className="feedBackColorDesc">
                    <span className="delColor"></span>
                    <span>删除</span>
                    <span className="addColor"></span>
                    <span>新增</span>
                </div>
            </div>
        );
    }
}
//表单的一些其它详情（蓝色背景的）
class PerFeedBackDesc extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="perTableDesc">
                <ul>
                    <li>2018-01-02</li>
                    <li>2018-01-25</li>
                    <li>共计49项考核指标</li>
                    <li>申报人：宋心硕</li>
                    <li>审核人：四川省水利厅-宋心顶</li>
                    <li>新增1项，删除2项</li>
                    <li>申报考核指标</li>
                    <li>已审核</li>
                    <li className="active">反馈绩效考核指标</li>
                </ul>
            </div>
        );
    }
}
//绩效指标表单
class PerFormLookTable extends Component{
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
                            list:['项目决策11','项目决策12','项目决策13','项目决策14']
                        },
                        {
                            name:'项目决策2',
                            list:['项目决策22','项目决策23','项目决策24','项目决策25','项目决策26']
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
    render() {
        return (
            <div className="row contentRow">
                <PerFeedBackDesc />
                <PerFormFeedBackName />
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
                                                                                        <td style={{background:threeIndex == 3 ? 'orange' : threeIndex == 4 ? '#28C38B' : ''}}>{threeItem}</td>
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
            </div>
        );
    }
}



export default class PerFeedBack extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            [
                <PerFormFeedBackHead key="PerFormFeedBackHead" />,
                <PerFormLookTable key="PerFormLookTable" />
            ]
        );
    }
}