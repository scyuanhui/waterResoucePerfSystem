import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import {observer} from 'mobx-react';
////store
//import user from './store/userinfo';
////login
//import LoginView from './public/login';
////header
//import Head from './public/head';
////nav,content
//import Main from './public/main';
////css
import './static/css/index.css';
//
//@observer
//export default class App extends Component {
//    constructor(props) {
//        super(props);
//    }
//    logout(){
//        user.logout();
//    }
//    render() {
//        //登录拦截
//        const loginWindown = <LoginView />;
//        const indexWindown = [
//            <Head key="head" />,
//            <Main key="NavContent" />
//        ];
//        return user.data.username ? indexWindown : loginWindown;
//    }
//}
import axios from 'axios';
import {RenderThead} from './module/performance/county/perCom';

function getTwoTableList(list,id,secendids){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].oneIndexId == id && secendids.indexOf(id) == -1){
            secendids.push(id);
            arr.push(list[i]);
        }
    }
    return arr;
}
function getThreeTableList(list,id){
    const arr = [];
    for(let i=0;i<list.length;i++){
        if(list[i].twoIndexId == id){
            arr.push(list[i]);
        }
    }
    return arr;
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heads:['一级指标','二级指标','三级指标'],
            data:[],
            firstList:[],
            secendList:[]
        };
    }
    componentDidMount(){
        axios.get('./test.json').then((res) => {
            const list = res.data;
            const len = list.length;
            const firstIds = [];
            const oneList = [];
            const twoList = [];
            for(let i=0;i<len;i++){
                if(firstIds.indexOf(list[i].oneIndexId) == -1){
                    firstIds.push(list[i].oneIndexId);
                    const item = {
                        id:list[i].oneIndexId,
                        name:list[i].oneIndexName
                    };
                    oneList.push(item);
                }
            }
            for(let i=0;i<oneList.length;i++){
                const twoItem = [];
                for(let j=0;j<len;j++){
                    if(list[j].oneIndexId == oneList[i].id){
                        twoItem.push(list[j]);
                    }
                }
                twoList.push(twoItem);
            }

            this.setState({
                data:list,
                firstList:oneList,
                secendList:twoList
            });
        }).catch((error) => {
            console.log(error);
        });

    }
    render() {
        //console.log(this.state.data.length);
        return (
            <table className="container" style={{width:'100%'}}>
                <RenderThead list={this.state.heads} />
                <tbody>
                {
                    this.state.firstList.map((item,index) => {
                        const secendids = [];
                        const twoList = getTwoTableList(this.state.data,item.id,secendids);
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                        {
                                            twoList.map((aitem,aindex) => {
                                                console.log(JSON.stringify(aitem));
                                                const threeList = getThreeTableList(this.state.data,aitem.twoIndexId);
                                                return (
                                                    <tr key={aindex}>
                                                        <td>{aitem.twoIndexName}</td>
                                                        <td>
                                                            <table>
                                                                <tbody>
                                                                {
                                                                    threeList.map((bitem,bindex) => {
                                                                        return (
                                                                            <tr key={bindex}>
                                                                                <td>{bitem.threeIndexName}</td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                                }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>

            </table>
        );
    }
}


ReactDOM.render(
    <App />,
    window.root
);