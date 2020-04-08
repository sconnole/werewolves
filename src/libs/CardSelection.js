import React, {useState} from 'react'

export default function CardSelection(props)
{
    function getClassName()
    {
        let className = "card-selection"
        if(props.status === 'active')
        {
            className += " active";
        }
        return className;
    };

    return (
        <div 
            className={getClassName()}
            onClick={() => { props.onClick(props.index) }}
        >
            <div className="title">{props.name}</div>
        </div>
    );
};

export function RestoreCard (props)
{
    return (
        <div 
            className="card-selection"
            onClick={() => { props.onClick(props.card, props.index); }}
        >
            <div className="title">{props.name}</div>
        </div>
    );
};