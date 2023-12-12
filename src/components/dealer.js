import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.js';
import DealerNavbar from './dealernavbar.js';
import { useNavigate } from 'react-router-dom';

const Dealer = () => {
    const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const dealerName = localStorage.getItem('name');
  const navigate = useNavigate();;

  const handleLogin = async () => {
    try {
  
      const { data } = await supabase
        .from('cars')
        .select('*') 
      .eq('dealer_name', dealerName);

    console.log(data);
    setCarData(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };




  const onClickBuyNow = (car) => {
    const { dealer_name, car_name, car_style, price, VIN,image_path } = car;
    localStorage.setItem('dealer_name', dealer_name);
    localStorage.setItem('car_name', car_name);
    localStorage.setItem('car_style', car_style);
    localStorage.setItem('price', price);
    localStorage.setItem('VIN', VIN);
    localStorage.setItem('image_path', image_path);
  navigate('/dealerconfirm');

  
  };

  useEffect(() => {
    
    handleLogin();
  }, []); 

  return (
    <div>
       <DealerNavbar />
      <h2>Car List</h2>

      {error && <p>{error}</p>}

      {carData && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {carData.map((car) => (
            <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
          ))}
        </div>
      )}
    </div>
  );
};

function CarCard({ car, onClickBuyNow }) {
  const {car_name, price,image_path, VIN,car_style,dealer_name  } = car;

  const handleBuyNowClick = () => {
    onClickBuyNow(car);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '300px' }}>
      <h3>{car_name}</h3>
      {image_path && <img src={image_path} alt={car_name} style={{ maxWidth: '100%' }} />}
      <p>Price: {price}</p>
      <button onClick={handleBuyNowClick}>Buy Now</button>
    </div>
  );
}
export default Dealer;
