import React from 'react';

export class Archives extends React.Component {
    componentDidMount() {
        const url = "http://api.football-data.org/v1/teams/57/players";
        const token = "3edb1bdd0041436ebc77c561b73e5e07";
        fetch(
            url, 
            {
                headers: { 'X-Auth-Token': token }
            }) 
            .then(d => d.json())
            .then(d => {
            for(let i=0; i<d.count; i++){
                if(d.players[i].position === 'Keeper'){
                    console.log(d.players[i].name)
                }
            }
            for(let i=0; i<d.count; i++){
                if(d.players[i].position === 'Centre-Forward'){
                    console.log(d.players[i].name)
                }
            }
            
        })
        .catch(function(error) {
            console.log('You failed me', error);
        });
        
    }
    render() {
        return (
            <div className="container">
                <h1 className="text-center">Test Archives</h1>
            </div>
        );
    }
}

export default Archives;
