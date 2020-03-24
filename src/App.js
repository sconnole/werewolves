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
       return [
            {
                character: 'Puck',
                text: 'Everyone go to sleep. I need Puck to wake up. Choose two people to be lovers. You can win with these two people. Go to sleep',
                priority: 1,
                oneTime: true,
                viewed: false,
                img: './images/puck.jpg'
            },
            {
                character: 'Puck',
                text: 'If I tap you on the head, you are lovers. If one of you dies, the other is so heart broken they will commit suicide. You can win together with Puck.',
                priority: 2,
                oneTime: true,
                viewed: false
            },
            {
                character: 'Puck',
                text: 'Everyone go to sleep. I need Puck to wake up. Choose two people to be rivals. You can win if you and one of the rivals are alive at the end of the game. Go to sleep',
                priority: 3,
                oneTime: true,
                viewed: false
            },
        ];
    };

    getStep()
    {
        if(this.state.step === 'selection')
        {
            return 
        }

        return 
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
