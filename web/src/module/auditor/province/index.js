/**
 * Created by Lenovo on 2018/7/29.
 * 省级审核批复
 */
import React,{Component} from 'react';
import WaitAuditor from './waitAuditor';
import SelfWaitAuditor from './selfWaitAuditor';

//省级审核批复头部
class ProvinceHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row provHead">
                <div className="col-6">
                    <p className="pageTitle">审核批复</p>
                    <p className="grey">您可以选择操作或者查看</p>
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
            selectedModule:<WaitAuditor />,
            navList:[
                {
                    name:'指标审核',
                    module:<WaitAuditor />
                },
                {
                    name:'自评审核',
                    module:<SelfWaitAuditor />
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


export default class ProvinceAuditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container ProvinceAuditorContainer">
                <ProvinceHead />
                <ProvinceNav />
            </div>
        );
    }
}
