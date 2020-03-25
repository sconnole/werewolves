import React from 'react';

class Selection extends React.Component 
{
    render()
    {
        /**
         * Select from characters
         * updates active cards in app
         */
        return (
            <div className="selection">
                Selection
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