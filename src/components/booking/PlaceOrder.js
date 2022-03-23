import React,{useState,useContext,useEffect,useRef} from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ZomatoContext from '../../context/ZomatoContext'
import './PlaceOrder.css'

const PlaceOrder = () => {

    const [total,setTotal]=useState(0)

    const [loading,setLoading]=useState(false)

    const phoneRef=useRef()
    const addressRef=useRef()

    

    const navigate=useNavigate()

    const {state:{cart},dispatch}=useContext(ZomatoContext)

    const totalPrice=()=>{
        const totalCost= cart.reduce((prev,curr)=> prev + (Number(curr.menu_price)*Number(curr.qty)),0)

        setTotal(totalCost)

    }

    useEffect(() => {
        totalPrice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    if(!sessionStorage.getItem('auth-token')){
        return (
            window.location.replace('/auth')

        )
    }

    const userInfo=JSON.parse(sessionStorage.userInfo)
   

    const orderSubmitHandler=(e)=>{

        e.preventDefault()

        
        const phoneValue= phoneRef.current.value
        const addressValue= addressRef.current.value

        

        setLoading(true)

        fetch('https://zomato-villa-api.herokuapp.com/placeOrder',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({
                email:userInfo.email,
                name:userInfo.name,
                rest_name:sessionStorage.getItem('restaurantName'),
                phone:phoneValue,
                address:addressValue,
                cost:total,
                status:'Pending',
                menuItem:cart
            })
        }).then(()=>{
            setLoading(false)
            navigate('/viewOrders')
            dispatch({
                type:'CLEAR_CART'
            })
            sessionStorage.removeItem('restaurantName')
            sessionStorage.removeItem('restaurantId')
        })
        

        
    }

    

    return (
        <section className='order'>
            <h1>Orders Details</h1>
            <form className='form' onSubmit={orderSubmitHandler}>
                <div className='controls'>
                    <div className='control'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={userInfo.email} disabled placeholder='Example-john@gmail.com'/>
                    </div>
                    <div className='control'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' value={userInfo.name} disabled required/>
                    </div>
                </div>
                <div className='control'>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id='phone' ref={phoneRef} required placeholder='9999999999'/>
                </div>
                <div className='control'>
                    <label htmlFor="address">Address</label>
                    <textarea name="address" ref={addressRef} id="address" rows='8'></textarea>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h2>Total Cost: Rs {total}</h2>
                    
                    <div className='actions'>
                        {total>0?<button>
                            {loading?<Spinner animation='border' variant='light'/>:'Confirm Orders'}
                        </button>:<span>Please Order Something!</span>}
                        
                    </div>
                </div>
            </form>
        </section>
    )
}

export default PlaceOrder