import React from 'react';
import {autorun, extendObservable} from 'mobx';

export class Store extends React.Component {
    constructor() {
        super();
        extendObservable(this, {
          todo: ["cake"],
          filter: ""
        }); 
      }
}

let store = window.store = new Store

export default Store;

autorun(() => {
//    console.log(store.todo[0])
})