import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'react-bootstrap'
import ZomatoContext from '../../context/ZomatoContext'
import './MenuItems.css'
import { useNavigate } from 'react-router-dom'


const MenuItems = ({ rest_id }) => {



    const [menuItems, setMenuItems] = useState()

    const navigate=useNavigate()

    const fetchMenuItems = async () => {
        const { data } = await axios.get(`https://zomato-villa-api.herokuapp.com/menu/${rest_id}`)

        setMenuItems(data)
    }

    const { state: { cart }, dispatch } = useContext(ZomatoContext)




    const AddItem = (item) => {

        dispatch({
            type: 'ADD_TO_CART',
            payload:item
        })


        


    }

    const RemoveItem = (item) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: item

        })

       



    }

    useEffect(() => {
        fetchMenuItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='menu_items'>
            <h1>Menu Items</h1>
            {cart.map((menu) => {
                return (
                    <span key={menu.menu_id}>
                        <b>{menu.menu_id}</b>
                        &nbsp;
                    </span>

                )

            })}
            <span>{cart.length>0?'added':''}</span>
            {menuItems?.map((item) => {
                return (
                    <div className="menu_item" key={item.menu_id}>
                        <div style={{ width: '54%' }}>
                            <b>{item.menu_id}. </b>
                            <img src={item.menu_image} alt={item.menu_name} />
                            &nbsp; {item.menu_name}- Rs.{item.menu_price}
                        </div>
                        <div>
                            {!cart.some(element=>
                                element.menu_id===item.menu_id
                            )?(<button className="btn btn-primary" onClick={() => {
                                AddItem(item)

                            }}>+</button>):(<button className="btn btn-danger mx-1" onClick={() => {
                                RemoveItem(item)
                            }}>-</button>)}
                            
                            
                        </div>
                    </div>
                )
            })}



            {cart.length>0 && (<Button onClick={()=>{
                navigate('/previewOrders')
            }} variant='success' style={{margin:'0rem 1.5rem'}}>Preview</Button>)}
            
        </div>
    )
}

export default MenuItems