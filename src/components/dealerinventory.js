import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.js';
import DealerNavbar from './dealernavbar.js';
import { useNavigate } from 'react-router-dom';

const DealerInventory = () => {
    const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const dealerName = localStorage.getItem('name');
  const navigate = useNavigate();;

  const handleInventory = async () => {
    try {
  
      const { data } = await supabase
        .from('dealer_inventory')
        .select('*') 
      .eq('dealer_name', dealerName);

    console.log(data);
    setCarData(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };



  useEffect(() => {
    
    handleInventory();
  }, []); 

  return (
    <div>
       <DealerNavbar />
      <h2>Available Cars</h2>

      {error && <p>{error}</p>}

      {carData && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {carData.map((car) => (
            <CarCard key={car.vin} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

function CarCard({ car, onClickBuyNow }) {
  const {car_name, price,image_path, VIN,car_style,dealer_name  } = car;

 

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '300px' }}>
      <h3>{car_name}</h3>
      {image_path && <img src={image_path} alt={car_name} style={{ maxWidth: '100%' }} />}
      <p>Price: {price}</p>
    </div>
  );
}
export default DealerInventory;
