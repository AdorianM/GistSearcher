import React from 'react';
import Tag from "../Tag/Tag";
import './GistViewer.css';

const GistViewer = ({gists, search}) => {

    const searchFilter = search;
    let parity = false;

    const getTags = (filelist) => {
        const files = Object.values(filelist);

        console.log(files[0].language);

        return files.map((file, i) => <Tag text={file.language} key={i} />);
    }

    const renderGist = (gist) => {
        parity = !parity;
        if(parity) {
            return(
                [
                    <span className="even" key={gist.id}> {gist.id} </span>,
                    <span className="even" key={gist.id + "Tag"}>{getTags(gist.files)}</span>,
                    <span className="even" key={gist.id + "Forks"}> Recent Forks </span>
                ]
            );
        }

        return(
            [
                <span key={gist.id}> {gist.id} </span>,
                <span key={gist.id + "Tag"}>{getTags(gist.files)}</span>,
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