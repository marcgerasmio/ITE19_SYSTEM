import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import supabase from '../config/supabaseClient.js';
import DealerNavbar from './dealernavbar.js';


const DealerSales = () => {
  const [error, setError] = useState(null);
  const [dealerSales, setdealerSales] = useState([]);
  const [dealerName, setDealerName] = useState('');


  const sales = async () => {
    const name = localStorage.getItem('name');
    setDealerName(name);

    try {
      const { data, error } = await supabase
        .from('Sales')
        .select('*')
        .eq('brand_name', name);

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
      <Container className='mt-3'>
          <div className='div'>
            <h1 style={{ fontSize: '40px', fontFamily: 'louis-bold' }}>{dealerName}'s Sales</h1>
          </div>
        </Container>

      {error && <p>{error}</p>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
          <th>Car Name</th>
          <th>Car Price</th>
            <th>Car Color</th>
            <th>Car Style</th>
            <th>Transmission Type</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {dealerSales.map((purchase) => (
            <tr key={purchase.id}>
            <td>{purchase.name}</td>
              <td>{purchase.vehicle_name}</td>
              <td>₱{purchase.price}</td>
              <td>{purchase.color}</td>
              <td>{purchase.vehicle_type}</td>
              <td>{purchase.transmission}</td>
              <td>{purchase.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DealerSales;
