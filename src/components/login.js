import React, { useState } from 'react';
import supabase from '../config/supabaseClient.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateCustomer = async () => {
    try {
      const { data } = await supabase
        .from('customer')
        .select('*')
        .eq('email', email)
        .single();

      if (data && data.password === password) {
        console.log('Login successful');
        console.log(data);
        const customer_name = data.customer_name;
        localStorage.setItem('customer_name', customer_name);
    console.log(customer_name);
        navigate("/customer");
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid email or password');
        console.log(data);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };

  const validateDealer = async () => {
    try {
      const { data } = await supabase
        .from('dealer')
        .select('*')
        .eq('email', email)
        .single();

      if (data && data.password === password) {
        console.log('Login successful');
        console.log(data);
        const name = data.dealer_name;
        localStorage.setItem('name', name);
    console.log(name);
    
        navigate("/dealer")
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid email or password');
        console.log(data);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };

  const handleClick = () => {
    if (userType === "customer") {
      validateCustomer(); 
    } else {
     validateDealer();
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>User Type:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="dealer">Dealer</option>
        </select>
      </div>
      <button onClick={handleClick}>Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
