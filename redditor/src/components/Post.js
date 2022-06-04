import React from "react";

export default function Post(props) {
    return (
        <div className="post">
            <span className="post-container">
                <h3 className="post-title">{props.title}</h3>
                <div className="post-content">
                    {props.content}
                </div>
            </span>
        </div>
    )
}