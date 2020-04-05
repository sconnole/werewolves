import React from 'react';
import CardSelection from './libs/CardSelection';

/**
 * Displays a list of cards. The cards can be selected and will be added to the game module. 
 * See to do in functions for more
 */
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
        // Would like to allow prior selections to be stored locally
    };

    getStarters()
    {
        //To do
        // There will be a group of common card selections that will get started quickly. 
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
        return <CardSelection
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