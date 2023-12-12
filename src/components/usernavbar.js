import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/customer">BuyCars</Nav.Link>
          <Nav.Link href="/customerhistory">Purchase History</Nav.Link>
          <Nav.Link href="/buyparts">OrderParts</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserNavbar;
