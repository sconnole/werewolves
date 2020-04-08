import React, {useState, useEffect} from 'react';
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
 * 
 * Code was originally written using the component structure. (See Game-old.js)
 * Refactored to function based and 'useState'
 */
function Game(props)
{
    const [step, setStep] = useState(1);
    const [activeCards, setActiveCards] = useState(parseCards(props.cards));
    const [discardedCards, setDiscardedCards] = useState([]);
    const [dayNum, setDayNum] = useState(1);
    const rootId = 'root';

    //Loops through all of the cards to make sure only the selected ('active') cards are added to the game
    function parseCards(cards)
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

    //Removes all of the discarded cards. Resets the steps and updates the day number
    function navNextDay()
    {
        let cards = activeCards.filter((card, index) => discardCard(card, index));
        setActiveCards(cards);

        setStep(1);
        setDayNum(dayNum + 1);
        setNight();
    };

    // If the card was flagged for discard, then add it to our discarded cards array
    function discardCard(card, index)
    {   
        if(card.discard === true)
        {
            card.orginalIndex = index;
            let cards = discardedCards;
            cards.push(card);
            setDiscardedCards(cards);
        }

        //Returns true or false for the filter function
        return card.discard !== true;
    };

    //Updates the current step, checks to discard. 
    function next()
    {
        if(activeCards.length > step)
        {
            setStep(step + 1);
        }
        
        checkToDiscard();        
        checkIsDay();
    };

    function checkToDiscard()
    {
        // TODO: Some cards automatically discard, this function should discard those cards
    };

    //Checks to lighten the background
    function checkIsDay()
    {
        let ele = document.getElementById(rootId);
        if(activeCards.length - 1 === step)
        {
            ele.classList.add('day-time'); 
        }
    };

    //Go back in a step
    function prev()
    {
        if(step > 1)
        {
            setStep(step - 1)
            setNight();
        }
    };

    //changes the css back to dark theme
    function setNight()
    {   
        document.getElementById(rootId).classList = '';
    };

    //Gets the index of the step and returns the card at that index
    function getActiveCard()
    {
        const index = step - 1;
        const card = activeCards[index];
        let handleClick = null;

        // Add a flag for discarded cards that allows a card to be discarded
        if(card.discard !== true)
        {
            handleClick = (card.required !== 1)? discard : null;
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
    function discard(index)
    {
        let cards = activeCards;
        cards[index].discard = true;
        cards[index].orginalIndex = index;
        setActiveCards(cards);
        next();
    };

    //Renders a collapsable discard pile if there is anything in the discardedCards array
    function getDiscard()
    {
        if(discardedCards.length === 0)
        {
            return;
        }

        return <Collapse
            content={<DiscardPile
                cards={discardedCards}
                restoreCard={restoreCard}
            />}
            menuText="Discard"
        />
    };

    function restoreCard(card, index)
    {
        delete card.discard;
        setActiveCards(restoreActiveCard(card));
        setDiscardedCards(removeDiscard(index));
    };

    function restoreActiveCard(card)
    {
        let cards = activeCards;
        cards.splice(card.orginalIndex, 0, card);
        // Must use the spread operator to create a new array, otherwise react doesn't re-render
        return [...cards];
    };

    function removeDiscard(index)
    {
        let cards = discardedCards
        cards.splice(index, 1);
        // Must use the spread operator to create a new array, otherwise react doesn't re-render
        return [...cards];
    };

    //Updates the steps and shows the progress in a progess bar
    function getProgress()
    {
        return <Progress
            currentStep={step}
            steps={activeCards.length}
            prevClick={prev}
            nextClick={next}
        />;
    };

    useEffect(() => 
    {
        console.log(discardedCards);
    }, [discardedCards])

    return (
        <div className="game">
            <span className="counter">Round {dayNum}</span>
            {getActiveCard()}
            <button onClick={() => navNextDay()} className="next-day">Next Day</button>
            {getDiscard()}
            {getProgress()}
        </div>
    );    
}

export default Game;