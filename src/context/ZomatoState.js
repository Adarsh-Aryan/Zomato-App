import React, { useState, useReducer } from 'react';
import { CartReducer } from './Reducers/CartReducer';
import { ListingReducer } from './Reducers/ListingReducer';
import ZomatoContext from './ZomatoContext';

const Zomatostate = (props) => {
  const [progress, setProgress] = useState(0);

  const [state, dispatch] = useReducer(CartReducer, {
    cart: [],
  });

  const [listingState, listingDispatch] = useReducer(ListingReducer, {
    byCost: '',
    byCuisine: '',
  });

  return (
    <div>
      <ZomatoContext.Provider
        value={{
          progress,
          setProgress,
          state,
          dispatch,
          listingState,
          listingDispatch,
        }}
      >
        {props.children}
      </ZomatoContext.Provider>
    </div>
  );
};

export default Zomatostate;
