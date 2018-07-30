/**
 * Created by Lenovo on 2018/7/29.
 * 评价进度
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {formatDate} from './../../../public/common';
import {setBasePie} from './../../../public/pie';

//筛选结果产生的table
class ScreenTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            heads: ['区县名称', '最近更新日期', '进度状态']
        };
    }
    render(){
        const headTds = this.state.heads.map((item, index) => {
            return (
                <td key={index}>{item}</td>
            );
        });
        return (
            <div>
                <table border="0" cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>{headTds}</tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{(Math.random()*10).toFixed(0)}区</td>
                            <td>{formatDate(new Date,'-').YMD_HMS}</td>
                            <td>等待考核分配指标</td>
                        </tr>
                        <tr>
                            <td>{(Math.random()*10).toFixed(0)}县</td>
                            <td>{formatDate(new Date,'-').YMD_HMS}</td>
                            <td>已归档</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
//某个市item
class ScreenCityItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'完成进度2018',
            color:['#3b86ff','#ccc'],
            data:[
                {value:(Math.random()*200).toFixed(0), name:'完成'},
                {value:(Math.random()*200).toFixed(0), name:'未完成'}
            ]
        };
    }
    componentDidMount(){
        const option = {
            id:'finished',
            name:this.state.name,
            color:this.state.color,
            data:this.state.data
        };
        setBasePie(option);
    }
    render(){
        return (
            [
                <div key="itemHeadRow" className="itemHeadRow">
                    <div className="cityName"><i className="iconfont icon-dian"></i><b className="module-title">成都市</b></div>
                    <div className="classify">
                        <ul>
                            <li id="finished"></li>
                            <li>
                                <span><b>24</b>/36</span>
                                <span>完成进度2018</span>
                            </li>
                            <li>
                                <span>36</span>
                                <span>总区县数</span>
                            </li>
                            <li>
                                <span>24</span>
                                <span>已分配指标区县</span>
                            </li>
                            <li>
                                <span>17</span>
                                <span>已自评区县</span>
                            </li>
                            <li>
                                <span>12</span>
                                <span>已复查区县</span>
                            </li>
                        </ul>
                    </div>
                    <div className="seeDetailCtrl">
                        <button className="btn btn-sm btn-empty borderRadius3">详情<i className="iconfont icon-xia"></i></button>
                    </div>
                </div>,
                <div key="screenTable" id="screenTable" className="screenResultTable">
                    <ScreenTable />
                </div>
            ]
        );
    }
}
//按属性筛选
class ScreenAttr extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[
                {
                    name:'贫困地区',
                    children:['45个深度贫困县','66个国贫困县','8个省贫困县']
                },
                {
                    name:'四大地区',
                    children:['川东','川南','川西','川北']
                },
                {
                    name:'流域范围',
                    children:['嘉陵江流域','崛江流域','赤水河流域','若尔盖流域']
                }
            ],
            listIndex:null,
            childList:null,
            childListIndex:null
        };
    }
    oneListEvent(item,index){
        this.setState({
            listIndex:index,
            childList:item.children
        });
    }
    twoListEvent(item,index){
        this.setState({
            childListIndex:index
        });
        console.log(item,index);
        ReactDOM.render(
            <ScreenCityItem />,
            document.getElementById('screenCity')
        );
    }
    render(){
        return (
            <div className="screenList">
                <div>
                    <p>
                        <span>全部：</span>
                        {
                            this.state.list.map((item,index) => {
                                const isActive = index == this.state.listIndex ? 'active' : '';
                                return (
                                    <span key={item.name} className={isActive} onClick={this.oneListEvent.bind(this,item,index)}>{item.name}</span>
                                );
                            })
                        }
                    </p>
                </div>
                <div>
                    <p>
                        <span>全部：</span>
                        {
                            this.state.childList != null ? this.state.childList.map((item,index) => {
                                const isActive = index == this.state.childListIndex ? 'active' : '';
                                return (
                                    <span key={item} className={isActive} onClick={this.twoListEvent.bind(this,item,index)}>{item}</span>
                                );
                            }) : ''
                        }
                    </p>
                </div>
            </div>
        );
    }
}
//按地区筛选的结果
class ScreenArea extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[
                {
                    name:'成都',
                    children:['青羊','双流','高新']
                },
                {
                    name:'南充',
                    children:['高坪','顺庆','南部','西充']
                },
                {
                    name:'绵阳',
                    children:['盐亭','汶川']
                }
            ],
            listIndex:null,
            childList:null,
            childListIndex:null
        };
    }
    oneListEvent(item,index){
        this.setState({
            listIndex:index,
            childList:item.children
        });
    }
    twoListEvent(item,index){
        this.setState({
            childListIndex:index
        });
        console.log(item);
        ReactDOM.render(
            <ScreenCityItem />,
            document.getElementById('screenCity')
        );
    }
    render(){
        return (
            <div className="screenList">
                <div>
                    <p>
                        <span>全部：</span>
                        {
                            this.state.list.map((item,index) => {
                                const isActive = index == this.state.listIndex ? 'active' : '';
                                return (
                                    <span key={item.name} className={isActive} onClick={this.oneListEvent.bind(this,item,index)}>{item.name}</span>
                                );
                            })
                        }
                    </p>
                </div>
                <div>
                    <p>
                        <span>全部：</span>
                        {
                            this.state.childList != null ? this.state.childList.map((item,index) => {
                                const isActive = index == this.state.childListIndex ? 'active' : '';
                                return (
                                    <span key={item} className={isActive} onClick={this.twoListEvent.bind(this,item,index)}>{item}</span>
                                );
                            }) : ''
                        }
                    </p>
                </div>
            </div>
        );
    }
}
//县市直达
class ScreenStraight extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[
                {
                    name:'A',
                    children:['a1县','a2县','a3县']
                },
                {
                    name:'B',
                    children:['b1县','b2县','b3县','b4县']
                },
                {
                    name:'C',
                    children:['c1','c2']
                },
                {
                    name:'D',
                    children:['D1','D2']
                },
                {
                    name:'...',
                    children:['...','...']
                },
                {
                    name:'X',
                    children:['x1','x2','x3','x4']
                },
                {
                    name:'Y',
                    children:['Y1','Y2','Y3','Y4']
                },
                {
                    name:'Z',
                    children:['z1','z2']
                }
            ],
            listIndex:null,
            childList:null,
            childListIndex:null
        };
    }
    oneListEvent(item,index){
        this.setState({
            listIndex:index,
            childList:item.children
        });
    }
    twoListEvent(item,index){
        this.setState({
            childListIndex:index
        });
        console.log(item);
        ReactDOM.render(
            <ScreenCityItem />,
            document.getElementById('screenCity')
        );
    }
    render(){
        return (
            <div className="screenList">
                <div>
                    <p>
                        <span>全部：</span>
                        {
                            this.state.list.map((item,index) => {
                                const isActive = index == this.state.listIndex ? 'active' : '';
                                return (
                                    <span key={item.name} className={isActive} onClick={this.oneListEvent.bind(this,item,index)}>{item.name}</span>
                                );
                            })
                        }
                    </p>
                </div>
                <div>
                    <p>
                        <span>全部：</span>
                        {
                            this.state.childList != null ? this.state.childList.map((item,index) => {
                                const isActive = index == this.state.childListIndex ? 'active' : '';
                                return (
                                    <span key={item} className={isActive} onClick={this.twoListEvent.bind(this,item,index)}>{item}</span>
                                );
                            }) : ''
                        }
                    </p>
                </div>
            </div>
        );
    }
}


export default class EvalSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex:0,
            repetionStatus:false,//复查状态：false待复查，true已复查
            repetions:[
                {
                    name:'等待复查',
                    module:null
                },
                {
                    name:'已复查',
                    module:null
                }
            ],
            screenBtnIndex:0,
            screenResult:<ScreenAttr />,//默认显示按属性筛选的结果
            screenBtns:[
                {
                    name:'按属性筛选',
                    dataType:'attr',
                    module:<ScreenAttr />
                },
                {
                    name:'按地区筛选',
                    dataType:'area',
                    module:<ScreenArea />
                },
                {
                    name:'县市直达',
                    dataType:'straight',
                    module:<ScreenStraight />
                }
            ]
        };
    }
    selectedOnchange(index) {
        this.setState({
            selectedIndex:index
        });
    }
    onScreenOne(index,item){
        this.setState({
            screenBtnIndex:index,
            screenResult:item.module
        });
    }
    render(){
        return (
            <div className="row" style={{background:'#fff',marginTop:'20px'}}>
                <div className="screenTop">
                    <div><i className="iconfont icon-dian"></i><b>四川省</b></div>
                    <div className="perfNavRow">
                        <ul>
                            {
                                this.state.repetions.map((item,index) => {
                                    const isActive = index == this.state.selectedIndex ? 'active' : '';
                                    return (
                                        <li key={index} className={isActive}>
                                            <a onClick={this.selectedOnchange.bind(this,index)}>{item.name}</a>
                                            <span></span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="screenWay clear">
                    {
                        this.state.screenBtns.map((item,index) => {
                            const isActive = index == this.state.screenBtnIndex ? 'active' : '';
                            return (
                                <span
                                    data-type={item.dataType}
                                    key={item.dataType}
                                    className={isActive}
                                    onClick={this.onScreenOne.bind(this,index,item)}
                                >
                                    {item.name}
                                    <i className={index == this.state.screenBtnIndex ? "iconfont icon-xia" : "iconfont icon-shang"}></i>
                                </span>
                            );
                        })
                    }
                </div>
                <div className="screenResult">{this.state.screenResult}</div>
                <div id="screenCity"></div>
            </div>
        );
    }
}

