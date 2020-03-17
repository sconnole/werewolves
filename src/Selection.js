import React from 'react';

class Selection extends React.Component 
{
    render()
    {
        console.log(this.props.parent.state.cards);
        return (
            <div className="selection">
                {this.getPriorGames()}
                {this.getStarters()}
                {this.getCustom()}
            </div>
        );
    };

    getPriorGames()
    {
        //To do
    };

    getStarters()
    {
        //To do
    };

    getCustom()
    {
        //To do
        //Get Character List
    };
}

export default Selection;