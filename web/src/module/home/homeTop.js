/**
 * Created by Lenovo on 2018/7/28.
 * 首页第一行，标题
 */
import React,{Component} from 'react';

export default class HomeOneRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row homeOneRow">
                <p className="pageTitle">首页</p>
                <div>
                    <span className="grey" style={{width:'25%'}}>你可以在这里了解概况</span>
                    <span className="grey" style={{width:'50%'}}>指标状态</span>
                    <span className="grey" style={{width:'25%'}}>绩效评价</span>
                </div>
            </div>
        );
    }
}
