import React from 'react';
import Selection from './Selection';
import Game from './Game';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";

class App extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            step: 'selection',
            cards: this.setupCards(),
            history: []
        };

        this.updateCards = this.updateCards.bind(this);
    };

    setupCards()
    {
        return require('./media/characters.json');;            
    };

    updateCards(index)
    {
        console.log(index)
        let cards = this.state.cards;
        cards[index].status = (cards[index].status === 'active')? '': 'active';
        
        this.setState({
            cards:cards
        });
    }

    render()
    {
        //https://reacttraining.com/react-router/web/guides/quick-start
        return (
            <Router>
            <div className="App">
              <nav>
                <ul>
                  <li>
                    <NavLink activeClassName="selected" to="/setup">Setup</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/game">Play</NavLink>
                  </li>
                </ul>
              </nav>
    
              <Switch>
                <Route path="/game">
                    <Game 
                        parent={this}
                        currentStep={this.state.currentStep}
                        cards={this.state.cards}
                    />
                </Route>
                <Route path="/setup">
                    <Selection
                        cards={this.state.cards}
                        history={this.state.history}
                        updateCards={this.updateCards}
                    />
                </Route>
              </Switch>
            </div>
          </Router>
        );
    };
}

export default App;
