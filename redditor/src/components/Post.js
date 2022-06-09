import React from "react";

export default function Post(props) {
    return (
        <div className="post">
            <span className="post-container">
                <h3 className="post-title">{props.title}</h3>
                <h4 className="post-info">{props.author} {props.score}</h4>
                <a href={props.comments}>{props.num_comments}</a>
                <div className="post-content">
                    {props.content}
                </div>
            </span>
        </div>
    )
}