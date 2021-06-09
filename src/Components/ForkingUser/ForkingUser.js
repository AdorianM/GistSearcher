import React from 'react';

const ForkingUser = ({imgsrc, username}) => {
    return(
        <div className="user-wrapper">
            <img alt="user" src={imgsrc} />
            <span>{username}</span>
        </div>
    )
}

export default ForkingUser;