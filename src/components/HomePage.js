import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import QuickSearch from './QuickSearch';
import RestaurantSearch from './RestaurantSearch';
import './HomePage.css';
import Spinner from '../images/Spinner.svg';

const HomePage = () => {
  const [location, setLocation] = useState([]);

  const cityUrl = 'https://zomato-villa-api.herokuapp.com/location';

  const getLocation = async () => {
    const res = await fetch(cityUrl);
    const cityRes = await res.json();
    setLocation(cityRes);
  };

  const [state, setstate] = useState([]);

  const mealTypeUrl = 'https://zomato-villa-api.herokuapp.com/mealType';

  const getMealType = async () => {
    const res = await fetch(mealTypeUrl);
    const mealRes = await res.json();
    setstate(mealRes);
  };

  useEffect(() => {
    getMealType();
    getLocation();
    //eslint-disable-next-line
  }, []);

  if (location.length === 0 || state.length === 0) {
    return (
      <div className="loading">
        <img src={Spinner} alt="spinner" />
      </div>
    );
  }

  return (
    <div>
      <RestaurantSearch location={location} />
      <QuickSearch state={state} />
      <Footer />
    </div>
  );
};

export default HomePage;
