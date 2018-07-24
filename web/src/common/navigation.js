import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import config from './../router/router';

export default class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            defaultIndex:0,
            defautModule:null
        };
    }
    mainEvent(module,index){
        this.setState({
            defautModule:module,
            defaultIndex:index
        });
    }
    componentDidMount(){
        this.setState({
            defautModule:config[0].module
        });
    }
    render(){
        return (
            <div className="row bodyRow">
                <ul className="nav">
                    {
                        config.map((item,index) => {
                            const isActive = index == this.state.defaultIndex ? 'active' : ''
                            return (
                                <li key={item.name} className={isActive} onClick={this.mainEvent.bind(this,item.module,index)}>
                                    <span><i className={item.icon}></i></span>
                                    <span>{item.name}</span>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="content" id="content">{this.state.defautModule != null  ? this.state.defautModule : '页面正在制作中...'}</div>
            </div>
        );
    }
}