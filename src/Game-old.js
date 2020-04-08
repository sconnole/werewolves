import React, {useState} from 'react';
import Progress from './libs/Progress'
import Card from './libs/Card'
import Collapse from './libs/Collapse'
import DiscardPile from './libs/DiscardPile'

/**
 * Alright, this one is a little complicated. 
 * 
 * Tracks current steps, current cards, the phase, and the day
 * See individual functions for more comments
 * 
 * TO DO Look into using 'useContext' for state
 */
class GameOLD extends React.Component 
{
    //TODO Convert to hook based function
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

    //Loops through all of the cards to make sure only the selected ('active') cards are added to the game
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

    //Removes all of the discarded cards. Resets the steps and updates the day number
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

    // If the card was flagged for discard, then add it to our discarded cards array
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

        //Returns true or false for the filter function
        return card.discard !== true;
    };
    
    //Updates the current step, checks to discard. 
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
    
    //Checks to lighten the background
    checkIsDay()
    {
        let ele = document.getElementById('root');
        if(this.state.activeCards.length-1 === this.state.currentStep)
        {
            ele.classList.add('day-time'); 
        }
    };

    //Go back in a step
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

    //changes the css back to dark theme
    setNight()
    {   
        document.getElementById('root').classList = '';
    };

    //Gets the index of the step and returns the card at that index
    getActiveCard()
    {
        const index = this.state.currentStep - 1;
        const card = this.state.activeCards[index];
        let handleClick = null;

        // Add a flag for discarded cards that allows a card to be discarded
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

    //Flag a card for discard and navigate to the next step
    discard(index)
    {
        let cards = this.state.activeCards;
        cards[index].discard = true;
        cards[index].orginalIndex = index;
        this.setState({
            activeCards: cards
        });
        this.next();
    };

    //Renders a collapsable discard pile if there is anything in the discardedCards
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

    restoreCard(card, index)
    {
        delete card.discard;
        this.setState({
            activeCards: this.restoreActiveCard(card),
            discardedCards: this.removeDiscard(index)
        });
    };
    
    restoreActiveCard(card)
    {
        let cards = this.state.activeCards;
        cards.splice(card.orginalIndex, 0, card);
        return cards;
    };

    removeDiscard(index)
    {
        let cards = this.state.discardedCards;
        cards.splice(index, 1);
        return cards;
    };

    //Updates the steps and shows the progress in a progess bar
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

export default GameOLD;