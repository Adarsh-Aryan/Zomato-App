import React, { useContext } from 'react'
import ZomatoContext from '../../../context/ZomatoContext'

const CostFilter = () => {

    const {listingDispatch } = useContext(ZomatoContext)

    return (
        <>
            <h5>Cost Filter</h5>
            <div className='filter' onChange={(e)=>{
                listingDispatch({
                    type:'FILTER_BY_COST',
                    payload:e.target.value
                })
            }}>


                <label className='radio'>
                    <input type="radio" value='All' name='cost' 
                       
                    />All
                </label>


                <label className='radio'>
                    <input type="radio" value='100-300' name='cost'
                        
                        
                    />100-300
                </label>


                <label className='radio'>
                    <input type="radio" value='301-500' name='cost'
                        
                        
                    />301-500
                </label>


                <label className='radio'>
                    <input type="radio" value='501-700' name='cost'

                        
                    />501-700
                </label>


                <label className='radio'>
                    <input type="radio" value='701-900' name='cost'

                        

                        

                    />701-900
                </label>


                <label className='radio'>
                    <input type="radio" value='901-1500' name='cost'

                        

                        

                    />901-1500
                </label>


            </div>
            <hr />
        </>
    )
}

export default CostFilter