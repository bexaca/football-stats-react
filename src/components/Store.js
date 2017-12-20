import React from 'react';
import {autorun, observable, action} from 'mobx';

class Store {
    @observable todo = ["milk", "eggs"]
    @observable match = null
    @observable name = null
    @observable formCount = 5
    @observable formMax = null
    @observable clubName = localStorage.getItem("clubName")
    @observable crestUrl = localStorage.getItem("logo")
    @observable teamId = localStorage.getItem("teamId")
     
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
    @action formMaxFunc = (formMax) => {
        this.formMax = formMax
    }
    @action formMoreFunc = () => {
        if(this.formCount === this.formMax){
            console.log(this.formCount)
            console.log(this.formMax)
            this.formCount = this.formMax
        }else{
            this.formCount++
        }
    }
    @action favoriteDel = () => {
        this.clubName = null
        this.crestUrl = null
        this.teamId = null
    }
    @action favoriteAdd = (clubName, crestUrl, teamId) => {
        this.clubName = clubName
        this.crestUrl = crestUrl
        this.teamId = teamId
    }
}


const store = new Store();
export default store;
