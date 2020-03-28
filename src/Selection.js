import React from 'react';
import Character from './libs/Character'

class Selection extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.activateCard = this.activateCard.bind(this);
    }

    render()
    {
        /**
         * Select from characters
         * updates active cards in app
         */
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
        //To do
        //Get Character List
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
        let id = "character-"+index;
        return <Character
            key={id}
            index={index}
            name={card.name}
            text={card.text}
            onClick={this.activateCard}
        />;
    };
}

export default Selection;