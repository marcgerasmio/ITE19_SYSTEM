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
        .from('Vehicles')
        .select('*') 
      .eq('brand_name', dealerName);

    console.log(data);
    setCarData(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };




  const onClickBuyNow = (car) => {
    const { brand_name, vehicle_name, vehicle_type, price, VIN,image_path } = car;
    localStorage.setItem('brand_name', brand_name);
    localStorage.setItem('vehicle_name', vehicle_name);
    localStorage.setItem('vehicle_type', vehicle_type);
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
  const {vehicle_name, price,image_path, VIN,vehicle_type,dealer_name, stocks  } = car;

  const handleBuyNowClick = () => {
    onClickBuyNow(car);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '300px' }}>
      <h3>{vehicle_name}</h3>
      {image_path && <img src={image_path} alt={vehicle_name} style={{ maxWidth: '100%' }} />}
      <h6>Price: ₱{price}</h6>
      <p>Stocks: {stocks}</p>

      <button onClick={handleBuyNowClick}>Buy Now</button>
    </div>
  );
}
export default Dealer;
