import React, {useState} from 'react';
import axios from "axios";

function SearchResult({searchData}) {
    const [selectedItem, setSelectedItem] = useState(null);

    if (searchData == null) {
        return null;
    }

    const handleItemClick = async (itemId) => {
        console.log(itemId);
        try {
            const response = await axios.get(
                'https://api.football-data.org/v2/competitions?areas=' + itemId,
                {headers: {"X-Auth-Token": "c054cc6d9954412cbb7749ae150441bd"}}
            );
            setSelectedItem(response.data);
        } catch (err) {
            console.error('error');
        }
    };

    const clearState = () => {
        setSelectedItem(null)
    };

    const listItems = searchData.map((item, key) =>
        <tr>
            <td onClick={() => {
                handleItemClick(item.id);
            }} className="clickable">{item.area.name}</td>
            <td>{item.name}</td>
            <td>{item.numberOfAvailableSeasons}</td>
        </tr>
    );

    const searchTable = <table>
        <tr>
            <th>Area Name</th>
            <th>Competition Name</th>
            <th>numberOfAvailableSeasons</th>
        </tr>
        {listItems}
    </table>

    let result = searchTable;

    if (selectedItem != null) {
        console.log(selectedItem)
        result = <div>
            <button onClick={clearState}>back</button>
            <div><b>Match Count: </b> {selectedItem.count}</div>
            <div><b>Area Code: </b> {selectedItem.filters.areas[0]}</div>
        </div>
    }

    return (
        <div>
            {result}
        </div>
    );
}

export default SearchResult;