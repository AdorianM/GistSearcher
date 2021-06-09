import React from 'react';
import './GistViewer.css';

const GistViewer = ({gists, search}) => {

    const searchFilter = search;
    let parity = false;

    const renderGist = (gist) => {
        parity = !parity;
        return([
            <span className={parity && "even"} key={gist.id}>
                {gist.id}
            </span>,
            <span className={parity && "even"} key={gist.id}>
                Tag
            </span>,
            <span className={parity && "even"} key={gist.id}>
                Recent Forks
            </span>
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