import React from 'react'
import Card from '../libs/Card'

function DiscardPile(props)
{
    //Function GetCards

    return (
        <div className="discard-container">
            <div className="">All Discarded Cards: </div>
            <Card name="hey"></Card>
        </div>
    );
};

export default DiscardPile;