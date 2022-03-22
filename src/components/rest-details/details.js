import axios from 'axios'
import React ,{useState,useEffect, useContext}from 'react'
import { useParams } from 'react-router-dom'
import './details.css'
import MenuItems from './MenuItems'
import TabDetails from './TabDetails'
import Loader from '../../images/loader.gif'
import ZomatoContext from '../../context/ZomatoContext'

const RestaturantDetails=()=>{


    const {rest_id}=useParams()

    const [RestData,setRestData]=useState()

    const {dispatch}=useContext(ZomatoContext)
    

    const fetchRestData=async()=>{

        dispatch({
            type:'CLEAR_CART'
        })

        const {data}=await axios.get(`https://zomato-villa-api.herokuapp.com/details/${rest_id}`)

        sessionStorage.setItem('restaurantId',rest_id)
        
        setRestData(data[0])
        sessionStorage.setItem('restaurantName',data[0].restaurant_name)
    }

    useEffect(()=>{
        fetchRestData();
    },[])

    if(!RestData){

        return (
            <div className="detail_section">

                <img src={Loader} alt="loader" />
            </div>
        )
    }

    


    return(
        <div className='detail_section'>
            
            <div className="restaurant_content">
                <img src={RestData.restaurant_thumb} alt={RestData.restaurant_name}/>
                <div className="restaurant_details">
                    <h2>{RestData.restaurant_name}</h2>
                    <span>245 Customer Review</span>
                    <h3>New Price Rs {RestData.cost}</h3>
                    <h3>We Provide Best Services</h3>
                    <div className='icons'>

                        <div className="sanitizer_icon">
                            <img src="https://i.ibb.co/2FbpqtH/sentizied.png" alt="sanitized" />
                        </div>
                        <div className="homedelivery_icon">
                            <img src="https://i.ibb.co/s56LLF9/homedelivery.png" alt="delivery" />
                        </div>
                    </div>
                    

                </div>
            </div>
            <TabDetails name={RestData.restaurant_name} contact={RestData.contact_number} address={RestData.address} />
            <MenuItems rest_id={rest_id}/>
        </div>
    )
}

export default RestaturantDetails