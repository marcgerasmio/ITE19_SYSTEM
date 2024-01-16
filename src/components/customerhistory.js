import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import supabase from '../config/supabaseClient.js';
import UserNavbar from './usernavbar.js';

const CustomerHistory = () => {
  const [error, setError] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const name = localStorage.getItem('name');

  const fetchPurchaseHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('Sales')
        .select('*')
        .eq('name', name);

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
  }, [name]);

  return (
    <div>
      <UserNavbar />
      <h2>Purchase History</h2>

      {error && <p>{error}</p>}

      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Brand</th>
          <th>Car Name</th>
          <th>Car Price</th>
          <th>Car Style</th>
            <th>Car Color</th>   
            <th>Transmission Type</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.brand_name}</td>
              <td>{purchase.vehicle_name}</td>
              <td>₱{purchase.price}</td>
              <td>{purchase.vehicle_type}</td>
              <td>{purchase.color}</td>
              <td>{purchase.transmission}</td>
              <td>{purchase.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerHistory;
