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
            step: 'selection',
            currentStep: 0,
            cards: [0,0,0],
            history: []
        };

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    };

    setupCards()
    {
        // console.log('Read data from JSON file');
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
            currentStep={this.state.currentStep}
            cards={this.state.cards}
            next={this.next}
            prev={this.prev}
        />;
    };

    toggle()
    {
        if(this.state.step === 'selection')
        {
            this.setState({
                step: 'game'
            });
        }
        else
        {
            this.setState({
                step: 'selection'
            })
        }
    }

    addToggle()
    {
        return (
            <button onClick={() => this.toggle()}>Change State</button>
        );
    }

    next()
    {
        if(this.state.cards.length > this.state.currentStep)
        {
            this.setState({
                currentStep: this.state.currentStep + 1
            });
        }
    };

    prev()
    {
        if(this.state.currentStep > 0)
        {
            this.setState({
                currentStep: this.state.currentStep - 1
            });
        }
    };

    render()
    {
        this.setupCards();
        return (
            <div className="App">
                {this.addToggle()}
                {this.getStep()}
            </div>
        );
    };
}

export default App;
