import React, {useState} from 'react'

function Character(props)
{
    function getClassName()
    {
        let className = "character"
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

export default Character;