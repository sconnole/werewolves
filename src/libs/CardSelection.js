import React from 'react'

function CardSelection(props)
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

export default CardSelection;