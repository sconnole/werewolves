import React from 'react';

function Progress(props)
{
    function getWidth(props)
    {
        if(props.steps < 1)
        {
            return '';
        }
        let width = (props.currentStep)/props.steps;
        return width * 100 + '%'
    }
    //Simple CSS progress bar
    let style = {
        width: getWidth(props)
    };
    return (
        <div className="progress-container">
            <div className="title">{props.currentStep} of {props.steps}</div>
            <div className="progress-bar">
                <div style={style} className="progress"></div>
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
                {this.addPrev()}
                {this.addNext()}
            </div>
        );
    };

    addNext()
    {
        return (
            <button onClick={this.props.next}>Next</button>
        );
    }

    addPrev()
    {
        return (
            <button onClick={this.props.prev}>Prev</button>
        );
    }

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
        />;
    };
}

export default Game;