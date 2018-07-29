/**
 * Created by Lenovo on 2018/7/29.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import DataCountEchart from './dataCountEchart';

//head
class DataCountHead extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row provHead">
                <div className="col-6">
                    <p className="pageTitle">数据统计</p>
                    <p className="grey">您可以选择操作或者查看</p>
                </div>
            </div>
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
        ReactDOM.render(
            <DataCountEchart ran={(Math.random()*100).toFixed(0)} />,
            document.getElementById('screenInfo')
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
            <DataCountEchart ran={(Math.random()*100).toFixed(0)} />,
            document.getElementById('screenInfo')
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
            <DataCountEchart ran={(Math.random()*100).toFixed(0)} />,
            document.getElementById('screenInfo')
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

export default class DataCountContent extends Component{
    constructor(props){
        super(props);
        this.state = {
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
    onScreenOne(index,item){
        this.setState({
            screenBtnIndex:index,
            screenResult:item.module
        });
    }
    render(){
        return (
            [
                <DataCountHead key="DataCountHead" />,
                <div key="screen" className="row" style={{background:'#fff',marginTop:'20px'}}>
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
                </div>,
                <div key="dataCountEchart" id="screenInfo"></div>
            ]
        );
    }
}


