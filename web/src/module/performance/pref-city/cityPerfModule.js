/**
 *市级绩效考评头部和切换
 **/
import React,{Component} from 'react';
import CitySelfTables from './cityAssessmentTable';
import CityPerfResult from './cityResult';

export class CityPerfHead extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row cityHead">
                <div className="col-6">
                    <p className="pageTitle">绩效考评</p>
                    <p className="grey">您可以选择操作或者查看</p>
                </div>
            </div>
        );
    }
}
export class CityPerfNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedModule:<CitySelfTables />,
            navList:[
                {
                    name:'市本级考核',
                    module:<CitySelfTables />
                },
                {
                    name:'绩效结果',
                    module:<CityPerfResult />
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