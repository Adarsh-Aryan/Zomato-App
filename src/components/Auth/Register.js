import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'


const Register = () => {

    const [userInfo,setUserInfo]=useState({name:'',email:'',password:''})

    const [authMessage,setAuthMessage]=useState('')

    const [loading,setLoading]=useState(false)

    const handleChange=(e)=>{
        setUserInfo({...userInfo,[e.target.name]:e.target.value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()

        setLoading(true)

        const response= await fetch('https://zomato-villa-api.herokuapp.com/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userInfo)
        })

        const data = await response.json()

        if(!data.auth){
            setLoading(false)
            setAuthMessage(data.token)
            setUserInfo({name:'',email:'',password:''})
            
        }

        else{
            sessionStorage.setItem('auth-token',data.token)
            window.location.replace('/')
            setLoading(false)
            
        }

    }

    return (
        <section>
            <h3 style={{color:'red'}}>{authMessage}</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' name="name" value={userInfo.name} onChange={handleChange} required autoComplete='off'/>

                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name="password" value={userInfo.password} onChange={handleChange} required />

                    </div>
                    <div className='auth_action'>
                        <button>{loading?<Spinner animation='border' variant='light'/>:'SignUp'}</button>
                    </div>

                </div>
            </form>
        </section>
    )
}

export default Register
