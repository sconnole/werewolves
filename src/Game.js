import React from 'react';
import leftArrow from './images/keyboard_arrow_left.svg'
import rightArrow from './images/keyboard_arrow_right.svg'

function Progress(props)
{
    function getWidth(props)
    {
        if(props.steps < 1)
        {
            return '';
        }
        let width = (props.currentStep)/props.steps;
        return width * 100 + '%';
    }
    //Simple CSS progress bar
    let style = {
        width: getWidth(props)
    };
    return (
        <div className="progress-container">
            <div className="title">{props.currentStep} of {props.steps}</div>
            <div className="progress-bar-container">
                <button id="prev" onClick={props.prevClick}>
                    <img src={leftArrow}></img>
                </button>
                <div class="progress-bar">
                    <div style={style} className="progress"></div>
                </div>
                <button id="next" onClick={props.nextClick}>
                    <img src={rightArrow}></img>                    
                </button>
            </div>
        </div>
    );
};

class Game extends React.Component 
{
    render()
    {
        return (
            <div className="game">
                Game
                {this.getCards()}
                {this.getCardNavigation()}
                {this.getProgress()}
            </div>
        );
    };

    getCards()
    {
        
    };

    getCardNavigation()
    {

    };

    getProgress()
    {
        return <Progress
            currentStep={this.props.currentStep}
            steps={this.props.cards.length}
            prevClick={this.props.prev}
            nextClick={this.props.next}
        />;
    };
}

export default Game;