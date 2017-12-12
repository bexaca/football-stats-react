import React from 'react';

export class Archives extends React.Component {
    componentDidMount() {
        const url = "https://api.football-data.org/v1/fixtures";
        const token = "3edb1bdd0041436ebc77c561b73e5e07";
        fetch(
            url, 
            {
                headers: { 'X-Auth-Token': token }
            }) 
            .then(d => d.json())
            .then(d => {
            for(let i = 0; i < d.count; i++){
                console.log(d.fixtures[i])
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
