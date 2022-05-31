import React, { useEffect } from 'react';

import { loadData } from './cardSlice.js';
import Card from '../components/Card.js';
import { useSelector } from 'react-redux';
import { selectData } from './cardSlice.js';

export const CardList = () => {
    const cards = useSelector(selectData)
    const status = useSelector(state => state.cardList)
    console.log(cards)


    return (
        <p>{cards.cards}</p>
    )

}
