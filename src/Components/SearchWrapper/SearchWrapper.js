import {useState, useEffect} from 'react';
import GistViewer from "../GistViewer/GistViewer";
import axios from "axios";
import './SearchWrapper.css'

const SearchWrapper = () => {

    const [searchField, setSearchField] = useState("");
    const [loading, setLoading] = useState(false);
    const [gists, setGists] = useState([]);
    const [forks, setForks] = useState([]);

    const API_URL = "https://api.github.com";
    const ACCESS_TOKEN = "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";

    const searchGists = async () => {
        setLoading(true);
        let res = await axios({
            method: "get",
            url: `${API_URL}/users/${searchField}/gists`,
            headers: {
                'Authorization': `token ${ACCESS_TOKEN}`
            }
        });

        setLoading(false);
        console.log("Gists:");
        console.log(res.data);
        await setGists(res.data);
        await getForkInfo(res.data);
    }

    useEffect(() => {
        getForkInfo(gists);
    }, [gists]);

    useEffect(() => {
        console.log(forks);
    }, [forks])

    const getForkInfo = (gists) => {
        setForks([]);
        gists.forEach(async (gist) => {
            const url = gist.forks_url;

            let res = await axios({
                method: "get",
                url: url,
                headers: {
                    'Authorization': `token ${ACCESS_TOKEN}`
                }
            });

            //console.log("Upper: " + gist.id);
            const currentFork = [gist.id, res.data];
            if(res.data.length > 0) {
                setForks([...forks, currentFork]);
            }
        });

    }

    const handleSearchChanged = (e) => {
        setSearchField(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchGists();
    }



    return (
        <div className="searchWrapper">
            <form>
                <input type="text" placeholder="Search..." onChange={e => handleSearchChanged(e)}/>
                <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
            </form>
            <GistViewer gists={gists} forks={forks} />
        </div>
    );
}

export default SearchWrapper;
