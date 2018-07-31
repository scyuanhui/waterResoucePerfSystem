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
    render(){
        return (
            <div className="container">
                {cNode.currentNode}
            </div>
        );
    }
}
