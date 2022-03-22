import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Zomatostate from './context/ZomatoState';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    
      <Zomatostate>
        <App />
      </Zomatostate>
    
  </React.StrictMode>,
  document.getElementById('root')
);

