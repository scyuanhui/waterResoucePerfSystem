/**
 * Created by Lenovo on 2018/7/28.
 * 省级绩效考评
 */
import React,{Component} from 'react';
import Star from './../../../public/star';

//省级绩效考评头部
class ProvinceHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row provHead">
                <div className="col-6">
                    <p className="pageTitle">绩效考评</p>
                    <p className="grey">您可以选择操作或者查看</p>
                </div>
                <div className="col-6 text-right">
                    <button className="btn btn-md btn-empty">刷新列表</button>
                    <button className="btn btn-md btn-empty">查看自评汇总结果</button>
                </div>
            </div>
        );
    }
}
//城市item
class CityItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            collects: ['自评汇总得分', '自评审核通过', '待自评', '优', '良', '中', '差'],
            heads: ['地区', '标签属性', '自评审核时间', '审核状态', '自评得分', '自评等级', '操作'],
            defaultUnfold:false
        };
    }
    unfoldCtrl(){
        const unfoldState = this.state.defaultUnfold;
        switch (unfoldState){
        case true:
            this.setState({
                defaultUnfold:false
            });
            break;
        case false:
            this.setState({
                defaultUnfold:true
            });
            break;
        }
    }
    render(){
        const headTds = this.state.heads.map((item, index) => {
            return (
                <td key={index}>{item}</td>
            );
        });
        return (
            [
                <div key="one" className="cityItemStartRow">
                    <div>
                        <i className="iconfont icon-dian"></i>
                        <b>成都市</b>
                        <span className="grey">总区县数21</span>
                    </div>
                    <button className="btn btn-sm btn-empty" onClick={this.unfoldCtrl.bind(this)}>
                        详情<i className={this.state.defaultUnfold ? "iconfont icon-shang" : "iconfont icon-xia"}></i>
                    </button>
                </div>,
                <div key="two" className="collectRow">
                    <div>{this.state.collects.map((item, index) => <span key={index}>{item}</span>)}</div>
                    <div>
                        <span>90</span>
                        <span>5</span>
                        <span>17</span>
                        <span><Star size={4}/>2</span>
                        <span><Star size={3}/>6</span>
                        <span><Star size={2}/>8</span>
                        <span><Star size={1}/>1</span>
                    </div>
                </div>,
                <div key="three" className="cityTableRow" style={{height:this.state.defaultUnfold ? '280px' : '0px'}}>
                    <table border="0" cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>{headTds}</tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>青羊区</td>
                                <td><span className="btn btn-xs btn-empty btnRadius">12个贫困镇</span></td>
                                <td>2018-07-15</td>
                                <td>审核通过</td>
                                <td>90</td>
                                <td>优</td>
                                <td>
                                    <button className="btn btn-sm btn-empty">查看</button>
                                </td>
                            </tr>
                            <tr>
                                <td>金牛区</td>
                                <td><span>12个贫困镇</span></td>
                                <td>2018-07-15</td>
                                <td>审核通过</td>
                                <td>90</td>
                                <td>优</td>
                                <td>
                                    <button className="btn btn-sm btn-empty">查看</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ]
        );
    }
}

//城市LIST
class CityList extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="cityRow">
                <div className="cityItem">
                    <CityItem />
                </div>
                <div className="cityItem">
                    <CityItem />
                </div>
                <div className="cityItem">
                    <CityItem />
                </div>
            </div>
        );
    }
}

//省级绩效考评导航
class ProvinceNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedModule:<CityList />,
            navList:[
                {
                    name:'自评结果',
                    module:<CityList />
                },
                {
                    name:'绩效复评',
                    module:null
                },
                {
                    name:'评价进度',
                    module:null
                }
            ]
        };
    }

    selectedOnchange(index,item) {
        this.setState({
            selectedIndex:index,
            selectedModule:item.module
        });
    }

    render() {
        return (
            [
                <div key="nav" className="row perfNavRow">
                    <ul>
                        {
                            this.state.navList.map((item, index) => {
                                const isActive = index == this.state.selectedIndex ? 'active' : '';
                                return (
                                    <li key={index} className={isActive}>
                                        <a onClick={this.selectedOnchange.bind(this,index,item)}>{item.name}</a>
                                        <span></span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>,
                <div key="perfModule" className="row">
                    {this.state.selectedModule ? this.state.selectedModule : '正在制作中...'}
                </div>
            ]
        );
    }
}


export default class ProvincePerformance extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container ProvincePerformanceContainer">
                <ProvinceHead />
                <ProvinceNav />
            </div>
        );
    }
}


