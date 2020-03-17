import React from 'react';

class Selection extends React.Component 
{
    render()
    {
        console.log(this.props.parent.state.cards);
        return (
            <div className="selection">
                Selection
            </div>
        );
    }
}

export default Selection;