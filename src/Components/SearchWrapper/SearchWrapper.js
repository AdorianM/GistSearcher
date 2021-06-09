import {useState} from 'react';
import GistViewer from "../GistViewer/GistViewer";
import axios from "axios";
import './SearchWrapper.css'

const SearchWrapper = () => {

    const [searchField, setSearchField] = useState("");
    const [loading, setLoading] = useState(false);
    const [gists, setGists] = useState([]);

    const API_URL = "https://api.github.com";

    const searchGists = async () => {
        setLoading(true);
        await axios({
            method: "get",
            url: `${API_URL}/users/${searchField}/gists`
        }).then(res => {
           setLoading(false);
           setGists(res.data);
           console.log(gists);
        });
    }

    const handleSearchChanged = (e) => {
        setSearchField(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchGists();
    }



    return (
        <div className="searchWrapper">
            <form>
                <input type="text" placeholder="Search..." onChange={e => handleSearchChanged(e)}/>
                <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
            </form>
            <GistViewer gists={gists} search={searchField} />
        </div>
    );
}

export default SearchWrapper;
