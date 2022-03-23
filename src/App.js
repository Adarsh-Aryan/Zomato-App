import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { React, useContext } from "react"
import Navbar from "./components/Navbar";
import HomePage from './components/HomePage'
import LoadingBar from "react-top-loading-bar"
import ZomatoContext from "./context/ZomatoContext";

import ListingPage from "./components/listing/ListingPage";
import RestaturantDetails from "./components/rest-details/details";
import Cart from "./components/CartPage/Cart";
import PlaceOrder from "./components/booking/PlaceOrder";
import ViewOrders from "./components/booking/ViewOrders";
import Auth from "./components/Auth/Auth";

function App() {
  
  const {progress,setProgress}=useContext(ZomatoContext)
  
  

  return (
    <Router>
      <Navbar />
      <LoadingBar
          color='#f11946'
          progress={progress}
          height={3}
          onLoaderFinished={() => setProgress(0)}
        />
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/restaurants/:meal_id" element={<ListingPage/>}/>
        <Route path="/details/:rest_id" element={<RestaturantDetails/>}/>
        <Route path="/previewOrders" element={<Cart/>}/>
        <Route path='/placeOrder' element={<PlaceOrder/>}/>
        <Route path='/viewOrders' element={<ViewOrders/>}/>
        
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
      
        
     
      
    </Router>

  );
}

export default App;
