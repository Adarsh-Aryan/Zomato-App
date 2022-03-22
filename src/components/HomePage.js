import React from 'react';
import Footer from './Footer';
import Quicksearch from './QuickSearch';
import Restaurantsearch from './RestaurantSearch';


const Restaurant = () => {

    

    return (
        <div>
            <Restaurantsearch/>
            <Quicksearch/>
            <Footer/>
            
        </div>
    );
}

export default Restaurant;
