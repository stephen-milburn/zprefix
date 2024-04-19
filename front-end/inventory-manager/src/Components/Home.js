import React, { useContext } from 'react';
import { InventoryContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap'

const Home = () => {
    const { } = useContext(InventoryContext);

    const Bold = styled.h2`
    font-weight: bold;
    `

    const Button = styled.button`
    display: flex;
    justify-content: center;
    color: white;
    border: 1px solid black;
    background-color: black;
    margin-right: 2px;
    margin-bottom: 2px;
    width: 60%
    `

    const navigate = useNavigate();

    return(
        <Row className='justify-content-center align-items-center py-5'>
            <Col xs={6} className='text-center'>
                <Bold>Visitor? View Our Inventory!</Bold>
                <Row>
                    <Col xs={12} style={{display: 'flex', justifyContent: 'center' }}>
                        <Button onClick ={() => navigate(`/inventory/view`)}>
                            View Inventory
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col xs={6} className='text-center'>
                <Bold>Manager? Signup or Login!</Bold>
                <Row>
                    <Col xs={6} style={{display: 'flex', justifyContent: 'center' }}>
                        <Button onClick ={() => navigate(`/signup`)}>
                            Signup
                        </Button>
                    </Col>
                    <Col xs={6} style={{display: 'flex', justifyContent: 'center' }}>
                        <Button onClick ={() => navigate(`/login`)}>
                            Login
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Home;