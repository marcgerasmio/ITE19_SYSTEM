import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Offcanvas, Image, Container, NavDropdown } from 'react-bootstrap';


const DealerNavbar = () => {
  return (
    <>
        <Navbar expand="lg" sticky="top" className='navbar'>
            <Container>
                <div className='ps-5'>
                    <Image src='logo.png' style={{width: '60px', height: '60px'}}/> 
                    <Navbar.Brand href="/userhome" className='navbar-content ps-3'>SuperWheels</Navbar.Brand>    
                </div>
                <Navbar.Toggle aria-controls="offcanvasNavbar" className="white-toggler" />
                <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>SuperWheels</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-5">
                        <Nav.Link href="/dealer" className='navbar-content'>Buy Cars</Nav.Link>
                            <Nav.Link href="/dealerinventory" className='navbar-content'>Inventory</Nav.Link>
                            <Nav.Link href="/sales" className='navbar-content'>Sales</Nav.Link>
                            <NavDropdown title="Account" className="custom-dropdown">
                                <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    </>
  );
};

export default DealerNavbar;
