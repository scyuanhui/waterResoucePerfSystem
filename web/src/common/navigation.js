import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Session} from './common';
import config from './../router/router';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultIndex: 0,
            defautModule: null,
            navigationList: []
        };
    }

    componentWillMount() {
        const session = new Session();
        const user = session.getItem('USERINFO');
        if(user){
            if(user.userLvl == 0){
                this.setState({
                    navigationList: config.province,
                    defautModule: config.province[0].module
                });
            }
            if(user.userLvl == 1){
                this.setState({
                    navigationList: config.city,
                    defautModule: config.city[0].module
                });
            }
            if(user.userLvl == 2){
                this.setState({
                    navigationList: config.county,
                    defautModule: config.county[0].module
                });
            }
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