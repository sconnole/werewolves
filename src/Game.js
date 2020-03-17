import React from 'react';

function Progress(props)
{
    //Simple CSS progress bar
    return (
        <div className="progress-container">
            <div className="progress-bar"></div>
        </div>
    );
};

class Game extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            dayCount: 0,
            currentStep: 1,
            totalSteps: props.cards.length + 1
        };
    }

    render()
    {
        return (
            <div className="game">
                {this.getCards()}
                {this.getCardNavigation()}
                {this.getProgress()}
            </div>
        );
    };

    getCards()
    {
        
    };

    getCardNavigation()
    {

    };

    getProgress()
    {
        return <Progress/>
    };
}

export default Game;