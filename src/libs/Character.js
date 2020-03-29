import React, {useState} from 'react'

function Character(props)
{
    const [text, updateText] = useState("Activate");

    function handleUpdateText()
    {
        let str = (text === "Activate")? "Deactivate" : "Activate"
        updateText(str);
    }

    function getClassName()
    {
        let className = "character"
        if(props.status === 'active')
        {
            className += " active";
        }
        return className;
    }

    return (
        <div className={getClassName()}
            onClick={() => {
                props.onClick(props.index)
                handleUpdateText()
            }}
        >
            <div className="title">{props.name}</div>
            <div className="card-container">
                {props.text}
            </div>
        </div>
    );
};

export default Character;