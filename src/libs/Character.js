import React, {useState} from 'react'

function Character(props)
{
    const [text, updateText] = useState("Activate");

    function handleUpdateText()
    {
        let str = (text === "Activate")? "Deactivate" : "Activate"
        updateText(str);
    }

    return (
        <div className="character">
            <div className="title">{props.name}</div>
            <div className="card-container">
                {props.text}
            </div>
            <button 
                onClick={() => {
                    props.onClick(props.index)
                    handleUpdateText()
                    }}>
                {text}
            </button>
        </div>
    );
};

export default Character;