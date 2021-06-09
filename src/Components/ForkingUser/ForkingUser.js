import React from 'react';
import './ForkingUser.css';

const ForkingUser = ({imgsrc, username}) => {
    return(
        <span className="user-wrapper">
            <img alt="user" src={imgsrc} />
            <span>{username}</span>
        </span>
    )
}

export default ForkingUser;