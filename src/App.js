import React from 'react';
import Selection from './Selection';
import Game from './Game';
import './App.css';

class App extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            step: 'game',
            cards: [],
            history: []
        };
    };

    setupCards()
    {
        console.log('Read data from JSON file');
    };

    getStep()
    {
        if(this.state.step === 'selection')
        {
            return <Selection
                parent={this}
                cards={this.state.cards}
                history={this.state.history}
            />;
        }

        return <Game 
            parent={this}
            cards={this.state.cards}
        />;
    };

    render()
    {
        this.setupCards();
        return (
            <div className="App">
                {this.getStep()}
            </div>
        );
    };
}

export default App;
