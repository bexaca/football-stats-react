import React from 'react';
import {autorun, observable, action} from 'mobx';

class Store {
    @observable todo = ["milk", "eggs"]

    @action addTodo = (tod) => {
        this.todo.push(tod)
    }
}


const store = new Store();
export default store;
