import React from 'react';
import {autorun, observable, action} from 'mobx';

class Store {
    @observable todo = ["milk", "eggs"]
    @observable match = []

    @action matchDay = (match) => {
        this.match[0] = match
    }
}


const store = new Store();
export default store;
