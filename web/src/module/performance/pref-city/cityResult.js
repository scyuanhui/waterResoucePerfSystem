/**
 * 市绩效结果
 **/
import React,{Component} from 'react';
import SelfAssessment from './selfAssessment';
import ReviewAssessment from './reviewAssessment';

class CityResultBody extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedModule:<SelfAssessment />,
            navList:[
                {
                    name:'自评结果',
                    module:<SelfAssessment />
                },
                {
                    name:'复评结果',
                    module:<ReviewAssessment />
                }
            ]
        };
    }
    selectedOnchange(index,item) {
        this.setState({
            selectedIndex:index,
            selectedModule:item.module
        });
    }
    render(){
        return (
            [
                <div className="cityResultHead" key="assessmentHead">
                    <div>
                        <i className="iconfont icon-dian"></i>
                        <span className="module-title">成都市</span>
                    </div>
                    <div className="perfNavRow">
                        <ul>
                            {
                                this.state.navList.map((item, index) => {
                                    const isActive = index == this.state.selectedIndex ? 'active' : '';
                                    return (
                                        <li key={index} className={isActive}>
                                            <a onClick={this.selectedOnchange.bind(this,index,item)}>{item.name}</a>
                                            <span></span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>,
                <div className="assessment" key="assessment">{this.state.selectedModule ? this.state.selectedModule : 'loading'}</div>
            ]
        );
    }
}



export default class CityPerfResult extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="cityResultRow">
                <CityResultBody />
            </div>
        );
    }
}