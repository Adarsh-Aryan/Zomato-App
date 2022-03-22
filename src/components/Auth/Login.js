import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'

const Login = () => {

    const [credentials,setCredentials]=useState({email:'',password:''})

    const [loading,setLoading]=useState(false)

    const [authMessage,setAuthMessage]=useState('')

    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        
        e.preventDefault()

        setLoading(true)

        const response= await fetch('https://zomato-villa-api.herokuapp.com/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(credentials)

        })

        const data= await response.json()

        if(!data.auth){
            setAuthMessage(data.token)
            setCredentials({email:'',password:''})
            setLoading(false)
        }
        else{
            setLoading(false)
            sessionStorage.setItem('auth-token',data.token)
            window.location.replace('/')
           

        }
    }

    return (
        <section>
            <h3 style={{color:'red'}}>{authMessage}</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name="password" value={credentials.password} onChange={handleChange} required />

                    </div>
                    <div className='auth_action'>
                        <button>{loading?<Spinner animation='border' variant='light'/>:'Login'}</button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Login