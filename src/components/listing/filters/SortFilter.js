import React, { useContext } from 'react'
import ZomatoContext from '../../../context/ZomatoContext'

const SortFilter = () => {

    const {listingState:{sort},listingDispatch}=useContext(ZomatoContext)

    return (


        <>
            <h5>Sort Filter</h5>
            <div className='filter' onChange={(e)=>{
                listingDispatch({
                    type:'FILTER_BY_SORT',
                    payload:e.target.value
                })
            }}>
                
                    <label className='radio'>
                        <input type="radio" value='lowToHigh' name='sort' />Low to High
                    </label>
               
                
                    <label className='radio'>
                        <input type="radio" value='HighToLow' name='sort' />High to Low
                    </label>
               
            </div>
          

        </>
    )
}

export default SortFilter