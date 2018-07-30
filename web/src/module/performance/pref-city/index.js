/**
 *市级绩效考评
 **/
import React,{Component} from 'react';
import {CityPerfHead,CityPerfNav} from './cityPerfModule';

export default class CityPerformance extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container cityPerfContainer">
                <CityPerfHead />
                <CityPerfNav />
            </div>
        );
    }
}