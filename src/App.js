import React from 'react';
import Selection from './Selection';
import Game from './Game';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class App extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            step: 'selection',
            currentStep: 1,
            cards: this.setupCards(),
            history: []
        };

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    };

    setupCards()
    {
        return require('./media/characters.json');;            
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
            });
        }
    }

    getToggleText()
    {
        return (this.state.step === "game")? "selection" : "game";
    }

    addToggle()
    {
        return (
            <button onClick={() => this.toggle()}>Switch to {this.getToggleText()}</button>
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
        if(this.state.currentStep > 1)
        {
            this.setState({
                currentStep: this.state.currentStep - 1
            });
        }
    };

    render()
    {
        //https://reacttraining.com/react-router/web/guides/quick-start
        return (
            <Router>
            <div className="App">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Setup</Link>
                  </li>
                  <li>
                    <Link to="/game">Play</Link>
                  </li>
                </ul>
              </nav>
    
              <Switch>
                <Route path="/game">
                    <Game 
                        parent={this}
                        currentStep={this.state.currentStep}
                        cards={this.state.cards}
                        next={this.next}
                        prev={this.prev}
                    />
                </Route>
                <Route path="/">
                    <Selection
                        cards={this.state.cards}
                        history={this.state.history}
                    />
                </Route>
              </Switch>
            </div>
          </Router>
        );
    };
}

export default App;
