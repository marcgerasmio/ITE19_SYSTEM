import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import supabase from '../config/supabaseClient.js';
import DealerNavbar from './dealernavbar.js';


const DealerSales = () => {
  const [error, setError] = useState(null);
  const [dealerSales, setdealerSales] = useState([]);
  const dealerName = localStorage.getItem('name');

  const sales = async () => {
    try {
      const { data, error } = await supabase
        .from('dealer_sales')
        .select('*')
        .eq('dealer_name', dealerName);

      if (error) {
        throw error;
      }
console.log(data);
      setdealerSales(data);
    } catch (error) {
      console.error('Error during fetching purchase history:', error.message);
      setError('An error occurred while fetching purchase history');
    }
  };

  useEffect(() => {
    sales();
  }, []);

  return (
    <div>
      <DealerNavbar />
      <h2>Sales</h2>

      {error && <p>{error}</p>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
          <th>Car Name</th>
          <th>Image</th>
          <th>Car Price</th>
            <th>Car Color</th>
            <th>Car Engine</th>
            <th>Car Style</th>
            <th>Transmission Type</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {dealerSales.map((purchase) => (
            <tr key={purchase.id}>
            <td>{purchase.customer_name}</td>
              <td>{purchase.car_name}</td>
              <td>
                <img src={purchase.image_path} alt="Car" style={{ width: '50px' }} />
              </td>
              <td>{purchase.car_price}</td>
              <td>{purchase.car_color}</td>
              <td>{purchase.car_engine}</td>
              <td>{purchase.car_style}</td>
              <td>{purchase.transmission_type}</td>
              <td>{purchase.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DealerSales;
