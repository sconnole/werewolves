import React from 'react';
import Progress from './libs/Progress'
import Card from './libs/Card'

class Game extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentStep: 1,
            activeCards: this.parseCards(props.cards),
            phase: 'night'
        };

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    };

    parseCards(cards)
    {
        let activeCards = [];
        let length = cards.length;
        for(let i = 0; i < length; i++)
        {
            let card = cards[i];
            if(card.status === "active" || card.required)
            {
                activeCards.push(card);
            }
        }
        return activeCards;
    };

    render()
    {
        /**
         * Night count and toggle between night and day
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
    
    next()
    {
        if(this.state.activeCards.length > this.state.currentStep)
        {
            this.setState({
                currentStep: this.state.currentStep + 1
            });
        }
    };

    prev()
    {
        if(this.state.currentStep > 1)
        {
            this.setState({
                currentStep: this.state.currentStep - 1
            });
        }
    };

    getActiveCard()
    {
        const index = this.state.currentStep - 1;
        const card = this.state.activeCards[index];
        if(card)
        {
            return <Card
                wake_order={card.wake_order}
                name={card.name}
                text={card.front_text}
            />;
        }
        return " No Cards Selected";
    };

    getProgress()
    {
        return <Progress
            currentStep={this.state.currentStep}
            steps={this.state.activeCards.length}
            prevClick={this.prev}
            nextClick={this.next}
        />;
    };
}

export default Game;