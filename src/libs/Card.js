import React from 'react'

function Card(props)
{
    function renderHTML(text)
    {
        return text;
    }

    return (
        <div className="card">
            <span className="wake-order">{props.wake_order}</span>
            <div className="title">{props.name}</div>
            <div className="card-container">
                {renderHTML(props.text)}
                <img alt={props.name} src="/"></img>
            </div>
        </div>
    );
};

export default Card;