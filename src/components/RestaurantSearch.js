import React, { useContext,useEffect, useState } from 'react';
import ZomatoContext from '../context/ZomatoContext';
import { useNavigate } from 'react-router-dom';

const Restaurantsearch = () => {

    const {location,getLocation,setProgress} =useContext(ZomatoContext)
    const [restaurants,setRestaurants]= useState({
        data:[],
        disabled:false
    })

    const navigate=useNavigate()

    const restaurantsByState= "https://zomato-villa-api.herokuapp.com/restaurants/?state_id="
    useEffect(() => {
       getLocation();
       //eslint-disable-next-line
    }, []);

    const getRestaurantsByLocation= async()=>{
        const stateId= document.getElementById('state').value
        setProgress(10)
        const res= await fetch(`${restaurantsByState}${stateId}`)
        setProgress(30)
        const restaurantsRes =await res.json()
        setProgress(70)
        setRestaurants({
            data:restaurantsRes,
            disabled:true
        })
        setProgress(100)


    }

    const getRestaurantDetailPage=(rest_id)=>{
       navigate(`/details/${rest_id}`)
    }
    
    return (

        

        <div className='search'>
            <div className="search-heading">
                <h2>Find the Best Restaurants near you</h2>

            </div>
            <div className="search-data">
                <select name="state" id="state" onChange={getRestaurantsByLocation}>
                    <option>Select City</option>
                    {location.map((location)=>{
                        return(
                            <option key={location.state_id} value={location.state_id}>{location.state}</option>
                        )
                    })}
                </select>
                <select name="restaurants" id="restaurants" onChange={(e)=>{
                    getRestaurantDetailPage(e.target.value)
                }}>
                    <option disabled={restaurants.disabled}>Select Restaurants</option>
                    {restaurants.data.map((item)=>{
                        return (
                            <option key={item.restaurant_id} value={item.restaurant_id}>{item.restaurant_name}</option>
                        )
                    })}
                    
                </select>
            </div>
            
        </div>
    );
}

export default Restaurantsearch;
