import React, {useState} from 'react';
import {connect} from 'react-redux';
import {SET_SEARCH_RESULT} from "../../redux";
import axios from 'axios';
import SearchResult from "./SearchResult";

function Home(props) {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = async (event) => {
        try {
            const response = await axios.get(
                'https://api.football-data.org/v2/competitions?plan=' + searchQuery,
                {headers: {"X-Auth-Token": "c054cc6d9954412cbb7749ae150441bd"}}
            );
            props.setSearchResult(response.data);
        } catch (err) {
            console.error('error');
        }
    };

    const handleChange = ({target}) => {
        setSearchQuery(target.value);
    };

    let competitions = null;

    if (props.searchResult != null) {
        competitions = props.searchResult.competitions
    }

    return (
        <div>
            <select value={searchQuery} onChange={handleChange}>
                <option value="">ALL</option>
                <option value="TIER_ONE">TIER_ONE</option>
                <option value="TIER_TWO">TIER_TWO</option>
                <option value="TIER_THREE ">TIER_THREE</option>
            </select>


            <button type="submit" onClick={() => {
                handleSubmit()
            }}>Search
            </button>

            <SearchResult searchData={competitions}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        searchResult: state.searchResult,
    };
};

const mapDispatchToProps = (dispach) => {
    return {
        setSearchResult: (value) => dispach({
            type: SET_SEARCH_RESULT,
            payload: {
                value,
            },
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);