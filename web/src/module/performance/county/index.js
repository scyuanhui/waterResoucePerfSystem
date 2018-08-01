/**
 *区县级绩效考评
 **/
import React,{Component} from 'react';
import {observer} from 'mobx-react';
//store
import cNode from './../../../store/PerCurrentMountModule';
import List from './perList';

@observer
export default class CountPerfmance extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        cNode.currentNode = <List />;
    }
    render(){
        return (
            <div className="container perContainer">
                {cNode.currentNode}
            </div>
        );
    }
}
