import React from "react";

export default function NavBar(props) {
    return (
        <nav>
            <div className="top-bar">
                <div className="title">
                    {/* Icon */}
                    Redditor
                </div>
                <div className="user-control">
                    {/* user control */}
                </div>
            </div>
            <div className="sub-bar">
                {/* subreddits list */}
            </div>
        </nav>
    )
}