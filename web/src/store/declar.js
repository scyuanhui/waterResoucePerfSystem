/*
* 绩效考评store
* */
import {observable,action} from 'mobx';

import {axios} from './../public/common';
import api from './interface';

//获取一级指标，步骤（共5步）
class FirstGrade{
    @observable data = [];
    init(){
        axios.get(api.getOneList).then((res) => {
            console.log(JSON.stringify(res));
            this.data = res.data;
        }).catch((error) => {
            console.log(error);
        });
    }
}
export const firstGrade = new FirstGrade();
//申报需要提交的数据
class Declar{
    @observable commits = [];
}
export const declar = new Declar();
//申报等待审核,页面跳转数据共享
class DecalWaitLook{
    @observable data = null;
}
export const decalWaitLook = new DecalWaitLook();
//绩效目标填写需要提交的数据
class TargetWrite{
    @observable commits = [];
}
export const targetWrite = new TargetWrite();
