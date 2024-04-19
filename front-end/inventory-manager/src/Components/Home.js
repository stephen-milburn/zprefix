import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap'

const Home = () => {
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

    let user = JSON.parse(localStorage.getItem('username'));

    return(
        <>
        { JSON.parse(localStorage.getItem('authorized')) ?
            <>
                <h1 className='text-center py-5'>Welcome to Manager Inventory Manager, {user}!</h1>
                <Row className='justify-content-center align-items-center py-5'>
                    <Col xs={6} className='text-center'>
                        <h2>Your Inventory</h2>
                        <Row>
                            <Col xs={12} style={{display: 'flex', justifyContent: 'center' }}>
                                <Button onClick ={() => navigate(`/inventory/view/user/${user}`)}>
                                    View Your Inventory
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} className='text-center'>
                        <h2>All Inventory</h2>
                        <Row>
                            <Col xs={12} style={{display: 'flex', justifyContent: 'center' }}>
                                <Button onClick ={() => navigate(`/inventory/view`)}>
                                    View All Inventory
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
            :
            <Row className='justify-content-center align-items-center py-5'>
                <Col xs={6} className='text-center'>
                    <h2>Visitor? View Our Inventory!</h2>
                    <Row>
                        <Col xs={12} style={{display: 'flex', justifyContent: 'center' }}>
                            <Button onClick ={() => navigate(`/inventory/view`)}>
                                View Inventory
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} className='text-center'>
                    <h2>Manager? Signup or Login!</h2>
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
        }
        </>
    )
}

export default Home;