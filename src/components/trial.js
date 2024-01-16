import {Card, Button, Form} from 'react-bootstrap';
import { FiFilter } from "react-icons/fi";

function CustomerHome(){
    return(
        <>
       
            <div className='row'>
                <div className='side'>
                    <h5 className='mb-4 justify-content-center d-flex'><FiFilter /> Search Filter</h5>
                    <Form className='mb-3'>
                        <Form.Control
                            type="search"
                            placeholder="Search here. . ."
                            aria-label="Search"
                        />
                    </Form>
                    <hr />
                    <h6 className='mb-3'>By Brands</h6>
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="1"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            <br />
                            <Form.Check
                                inline
                                label="2"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                            />
                            <br />
                            <Form.Check
                                inline
                                label="3"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                            />
                            <br />
                            <Form.Check
                                inline
                                label="4"
                                name="group1"
                                type={type}
                                id={`inline-${type}-4`}
                            />
                            </div>
                        ))}
                    </Form>
                    <hr />
                    <h6 className='mb-3'>Vehicle Type</h6>
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="1"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            <br />
                            <Form.Check
                                inline
                                label="2"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                            />
                            <br />
                            <Form.Check
                                inline
                                label="3"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                            />
                            <br />
                            <Form.Check
                                inline
                                label="4"
                                name="group1"
                                type={type}
                                id={`inline-${type}-4`}
                            />
                            </div>
                        ))}
                    </Form>
                    <hr />
                </div>

                <div className='main'>
                    <Card style={{ width: '25rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default CustomerHome;