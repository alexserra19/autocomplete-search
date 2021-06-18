
import React, { useState } from 'react';
import CountriesService from '../services/CountriesService';
import './AutoCompletionSearch.css';

const AutoCompletionSearch = (props) => {

    const [search, setSearch] = useState('');
    const [timeoutSearch, setTimeoutSearch] = useState(0);
    const [searchResults, setSearchResults] = useState([]);


    const handleChange = async (value) => {
        setSearch(value)
        if (timeoutSearch) clearTimeout(timeoutSearch)
        if (value) {
            const timeout = setTimeout(() => { startSearch(value) }, 500);
            setTimeoutSearch(timeout)
        }
        else cleanSearch()
    }

    const startSearch = async (text) => {
        const results = await CountriesService.searchCountry(text)
        if (results.length) setSearchResults(results)
        else cleanSearch()
    }

    const cleanSearch = () => {
        setSearchResults([])
        clearTimeout(timeoutSearch)
    }

    const renderResults = () => {

        return (
            searchResults.map((item, index) => {

                const splittedName = item.name.split(search)

                let newName = []

                console.log(splittedName)

                splittedName.forEach(element => {
                    newName.push(element);
                    newName.push(<b>{search}</b>)
                });

                // delete last element
                newName.pop()

                return (
                    <div
                        className="resultSearchItem"
                        key={index}
                        onClick={() => handleCountryClick(item.name)}
                        onMouseEnter={() => setSearch(item.name)}
                    >
                        <label>{newName}</label>
                    </div>
                )
            })
        )
    }

    const handleCountryClick = (name) => {
        alert(name)
    }

    return (
        <div className="wrapper">
            <h1>{props.title}</h1>
            <div className="control">
                <input type="text" value={search} onChange={(e) => handleChange(e.target.value)} />
            </div>
            {search &&
                <div className="list">
                    {searchResults.length
                        ? renderResults()
                        : <h2>No results found</h2>
                    }
                </div>
            }
        </div>
    );
}

export default AutoCompletionSearch

