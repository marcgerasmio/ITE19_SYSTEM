import React, { useState, useEffect} from 'react';
import supabase from '../config/supabaseClient.js';
import DealerNavbar from './dealernavbar.js';
import { useNavigate } from 'react-router-dom';

const DealerConfirm = () =>  {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  
  const buyconfirm = async () => {
    const dealer_name = localStorage.getItem('dealer_name');
    const car_name = localStorage.getItem('car_name');
    const car_style = localStorage.getItem('car_style');
    const price = localStorage.getItem('price');
    const vin = localStorage.getItem('VIN');
    const image_path = localStorage.getItem('image_path');
    try {
     const { data } = await supabase
.from('dealer_inventory')
.insert([
  {
    dealer_name,
    car_name,
    car_style,
    price,
    VIN: vin,
    image_path,
  },
])
.select()
        

console.log(data);
alert('Order Successful');
navigate('/dealer');
} catch (error) {
  console.error('Error during login:', error.message);
}
};
  useEffect(() => {
    buyconfirm();
  }, []); 
  return (
    <div>
          <DealerNavbar />
      <div>
      {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default DealerConfirm;
