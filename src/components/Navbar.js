import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


const Navbar = () => {

    const [name, setName] = useState()

    

    const getUserData = async () => {

        if(!sessionStorage.getItem('auth-token')){
            return;
        }
        
        const response= await fetch('https://zomato-villa-api.herokuapp.com/getUser',{
            method:'GET',
            headers:{
               'auth-token':sessionStorage.getItem('auth-token')
            }
        })

        const data = await response.json()

        

        sessionStorage.setItem('userInfo',JSON.stringify(data))

        setName(data.name)

    }

    useEffect(() => {
        getUserData()
    }, []);


    const handleLogOut=()=>{
        sessionStorage.removeItem('auth-token')
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('restaurantId')
        sessionStorage.removeItem('restaurantName')
        window.location.replace('/auth')
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" style={{ fontSize: "23px" }} href="/">Zomato</a>
                <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

                    <div className="d-flex">
                        {!sessionStorage.getItem('auth-token') ?
                            <Link to='/auth' className="btn btn-primary shadow-none mx-2">Login</Link>
                            : <>
                                <button className='mx-2 btn btn-primary'>Hi {name}</button>
                                <button className='btn btn-danger shadow-none' onClick={handleLogOut}>Logout</button>

                            </>
                        }


                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
