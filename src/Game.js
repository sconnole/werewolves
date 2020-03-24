import React from 'react';
import Progress from './libs/Progress'
import Card from './libs/Card'

class Game extends React.Component 
{
    render()
    {
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