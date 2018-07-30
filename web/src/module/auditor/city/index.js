/**
 * Created by Lenovo on 2018/7/29.
 * 市级审核批复
 */
import React,{Component} from 'react';
import WaitAuditor from './waitAuditor';

//市级审核批复头部
class ProvinceHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row provHead">
                <div className="col-6">
                    <p className="pageTitle">审核批复</p>
                    <p className="grey">您可以选择操作或者查看</p>
                </div>
            </div>
        );
    }
}

export default class CityWaitAuditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container CityAuditorContainer">
                <ProvinceHead />
                <div className="row">
                    <WaitAuditor />
                </div>
            </div>
        );
    }
}
