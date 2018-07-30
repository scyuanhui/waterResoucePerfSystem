/**
 * 绩效考评模块公共组件
 *
 **/
import React,{Component} from 'react';

//绩效考评列表头部(只有左边有文字)
export class BaseHead extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row contentHeadRow">
                <div className="col-6">
                    <p className="pageTitle">{this.props.name}</p>
                    <p className="grey">{this.props.desc}</p>
                </div>
            </div>
        );
    }
}
//表头：点+年度
export class TableYear extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="tableYear">
                <i className="iconfont icon-dian" style={{color:'#3B86FF'}}></i>
                <span className="module-title">{this.props.year}年度</span>
                <span className="grey">{this.props.desc}</span>
            </div>
        );
    }
}
