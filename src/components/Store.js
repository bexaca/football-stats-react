import React from 'react';
import {autorun, observable, action} from 'mobx';

class Store {
    @observable todo = ["milk", "eggs"]
    @observable match = null
    @observable name = null
    @observable formCount = 5

    @action matchDay = (match) => {
        this.match = match
    }
    @action teamName = (name) => {
        this.name = name
    }
    @action formLessFunc = () => {
        if(this.formCount < 2){
            this.formCount = 1
        }else{
            this.formCount--
        }
    }
    @action formMoreFunc = () => {
        this.formCount++
    }
}


const store = new Store();
export default store;
