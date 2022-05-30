import React from "react";

export default function Cardlist(props) {
    return (
        <div key={props.post.id} className="post">
            <span className="card-container">
                <h3 className="card-title">{props.post.name}</h3>
                <div className="post-content">
                    {props.post.content}
                </div>
            </span>
        </div>
    )
}