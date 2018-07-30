/**
 *区县级绩效考评
 **/
import React,{Component} from 'react';

import List from './performanceList';




export default class CountPerfmance extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container">
                <List />
            </div>
        );
    }
}
