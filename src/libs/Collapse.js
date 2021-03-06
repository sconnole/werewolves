import React, { useState } from 'react'

function Collapse(props)
{
    const [open, toggle] = useState(false);

    function getClassName(className, open)
    {
        if(open === false)
        {
            className += " closed";
        }
        return className;
    };

    function getContainerClass(open)
    {
        let className = "collapse-container";
        if(open === true)
        {
            className += " open fadeIn";
        }
        return className;
    };

    return (
        <div className={getContainerClass(open)}>
            <span className={getClassName("menu-text", !open)}>{props.menuText}</span>
            <div 
                onClick={() => { toggle(!open); }}
                className={getClassName("menu", !open)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={getClassName("content", open)}>{props.content}</div>
        </div>
    );
};

export default Collapse;