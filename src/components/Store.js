import React from 'react';
import {autorun, observable} from 'mobx';

class Store {
    @observable todo = ["milk", "eggs"]  
}


const store = new Store();
export default store;
