/*
* 绩效考评store
* */
import {observable,action} from 'mobx';

//申报需要提交的数据
class Declar{
    @observable commits = [];
}
export const declar = new Declar();
//申报等待审核
class DecalWaitLook{
    @observable data = null;
}
export const decalWaitLook = new DecalWaitLook();