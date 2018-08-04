/**
 *绩效指标申报，表单查看
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
import axios from 'axios';
//store
import cNode from './../../../store/PerCurrentMountModule';
import {decalWaitLook} from './../../../store/declar';
import {formatDate} from './../../../public/common';
import user from './../../../store/userinfo';
import api from './../../../store/interface';
import {RenderThead} from './perCom';
import List from './perList';


//绩效指标表单查看头部
@observer
class PerFormLookHead extends Component{
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
class PerFormLookName extends Component{
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
//表单的一些其它详情（蓝色背景的）
@observer
class PerLookDesc extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="perTableDesc">
                <ul>
                    <li>{formatDate(decalWaitLook.data.createTime,'-').YMD}</li>
                    <li>申报人：{decalWaitLook.data.createUserId}</li>
                    <li>等待上级审核</li>
                    <li>{decalWaitLook.data.nodeName}</li>
                    <li className="active">等待审核</li>
                    <li>反馈绩效考核指标</li>
                </ul>
            </div>
        );
    }
}
//绩效指标表单
@observer
class PerFormLookTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentYear:formatDate(new Date()).YEAR,
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
    componentDidMount(){
        //console.log(JSON.stringify(decalWaitLook.data));
        const sendData = {
            regionId:user.data.regionId,
            year:this.state.currentYear
        };
        const url = api.perDeclareWaitLook+'?regionId='+sendData.regionId+'&year='+sendData.year;
        axios.post(url).then((res) => {
            //console.log(JSON.stringify(res));
            const list = res.data;
            const len = list.length;
            const oneIds = [];

            //取得顶层ID
            for(let i=0;i<len;i++){
                if(oneIds.indexOf(list[i].oneIndexId) == -1){
                    oneIds.push(list[i].oneIndexId);
                }
            }
            for(let i=0;i<oneIds.length;i++){
                const arr = getTwoList(list,oneIds[i]);
                console.log(JSON.stringify(arr));
            }
            //this.setState({
            //    arr:newArr
            //});
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className="row contentRow">
                <PerLookDesc />
                <PerFormLookName />
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
            </div>
        );
    }
}



export default class PerDeclareWaitLook extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            [
                <PerFormLookHead key="PerFormLookHead" />,
                <PerFormLookTable key="PerFormLookTable" />
            ]
        );
    }
}