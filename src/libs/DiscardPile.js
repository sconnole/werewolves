import React from 'react'
import {RestoreCard} from '../libs/CardSelection'

function DiscardPile(props)
{
    //Function GetCards
    function getCards()
    {
        let cards = [];
        for(let i = 0, len = props.cards.length; i < len; i++)
        {
            var card = props.cards[i];
            cards.push(
                <RestoreCard
                    key={i + "-restore-card"}
                    index={i}
                    card={card}
                    name={card.name + " (click to restore)"}
                    onClick={props.restoreCard}
                />
            )
        }
        return cards;
    }

    return (
        <div className="discard-container">
            <div className="">All Discarded Cards: </div>
            {getCards()}
        </div>
    );
};

export default DiscardPile;