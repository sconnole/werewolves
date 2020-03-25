import React from 'react';
import Progress from './libs/Progress'
import Card from './libs/Card'

class Game extends React.Component 
{
    render()
    {
        /**
         * Night count and toggle between night and day
         * perhaps move steps to game
         * During day phase, lighten the background
         * Add a finish button which celebrates, logs history, and takes them back to selection
         */
        return (
            <div className="game">
                Game
                {this.getActiveCard()}
                {this.getProgress()}
            </div>
        );
    };

    getActiveCard()
    {
        const index = this.props.currentStep - 1;
        const card = this.props.cards[index];
        console.log(card);
        return <Card
            wake_order={card.wake_order}
            name={card.name}
            text={card.front_text}
            />
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