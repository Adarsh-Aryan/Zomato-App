import React, { useContext } from 'react'
import ZomatoContext from '../../../context/ZomatoContext'

const CuisineFilter = () => {

    const {listingDispatch}=useContext(ZomatoContext)

    return (
        <div>
            <h5>Cuisine Filter</h5>
            <div className='filter' onChange={(e)=>{
                // console.log(e.target.value)
                listingDispatch({
                    type:'FILTER_BY_CUISINE',
                    payload:e.target.value
                })
            }}>
                
                    <label className="radio">
                        <input type="radio" value="All" name="cuisine"/>All
                    </label> 
                
                
                    <label className="radio">
                        <input type="radio" value="North Indian" name="cuisine"/>North Indian
                    </label> 
                
                
                    <label className="radio">
                        <input type="radio" value="South Indian" name="cuisine"/>South Indian
                    </label> 
                
                
                    <label className="radio">
                        <input type="radio" value="Chinese" name="cuisine"/>Chinese
                    </label> 
                
                
                    <label className="radio">
                        <input type="radio" value="Fast Food" name="cuisine"/>Fast Food
                    </label> 
                
                
                    <label className="radio">
                        <input type="radio" value="Street Food" name="cuisine"/>Street Food
                    </label> 
                

                
               
            </div>
            <hr />
        </div>

    )
}

export default CuisineFilter