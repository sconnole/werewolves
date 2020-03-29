import React from 'react';
import Character from './libs/Character'

class Selection extends React.Component 
{
    render()
    {
        return (
            <div className="selection">
                {this.getPriorGames()}
                {this.getStarters()}
                {this.getCharacters()}
            </div>
        );
    };

    getPriorGames()
    {
        //To do
    };

    getStarters()
    {
        //To do
    };

    getCharacters()
    {
        let cards = this.props.cards;
        let characters = [];
        for(let i = 0, len = cards.length; i < len; i++)
        {
            let card = cards[i];
            if(card.required)
            {
                continue;
            }
            characters.push(this.getCharacter(cards[i], i));
        }
        return characters;
    };

    activateCard(index)
    {
        this.props.updateCards(index);
    };

    getCharacter(card, index)
    {
        this.activateCard = this.activateCard.bind(this);
        let id = "character-" + index;
        return <Character
            key={id}
            index={index}
            name={card.name}
            text={card.text}
            status={card.status}
            onClick={this.activateCard}
        />;
    };
}

export default Selection;