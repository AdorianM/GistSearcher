import React from 'react';
import Tag from "../Tag/Tag";
import ForkingUser from "../ForkingUser/ForkingUser";
import './GistViewer.css';
import axios from "axios";

const GistViewer = ({gists, forks}) => {

    let parity = false;

    const getTags = (filelist) => {
        const files = Object.values(filelist);

        return files.map((file, i) => {
            if(file.language !== null && file.language !== "") {
                return <Tag text={file.language} key={i} />
            }
            return <Tag text={"Missing Tag"} key={i} />
        });
    }

    const showContent = (id) => {

    }

    const getLastThreeForks = (forkslist) => {
        const threeLatest = [...new Set(forkslist)].reduce((a, b) => {
            if (a.length < 3) return a.concat(b);
            a.sort((x,y) => x.created_at - y.created_at);
            let index = a.findIndex(e => e > b);
            if (index > -1) {
                a.splice(index, 1);
                return a.concat(b);
            }
            return a;
        },[]);

        console.log(threeLatest);

        return threeLatest;
    }

    const getForks = (id, forks) => {
        let currentIdForks = [];
        forks.forEach(fork => {
            if(id === fork[0]) {
                currentIdForks = [...currentIdForks, fork[1]];
            }
        });

        if(currentIdForks.length === 0) {
            return "No forks"
        }

        const lastThreeForks = getLastThreeForks(currentIdForks[0]);

        return lastThreeForks.map((fork, i) => {
            return <ForkingUser imgsrc={fork.owner.avatar_url} username={fork.owner.login} key={i} />
        });


    }

    const renderGist = (gist) => {
        parity = !parity;
        if(parity) {
            return(
                [
                    <span className="even" key={gist.id} onClick={showContent(gist.id)}> {gist.id} </span>,
                    <span className="even" key={gist.id + "Tag"}>{getTags(gist.files)}</span>,
                    <span className="even" key={gist.id + "Forks"}>{getForks(gist.id, forks)}</span>
                ]
            );
        }

        return(
            [
                <span key={gist.id}> {gist.id} </span>,
                <span key={gist.id + "Tag"}>{getTags(gist.files)}</span>,
                <span key={gist.id + "Forks"}>{getForks(gist.id, forks)}</span>
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