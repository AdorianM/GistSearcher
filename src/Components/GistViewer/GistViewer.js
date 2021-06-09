import React, {Fragment} from 'react';
import './GistViewer.css';

const GistViewer = ({gists, search}) => {

    const searchFilter = search;
    let parity = false;

    const renderGist = (gist) => {
        parity = !parity;
        if(parity) {
            return(
                [
                    <span className="even" key={gist.id}> {gist.id} </span>,
                    <span className="even" key={gist.id + "Tag"}> Tag </span>,
                    <span className="even" key={gist.id + "Forks"}> Recent Forks </span>
                ]
            );
        }

        return(
            [
                <span key={gist.id}> {gist.id} </span>,
                <span key={gist.id + "Tag"}> Tag </span>,
                <span key={gist.id + "Forks"}> Recent Forks </span>
            ]
        );

    }

    return(
        <div className="container-results">
            <span className="grid-head">ID</span>
            <span className="grid-head">Tags</span>
            <span className="grid-head">Recent Forks</span>
            {gists.map(gist => renderGist(gist))}
        </div>
    );
}

export default GistViewer;