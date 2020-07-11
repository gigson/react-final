import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import axios from "axios";

function Matches() {
    const [matches, setMatches] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    'https://api.football-data.org/v2/matches',
                    {headers: {"X-Auth-Token": "c054cc6d9954412cbb7749ae150441bd"}}
                );
                console.log(response.data)
                setMatches(response.data);
            } catch (err) {
                console.error('error');
            }
        })();
    }, []);

    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <div>
            <h1>You Need To Login</h1>
        </div>;
    }

    if (matches == null) {
        return null
    }
    console.log(matches)


    const matchesView = matches.matches.map((item, key) =>
        <tr>
            <td>{item.awayTeam.name}</td>
            <td>{item.homeTeam.name}</td>
            <td>{item.utcDate}</td>
        </tr>
    )

    return (
        <div>
            <table>
                <tr>
                    <th>Away Team</th>
                    <th>Home Team</th>
                    <th>Date</th>
                </tr>
                {matchesView}
            </table>
        </div>
    );
}

export default Matches;