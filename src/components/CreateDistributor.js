import { Nav, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import '../App.css';
import React, { useState, useEffect } from "react";
import cv from '../assets/cv.png'
import moment from "moment"
import axios from 'axios';
import Swal from 'sweetalert2'

const CreateDistributor = () => {

    const [distributorName, setDistributorName] = useState("")
    const [distributorCity, setDistributorCity] = useState("")
    const [distributorRegion, setDistributorRegion] = useState("")
    const [distributorCountry, setDistributorCountry] = useState("")
    const [distributorPhone, setDistributorPhone] = useState("")
    const [distributorEmail, setDistributorEmail] = useState("")

    const currentDate = moment().format('LL');

    const submitDistributor = (e) => {
        e.preventDefault()

        axios.post(`http://localhost:3001/distributor`, {
            name: distributorName,
            city: distributorCity,
            region: distributorRegion,
            country: distributorCountry,
            phone: distributorPhone,
            email: distributorEmail
        })
        .then(async res => {
            await Swal.fire(res.data.message);
            window.location.replace('/distributor');
        })
    }

    const logout = async (e) => {
        e.preventDefault()

        sessionStorage.removeItem('id');

        await Swal.fire("Logout Success");
        
        window.location.replace('/login');
    }

    return (
        <div className="App">
      <header>
        <img src={cv} className="App-logo" alt="logo" />
        <h1>Coffee Valley</h1>
        <br/>
        <Card>
        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="Distributor">
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/catalog">Catalog</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/distributor">Distributor</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/upload">Upload</Nav.Link>
            </Nav.Item>
            </Nav>
        </Card.Header>
        <Card.Body>
            <Form onSubmit={submitDistributor}>
                        <InputGroup>
                            <Form.Control
                            placeholder="Distributor Name"
                            onChange={(e) => setDistributorName(e.target.value)}
                            required
                            />

                            <Form.Control
                            placeholder="Distributor City"
                            onChange={(e) => setDistributorCity(e.target.value)}
                            required
                            />

                            <Form.Control
                            required
                            placeholder="Distributor Region"
                            onChange={(e) => setDistributorRegion(e.target.value)}
                            />

                        <Form.Select
                        required
                                onChange={(e) => setDistributorCountry(e.target.value)}
                            >
                                <option value="Indonesia">Indonesia</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Singapore">Singapore</option>
                            </Form.Select>

                            <Form.Control
                            required
                            placeholder="Distributor Phone"
                            onChange={(e) => setDistributorPhone(e.target.value)}
                            />

                        <Form.Control
                        required
                            placeholder="Distributor Email"
                            onChange={(e) => setDistributorEmail(e.target.value)}
                            />

                        </InputGroup>
                        <br/>
                        <Button variant="primary" type="submit" id="button-addon2">
                            Create
                            </Button>
                </Form>
        </Card.Body>
        </Card>
      </header>

      <footer>
        <br/>
        { currentDate }
        <br /> <br />
        <Button onClick={logout}>Logout</Button>
        <br/><br/>
      </footer>
    </div>
    )
}

export default CreateDistributor;