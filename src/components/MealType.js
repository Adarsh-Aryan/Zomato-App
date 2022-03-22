import React from 'react';
import { Link } from 'react-router-dom';

const Mealtype = (props) => {
    return (

        <Link to={`/restaurants/${props.id}`}>
            <div className="meal-card">
                <img src={props.mealImg} alt={props.name} />
                <div className="meal-description">
                    <h4>{props.name}</h4>
                    <p>{props.content}</p>
                </div>
            </div>
        </Link>




    );
}

export default Mealtype;
