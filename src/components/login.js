import React, { useState } from 'react';
import supabase from '../config/supabaseClient.js';
import { useNavigate } from 'react-router-dom';
import { Card, Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateCustomer = async () => {
    try {
      const { data } = await supabase
        .from('Customer')
        .select('*')
        .eq('email', email)
        .single();

      if (data && data.password === password) {
        console.log('Login successful');
        console.log(data);
        const name = data.name;
        localStorage.setItem('name', name);
    console.log(name);
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
        .from('Dealers')
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
    <>
      <div className="login-container">
        <Card className="card-container">
          <Card.Body>
            <AiOutlineUser size={50} className="user-icon" />
            <h2 className="title">User Login</h2>

            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>

            <Row>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Login as: " className="mb-3 form-label">
                  <Form.Select aria-label="Floating label select example" value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="dealer">Dealer</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col>
                <Button type="submit" className="w-100 submit-button" onClick={handleClick}>
                  Log In
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; SuperWheels</div>
            <div>
              <a href="#fay">Privacy Policy</a>
              &middot;
              <a href="#fay">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Login;
