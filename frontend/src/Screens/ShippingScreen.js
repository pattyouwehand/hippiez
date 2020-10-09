import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  };

  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Verzendadres</h2>
          </li>
          <li>
            <label htmlFor="address"></label>
            <input 
              type="text" 
              name="address" 
              id="address"
              placeholder="Adres"
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="city"></label>
            <input 
              type="text" 
              name="city" 
              id="city"
              placeholder="Plaats"
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="postalCode"></label>
            <input 
              type="text" 
              name="postalCode" 
              id="postalCode" 
              placeholder="Postcode"
              onChange={(e) => setPostalCode(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="country"></label>
            <input 
              type="text" 
              name="country" 
              id="country" 
              placeholder="Land"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">Doorgaan</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
}

export default ShippingScreen;