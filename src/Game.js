import React from 'react';
import Progress from './libs/Progress'

class Game extends React.Component 
{
    render()
    {
        return (
            <div className="game">
                Game
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
        return <Progress
            currentStep={this.props.currentStep}
            steps={this.props.cards.length}
            prevClick={this.props.prev}
            nextClick={this.props.next}
        />;
    };
}

export default Game;