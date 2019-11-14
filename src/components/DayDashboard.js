import React from 'react';
import significantDay from '../objects/significantDay';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import moment from 'moment';


export default (props) => {
    let sigDay = new significantDay(props.dayToDisplay);
    const dayBefore = new moment(props.dayToDisplay).add(-1,'days');
    const dayAfter = new moment(props.dayToDisplay).add(1,'days');

    return (
        <div>

            <img src={ '../images/animals/' + sigDay.getLunarAnimal() + '.png' } 
                className={ sigDay.getLunarColor() + ' ' + sigDay.getLunarAnimal() }
            />
            <h2>Day of the { sigDay.getLunarColor() } { sigDay.getLunarAnimal() }</h2>
            <div>{ props.dayToDisplay.toString() }</div>
            <Link to={'/dashboard/' + dayBefore.format('YYYY-MM-DD')}>LEFT</Link>
            <Link to={'/dashboard/' + dayAfter.format('YYYY-MM-DD')}>RIGHT</Link>
        </div>
    );
};