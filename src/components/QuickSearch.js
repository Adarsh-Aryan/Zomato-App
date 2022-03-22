import React ,{useState,useEffect} from 'react';
import Mealtype from './MealType';

const Quicksearch = () => {

    const [state, setstate] = useState([]);

    const mealTypeUrl = "https://zomato-villa-api.herokuapp.com/mealType"

    const getMealType = async () => {
        const res = await fetch(mealTypeUrl)
        const mealRes = await res.json()
        setstate(mealRes)
    }

    useEffect(() => {
        getMealType()
        //eslint-disable-next-line
    }, []);


    return (
        <div className='container-fluid'>
            <div className="quick-search">
                <h1 style={{ color: "blue" }}>Quick Search</h1>
                <h4>Discover Restaurants By Meal</h4>
                <div className="meal-type">


                    {state.map((mealItem) => {
                        return (
                            <Mealtype key={mealItem.mealtype_id} name={mealItem.mealtype} content={mealItem.content} mealImg={mealItem.meal_image} id={mealItem.mealtype_id}/>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}

export default Quicksearch;
