import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.js';
import UserNavbar from './usernavbar.js';
import { useNavigate } from 'react-router-dom';

const CustomerConfirm = () => {
  const [error, setError] = useState(null);
  const [carColor, setCarColor] = useState('Red');
  const [carEngine, setCarEngine] = useState('v4');
  const [transmissionType, setTransmissionType] = useState('Automatic');
  const navigate = useNavigate();


  const customer_name = localStorage.getItem('customer_name');
  const car_name = localStorage.getItem('car_name');
  const car_style = localStorage.getItem('car_style');
  const car_price = localStorage.getItem('price');
  const image_path = localStorage.getItem('image_path');
  const VIN = localStorage.getItem('VIN');
  const dealer_name = localStorage.getItem('dealer_name');

  const buyconfirm = async () => {
    try {
      const { data } = await supabase
        .from('customer_purchase')
        .insert([
          {
            customer_name,
            car_name,
            car_style,
            car_price,
            image_path,
            car_color: carColor,
            car_engine: carEngine,
            transmission_type: transmissionType,
            VIN,
          },
        ])
        .select();

      console.log(data);
      alert('Order Successful');
      dealersales();
      navigate('/customer');
    } catch (error) {
      console.error('Error during login:', error.message);
      setError(error.message);
    }
  };
  const dealersales = async () => {
    try {
      const { data } = await supabase
        .from('dealer_sales')
        .insert([
          {
            dealer_name,
            customer_name,
            car_name,
            car_style,
            car_price,
            image_path,
            car_color: carColor,
            car_engine: carEngine,
            transmission_type: transmissionType,
            VIN,
          },
        ])
        .select();

      console.log(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div>
        <h2>Confirm Your Purchase</h2>
        <p>Customer Name: {customer_name}</p>
        <p>Car Name: {car_name}</p>
        <p>Car Style: {car_style}</p>
        <p>Price: {car_price}</p>
        <p>Image Path: {image_path}</p>

        <label>
          Car Color:
          <select value={carColor} onChange={(e) => setCarColor(e.target.value)}>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            {/* Add more color options as needed */}
          </select>
        </label>
        <br />

        <label>
          Car Engine:
          <select value={carEngine} onChange={(e) => setCarEngine(e.target.value)}>
            <option value="v4">V4</option>
            <option value="v6">V6</option>
            <option value="v8">V8</option>
            {/* Add more engine options as needed */}
          </select>
        </label>
        <br />

        <label>
          Transmission Type:
          <select value={transmissionType} onChange={(e) => setTransmissionType(e.target.value)}>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            {/* Add more transmission type options as needed */}
          </select>
        </label>
        <br />

        <button onClick={buyconfirm}>Buy Confirm</button>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CustomerConfirm;
