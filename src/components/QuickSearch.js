import React from 'react';
import Mealtype from './MealType';

const QuickSearch = (props) => {
  const { state } = props;

  return (
    <div className="container-fluid">
      <div className="quick-search">
        <h1 style={{ color: 'blue' }}>Quick Search</h1>
        <h4>Discover Restaurants By Meal</h4>
        <div className="meal-type">
          {state.map((mealItem) => {
            return (
              <Mealtype
                key={mealItem.mealtype_id}
                name={mealItem.mealtype}
                content={mealItem.content}
                mealImg={mealItem.meal_image}
                id={mealItem.mealtype_id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
