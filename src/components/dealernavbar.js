import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const DealerNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/dealer">Order Cars</Nav.Link>
          <Nav.Link href="/dealerinventory">Inventory</Nav.Link>
          <Nav.Link href="/sales">Sales</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DealerNavbar;
