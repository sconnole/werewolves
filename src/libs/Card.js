import React from 'react'

function Card(props)
{
    function convertNewLines(text)
    {
        return text.replace(/\n/g, '<br><br>')
    }

    function isEven(value) 
    {
        if (value % 2 === 0)
        {
            return true;
        }
        
        return false;
    }

    const openEm = "<em>";
    const closeEm = "</em>";
    function convertToEm(text)
    {
        let matches = text.match(/(.*?)\*/gm);
        if(matches)
        {
            let str = "";

            for(var i = 0; i < matches.length; i++)
            {
                str += matches[i];
                if(isEven(i))
                {
                    str = str.replace("*", openEm);
                }
                else
                {
                    str = str.replace("*", closeEm);
                }
            }
            text = str;
        }
        return text;
    }

    function renderHTML()
    {
        if(props.text)
        {
            let text = convertNewLines(props.text);
            text = convertToEm(text);
            
            return {__html: text};
        }
    };

    function getButton()
    {
        if(props.onClick)
        {
            return (
                <div>
                    <button onClick={()=>props.onClick(props.index)}>Discard</button>
                </div>
            );
        }
    }

    return (
        <div className="card">
            <div className="title">{props.name}</div>
            <div className="card-container"
                dangerouslySetInnerHTML={renderHTML()}
            />
            {getButton()}
        </div>
    );
};

export default Card;