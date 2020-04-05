import React from 'react';
import Progress from './libs/Progress'
import Card from './libs/Card'
import Collapse from './libs/Collapse'
import DiscardPile from './libs/DiscardPile'

/**
 * 
 */
class Game extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentStep: 1,
            activeCards: this.parseCards(props.cards),
            discardedCards: [],
            phase: 'night',
            dayNum: 1
        };

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.discard = this.discard.bind(this);
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
         * Add a finish button which celebrates, logs history, and takes them back to selection
         */
        return (
            <div className="game">
                <span className="counter">Round {this.state.dayNum}</span>
                {this.getActiveCard()}
                <button onClick={() => this.navNextDay()} className="next-day">Next Day</button>
                {this.getDiscard()}
                {this.getProgress()}
            </div>
        );
    };

    navNextDay()
    {
        let cards = this.state.activeCards;
        cards = this.state.activeCards.filter((card, index) => this.discardCard(card, index));
        this.setState({
            currentStep: 1,
            activeCards: cards,
            dayNum: this.state.dayNum + 1
        });

        this.setNight();
    };

    discardCard(card, index)
    {   
        if(card.discard === true)
        {
            card.orginalIndex = index;
            let cards = this.state.discardedCards;
            cards.push(card);
            this.setState({
                discardedCards: cards
            });
        }

        return card.discard !== true;
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

    checkToDiscard()
    {
        // TODO: Some cards automatically discard, this function should discard those cards
    };
    
    checkIsDay()
    {
        let ele = document.getElementById('root');
        if(this.state.activeCards.length-1 === this.state.currentStep)
        {
            ele.classList.add('day-time'); 
        }
    };

    prev()
    {
        if(this.state.currentStep > 1)
        {
            this.setState({
                currentStep: this.state.currentStep - 1
            });
            this.setNight();
        }
    };

    setNight()
    {   
        document.getElementById('root').classList = '';
    };

    getActiveCard()
    {
        const index = this.state.currentStep - 1;
        const card = this.state.activeCards[index];
        let handleClick = null;

        // Add a flag for discarded cards
        if(card.discard !== true)
        {
            handleClick = (card.required !== 1)? this.discard : null;
        }

        if(card)
        {
            return <Card
                index={index}
                wake_order={card.wake_order}
                name={card.name}
                text={card.front_text}
                onClick={handleClick}
            />;
        }
        return " No Cards Selected";
    };

    discard(index)
    {
        let cards = this.state.activeCards;
        cards[index].discard = true;
        this.setState({
            activeCards: cards
        });
        this.next();
    };

    getDiscard()
    {
        this.restoreCard = this.restoreCard.bind(this);

        if(this.state.discardedCards.length === 0)
        {
            return;
        }

        return <Collapse
            content={<DiscardPile
                cards={this.state.discardedCards}
                restoreCard={this.restoreCard}
            />}
            menuText="Discard"
        />
    }

    restoreCard(card)
    {
        console.log(card);
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