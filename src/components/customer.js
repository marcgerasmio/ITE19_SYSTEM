import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.js';
import UserNavbar from './usernavbar.js';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';

const Customer = () => {
  const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await supabase.from('Dealer_Inventory').select('*');
      setCarData(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickBuyNow = (car) => {
    const { brand_name, vehicle_name, vehicle_type, price, VIN, image_path } = car;
    localStorage.setItem('brand_name', brand_name);
    localStorage.setItem('vehicle_name', vehicle_name);
    localStorage.setItem('vehicle_type', vehicle_type);
    localStorage.setItem('price', price);
    localStorage.setItem('VIN', VIN);
    localStorage.setItem('brand_name', brand_name);
    localStorage.setItem('image_path', image_path);
    navigate('/customerconfirm');
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCarData = carData
    ? carData.filter((car) => {
        const byBrand = !selectedBrand || car.brand_name === selectedBrand;
        const bySearch = car.vehicle_name.toLowerCase().startsWith(searchQuery.toLowerCase());
        return byBrand && bySearch;
      })
    : [];

  return (
    <div>
      <UserNavbar />

      <div className='row'>
        <div className='side'>
          <h5 className='mb-4 justify-content-center d-flex'><FiFilter /> Search Filter</h5>
          <Form className='mb-3'>
            <Form.Control
              type="search"
              placeholder="Search here. . ."
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>
          <hr />
          <h6 className='mb-3'>By Brands</h6>
          <Form>
            <div key="inline-radio" className="mb-3">
              <Form.Check
                inline
                label="All"
                type="radio"
                id="inline-radio-All"
                name="carBrand"
                onChange={() => handleBrandChange('')}
              />
              <br/>
              <Form.Check
                inline
                label="BMW"
                type="radio"
                id="inline-radio-BMW"
                name="carBrand"
                onChange={() => handleBrandChange('BMW')}
              />
              <br/>
              <Form.Check
                inline
                label="Ford"
                type="radio"
                id="inline-radio-Ford"
                name="carBrand"
                onChange={() => handleBrandChange('Ford')}
              />
              <br/>
              <Form.Check
                inline
                label="Hyundai"
                type="radio"
                id="inline-radio-Hyundai"
                name="carBrand"
                onChange={() => handleBrandChange('Hyundai')}
              />
              <br/>
              <Form.Check
                inline
                label="Kia"
                type="radio"
                id="inline-radio-Kia"
                name="carBrand"
                onChange={() => handleBrandChange('Kia')}
              />
            </div>
          </Form>
          <hr />
        </div>

        <div className='main'>
          {filteredCarData && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {filteredCarData.map((car) => (
                <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function CarCard({ car, onClickBuyNow }) {
  const { vehicle_name, price, image_path, brand_name, stocks, vehicle_type } = car;

  const handleBuyNowClick = () => {
    onClickBuyNow(car);
  };

  return (
<div style={{ border: 'none', padding: '10px', margin: '10px', width: '300px', display: 'flex', flexDirection: 'column' }}>
      <h5>{brand_name}</h5>
      {image_path && <img src={image_path} alt={vehicle_name} style={{ maxWidth: '100%' }} />}
      <h3>"{vehicle_name}"</h3>
      <h5>₱{price}</h5>
      
      {stocks > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>Stocks: {stocks}</p>
          <button onClick={handleBuyNowClick}>Buy Now</button>
        </div>
      )}

      {stocks <= 0 && (
        <p>Sold Out</p>
      )}
    </div>
  );
}

export default Customer;
