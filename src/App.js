import React from 'react';
import Selection from './Selection';
import Game from './Game';
import './App.css';
import werewolf from './images/werewolf.svg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";


/**
 * This app has two main sections. Card selection (selection) and Iteration through those cards (Game)
 * The cards need to be read in from the JSON file. Some cards are required and will always be added. 
 * This also sets up the router. 
 */
class App extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            cards: this.setupCards(),
            history: []
        };

        this.updateCards = this.updateCards.bind(this);
    };

    setupCards()
    {
        return require('./media/narrator-cards.json');;            
    };

    updateCards(index)
    {
        let cards = this.state.cards;
        cards[index].status = (cards[index].status === 'active')? '': 'active';
        
        this.setState({
            cards:cards
        });
    };

    componentDidMount()
    {
        this.resize()
        window.addEventListener("resize", this.resize.bind(this));
    };

    componentWillMount()
    {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    resize()
    {
        let height = window.innerHeight;
        height = height + 'px';
        document.getElementById('root').style.minHeight = height;
        document.getElementById('app').style.minHeight = height;
    };

    render()
    {
        //https://reacttraining.com/react-router/web/guides/quick-start
        return (
            <Router basename="/">
            <div id="app" className="App">
              <nav id="nav">
                <ul>
                  <li>
                    <NavLink activeClassName="selected" to={`${process.env.PUBLIC_URL}/setup`}>Setup</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to={`${process.env.PUBLIC_URL}/game`}>Play</NavLink>
                  </li>
                </ul>
              </nav>
    
              <Switch>
                <Route path={`${process.env.PUBLIC_URL}/game`}>
                    <Game 
                        parent={this}
                        currentStep={this.state.currentStep}
                        cards={this.state.cards}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/setup`}>
                    <Selection
                        cards={this.state.cards}
                        history={this.state.history}
                        updateCards={this.updateCards}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}`}>
                    <img className="werewolf" src={werewolf}></img>
                </Route>
              </Switch>
            </div>
          </Router>
        );
    };
}

export default App;
