import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import supabase from '../config/supabaseClient.js';
import UserNavbar from './usernavbar.js';

const CustomerHistory = () => {
  const [error, setError] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const customerName = localStorage.getItem('customer_name');

  const fetchPurchaseHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_purchase')
        .select('*')
        .eq('customer_name', customerName);

      if (error) {
        throw error;
      }

      setPurchaseHistory(data);
    } catch (error) {
      console.error('Error during fetching purchase history:', error.message);
      setError('An error occurred while fetching purchase history');
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, [customerName]);

  return (
    <div>
      <UserNavbar />
      <h2>Purchase History</h2>

      {error && <p>{error}</p>}

      <Table striped bordered hover>
        <thead>
          <tr>
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
          {purchaseHistory.map((purchase) => (
            <tr key={purchase.id}>
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

export default CustomerHistory;
