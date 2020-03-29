import React from 'react'

function Card(props)
{
    function renderHTML(text)
    {
        //Convert ** to bold
        //Convert 
        return text;
    }

    return (
        <div className="card">
            <div className="title">{props.name}</div>
            <div className="card-container">
                {renderHTML(props.text)}
            </div>
            {/* <img alt={props.name} src="/"></img> */}
        </div>
    );
};

export default Card;