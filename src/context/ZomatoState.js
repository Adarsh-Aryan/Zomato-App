import React, { useState,useReducer } from 'react';
import { CartReducer } from './Reducers/CartReducer';
import { ListingReducer } from './Reducers/ListingReducer';
import ZomatoContext from './ZomatoContext';


const Zomatostate = (props) => {
    
    const [location,setLocation]=useState([])
    const [progress,setProgress]=useState(0)

    const cityUrl= "https://zomato-villa-api.herokuapp.com/location"

    const getLocation= async()=>{
        setProgress(10)
        const res =await fetch(cityUrl)
        setProgress(30)
        const cityRes= await res.json()
        setProgress(70)
        setLocation(cityRes)
        setProgress(100)
    }
    

    const [state,dispatch]=useReducer(CartReducer,{
        cart:[],
        
    })

    const [listingState,listingDispatch]=useReducer(ListingReducer,{
        byCost:'',
        byCuisine:''
    })

    return (

        <div>
            <ZomatoContext.Provider value={{location,getLocation,progress,setProgress,state,dispatch,listingState,listingDispatch}}>
                {props.children}
            </ZomatoContext.Provider>
        </div>
    );
}

export default Zomatostate;
