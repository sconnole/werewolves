import React from 'react';
import Progress from './libs/Progress'
import Card from './libs/Card'
import Collapse from './libs/Collapse'
import DiscardPile from './libs/DiscardPile'

class Game extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentStep: 1,
            activeCards: this.parseCards(props.cards),
            phase: 'night',
            dayNum: 1
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
            if(card.discarded === true)
            {
                continue;
            }
            
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
                {this.getActiveCard()}
                {this.getDiscard()}
                {this.getProgress()}
            </div>
        );
    };
    
    next()
    {
        let state = this.state;
        if(state.activeCards.length > state.currentStep)
        {
            this.setState({
                currentStep: state.currentStep + 1
            });
        }

        this.checkToDiscard();
        this.checkIsDay();
    };

    //Mark cards as discarded.
    //When you move to the next day, delete any 'used' cards from the 'activeCards' index
    checkToDiscard()
    {

    }

    prev()
    {
        if(this.state.currentStep > 1)
        {
            this.setState({
                currentStep: this.state.currentStep - 1
            });
            document.getElementById('root').classList = '';
        }
    };

    checkIsDay()
    {
        let ele = document.getElementById('root');
        if(this.state.activeCards.length - 1 === this.state.currentStep)
        {
            ele.classList.add('day-time'); 
        }
        else
        {
            ele.classList = '';
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

    getDiscard()
    {
        return <Collapse
            content={<DiscardPile/>}
            menuText="Discard"
        />
    }

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