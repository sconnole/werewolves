import React from 'react';

function Progress(props)
{
    return (
        <div className="progress-container">
            <div className="progress-bar"></div>
        </div>
    );
};

class Game extends React.Component 
{
    render()
    {
        return (
            <div className="game">
                {this.getProgress()}
            </div>
        );
    };

    getProgress()
    {
        return <Progress/>
    };
}

export default Game;