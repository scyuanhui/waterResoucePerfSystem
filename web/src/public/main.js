import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Config from './../store/moduleNavRouterConfig';
import {observer} from 'mobx-react';
import user from './../store/userinfo';

@observer
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultIndex: 0,
            defautModule: null,
            navigationList: []
        };
    }

    componentDidMount() {
        if(user.data.username != null){
            this.setState({
                navigationList: Config[user.data.userGrade],
                defautModule: Config[user.data.userGrade][0].module
            });
        }
    }

    mainEvent(module, index) {
        this.setState({
            defautModule: module,
            defaultIndex: index
        });
    }
    render() {
        return (
            <div className="row bodyRow">
                <ul className="nav">
                    {
                        this.state.navigationList.map((item, index) => {
                            const isActive = index == this.state.defaultIndex ? 'active' : '';
                            return (
                                <li key={item.name} className={isActive}
                                    onClick={this.mainEvent.bind(this,item.module,index)}>
                                    <span><i className={item.icon}></i></span>
                                    <span>{item.name}</span>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="content" id="content">{this.state.defautModule != null ? this.state.defautModule : '页面正在制作中...'}</div>
            </div>
        );
    }
}