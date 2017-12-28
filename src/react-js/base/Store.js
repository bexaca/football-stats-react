//MOBX
import {observable, action} from 'mobx';

class Store {
    @observable match = null
    @observable name = null
    @observable formCount = 5
    @observable formMax = null
    @observable clubName = localStorage.getItem("clubName")
    @observable crestUrl = localStorage.getItem("logo")
    @observable teamId = localStorage.getItem("teamId")
    @observable competitionId = localStorage.getItem("competitionId")
    @observable teamPosition = localStorage.getItem("teamPosition")
    @observable leagueName = localStorage.getItem("leagueName")
    @observable leaguesId = [localStorage.getItem("leagueIdPl"), localStorage.getItem("leagueIdFl"), localStorage.getItem("leagueIdBl"), localStorage.getItem("leagueIdSa"), localStorage.getItem("leagueIdPr")]
    @observable leaguesName = [localStorage.getItem("leagueNamePl"), localStorage.getItem("leagueNameFl"), localStorage.getItem("leagueNameBl"), localStorage.getItem("leagueNameSa"), localStorage.getItem("leagueNamePr")]
    @observable requestResponse = null
    @observable requestDiv = null
    @observable requestButton = null
     
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
            this.formCount = this.formMax
        }else{
            this.formCount++
        }
    }
    @action formResetFunc = () => {
        this.formCount = 5
    }
    @action leaguesIdFunc = (leaguesId) => {
        this.leaguesId = leaguesId
    }
    @action leaguesNameFunc = (leaguesName) => {
        this.leaguesName = leaguesName
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
    @action competitionIdFunc = (competitionId) => {
        this.competitionId = competitionId
    }
    @action teamPositionFunc = (teamPosition) => {
        this.teamPosition = teamPosition
    }
    @action leagueNameFunc = (leagueName) => {
        this.leagueName = leagueName
    }
    @action requestResponseFunc = (requestResponse) => {
        this.requestResponse = requestResponse
    }
    @action requestDivFunc = (requestDiv) => {
        this.requestDiv = requestDiv
    }
    @action requestButtonFunc = (requestButton) => {
        this.requestButton = requestButton
    }
}

const store = new Store();
export default store;
