/**
 * Created by Lenovo on 2018/7/28.
 * 省级绩效考评
 */
import React,{Component} from 'react';
import CityList from './selfResult';
import PerfRepetion from './perfRepetition';
import EvalSchedule from './evaluateSchedule';

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
                    module:<PerfRepetion />
                },
                {
                    name:'评价进度',
                    module:<EvalSchedule />
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


