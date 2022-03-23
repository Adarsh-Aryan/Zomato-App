import React, { useContext} from 'react'
import { Col, Image, ListGroup, Row } from 'react-bootstrap'
import ZomatoContext from '../../context/ZomatoContext'
import './CartItems.css'

import { BsFillTrashFill } from 'react-icons/bs'

const CartItems = () => {

    const { state: { cart}, dispatch } = useContext(ZomatoContext)
    

    
    return (
        <>
            <ListGroup>
                {cart?.map(item => {
                    return (
                        <ListGroup.Item key={item.menu_id}>
                            <Row>
                                <Col>
                                    <Image src={item.menu_image} alt={item.menu_name} rounded fluid />
                                </Col>
                                <Col>
                                    <span>{item.menu_name}</span>

                                </Col>
                                <Col>
                                    <span>Rs.{((item.menu_price)*(item.qty)).toFixed(2)}</span>
                                </Col>
                                <Col>
                                    <select name="quantity" className='quantity' onChange={(e)=>{
                                        dispatch({
                                            type:'ON_CHANGE_QUANTITY',
                                            payload:{
                                                id:item.menu_id,
                                                qty:e.target.value
                                            }
                                        })
                                    }}>
                                        {[...Array(5)].map((_, i) => {
                                            return (
                                                <option value={i + 1} key={i+1}>{i + 1}</option>
                                            )
                                        })}
                                    </select>
                                </Col>
                                <Col>
                                    <BsFillTrashFill style={{ cursor: 'pointer' }} onClick={() => {
                                        dispatch({
                                            type: 'REMOVE_FROM_CART',
                                            payload:item
                                        })
                                    }} />

                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            

        </>
    )
}

export default CartItems