import React,{Component} from 'react';
import {observable,action} from 'mobx';
import List from './../module/performance/county/perHome';

class PerCurrentNode{
    @observable currentNode = <List />;
}
const cNode = new PerCurrentNode();
export default cNode;