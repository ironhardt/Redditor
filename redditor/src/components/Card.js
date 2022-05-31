import React from "react";

export default function Card(props) {
    return (
        <div key={props.card.id} className="post">
            <span className="card-container">
                <h3 className="card-title">{props.post.name}</h3>
                <div className="post-content">
                    {props.card.content}
                </div>
            </span>
        </div>
    )
}