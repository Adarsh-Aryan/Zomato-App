import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import './ListingDetails.css'
import { Link } from 'react-router-dom'
import ZomatoContext from '../../context/ZomatoContext'
import Loader from '../../images/loader.gif'


const ListingDetails = () => {

    const { meal_id } = useParams()

    const [listingData, setListingData] = useState()

    const {listingState:{sort,byCost,byCuisine}}=useContext(ZomatoContext)

    const fetchListingRestaurants = async () => {
        const { data } = await axios.get(`https://zomato-villa-api.herokuapp.com/restaurants?meal_id=${meal_id}`)
        setListingData(data)

    }



    useEffect(() => {
        fetchListingRestaurants()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!listingData) {
        return (
            <div style={{width:'70%'}}>
                <img src={Loader} alt="loader" />
            </div>
            
        )
    }

    let filterData= listingData

    const filterListingData=()=>{
        if(sort){
            if(sort==='lowToHigh'){
                filterData=filterData.sort((a,b)=>{
                    return a.cost-b.cost
                })
            }
            else if(sort==='HighToLow'){
                filterData=filterData.sort((a,b)=>{
                    return b.cost-a.cost
                })
            }
        }

        if(byCuisine){
            if(byCuisine==='All'){
                return filterData
            }

            else{
                filterData=filterData.filter(item=>{
                    return item.cuisines.some(data=>data.cuisine_name===byCuisine)
                })
            }
        }
        if(byCost){

            if(byCost==='All'){
                return filterData
            }
            else{
                const lcost= Number(byCost.split('-')[0])
                const hcost=Number(byCost.split('-')[1])

                filterData=filterData.filter(item=>{
                    return (Number(item.cost)>=lcost && Number(item.cost)<=hcost)
                })
            }
        }

       

        return filterData
    }

    if(!filterListingData().length){
        return (
            <div style={{width:'70%'}}>
                <h1>No Restaurant Found 😥</h1>
            </div>
            
        )
    }

    return (
        <div style={{ width: '70%' }}>
            {filterListingData().map(item => {
                return (

                    <div className='rest_content' key={item.restaurant_id}>
                        <div className='Image'>
                            <img src={item.restaurant_thumb} alt={item.restaurant_name}/>
                        </div>
                        <div className='rest_details'>

                            <h2>{item.restaurant_name}</h2>
                            <p>{item.address}</p>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <p>Rs. {item.cost}</p>
                                <div className="labelDiv">
                                    <span className="mx-2 label-primary">
                                        {item.mealTypes[0].mealtype_name}
                                    </span>&nbsp;
                                    <span className="label-success">
                                        {item.mealTypes[1].mealtype_name}
                                    </span>
                                </div>
                                <div className="labelDiv">
                                    <span className="mx-2 label-danger">
                                        {item.cuisines[0].cuisine_name}
                                    </span>&nbsp;
                                    <span className="label-warning">
                                        {item.cuisines[1].cuisine_name}
                                    </span>
                                </div>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className="rating_details">
                                    <span style={{ fontSize: '20px' }}>{item.average_rating} &#9733;  </span>&nbsp;
                                    <span className='btn-danger' style={{ padding: '0.4rem' }}>{item.rating_text}</span>

                                </div>
                                <Link to={`/details/${item.restaurant_id}`} className='btn btn-primary'>More Details</Link>
                            </div>
                        </div>

                    </div>

                )
            })}
        </div>
    )
}

export default ListingDetails